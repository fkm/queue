export interface QueueErrorInput {
	title: string;
	message: string;
	statusCode: number;
	stack?: string;
}

/**
 * An Error wrapper that provides additional data.
 *
 * @example ```js
 * queue.add(store => {
 *    // ...
 *
 *    if (!page) {
 *       throw new QueueError({
 *          title: 'Page not found',
 *          message: 'The requested page was not found.',
 *          statusCode: 404,
 *       });
 *    }
 * });
 * ```
 */
export class QueueError extends Error {
	title: string;
	statusCode: number;

	constructor(input: QueueErrorInput) {
		super(input.message);
		Object.assign(this, input);
	}
}
