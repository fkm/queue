// Node Dependencies
import { EventEmitter } from 'events';

// Local Dependencies
import { QueueStore, QueueStoreData } from './store';

/**
 * An asynchronous task queue with integrated store.
 *
 * @example ```js
 * let queue = new Queue();
 *
 * queue.on('end', store => {
 *    response.render('view/foo.njk', store.dump());
 * });
 *
 * queue.add(store => {
 *    store.set('title', 'Hello world!');
 * });
 *
 * queue.next();
 *```
 */
export class Queue extends EventEmitter {
	private _store: QueueStore;
	private _tasks: ((store: QueueStore) => void)[];
	private _running: boolean;

	/**
	 * Create a new queue and hydrate the store with whatever data you already have.
	 * @param initial - Will be used to initialize the store.
	 */
	constructor(initial?: QueueStoreData) {
		super();

		this._store = new QueueStore(initial);
		this._tasks = [];
		this._running = false;

		this.on('next', this.next);
	}

	/**
	 * Pushes a new task to the queue.
	 * @param task - The task function that should be added.
	 *
	 * @example ```js
	 * queue.add(store => {
	 *    return knex.select()
	 *       // ...
	 *       .then(rows => {
	 *          store.set('page.items', rows);
	 *       });
	 * });
	 *
	 * queue.add(async store => {
	 *    let rows = await knex.select()
	 *       // ...;
	 *
	 *    store.set('page.items', rows);
	 * });
	 *
	 * queue.add(store => {
	 *    return new Promise((resolve, reject) => {
	 *       fs.readFile('/foo/bar.txt', 'utf8', (error, content) => {
	 *          if (error) {
	 *             reject(new QueueError({
	 *                title: 'FS Error',
	 *                message: error.message,
	 *                statusCode: 500,
	 *             }));
	 *          } else {
	 *             store.set('page.textContent', content);
	 *             resolve();
	 *          }
	 *       });
	 *    });
	 * });
	 *```
	 */
	add(task: (store: QueueStore) => void): void {
		this._tasks.push(task);
	}

	/**
	 * Runs the next task according to FIFO.
	 * This method is currently also used to start the queue.
	 */
	next(): void {
		if (this._tasks.length > 0) {
			if (!this._running) {
				this._running = true;

				let task = this._tasks.shift();

				Promise.resolve(task(this._store)).then(
					() => {
						this._running = false;
						this.emit('next');
					},
					error => {
						this.emit('error', error);
					},
				);
			}
		} else {
			this.emit('end', this._store);
		}
	}
}
