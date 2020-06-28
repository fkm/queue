// NPM Dependencies
import { cloneDeep, get, merge, set } from 'lodash';

export interface QueueStoreData {
	meta?: {
		[key: string]: any,
	},
	site?: {
		[key: string]: any,
	},
	page?: {
		[key: string]: any,
	},
}

/**
 * The store for the task queue.
 * Makes heavy use of Lodash functions.
 */
export class QueueStore {
	private _data: any;

	/**
	 * @param data - The initial data.
	 */
	constructor(data?: QueueStoreData) {
		this._data = Object.assign({}, data);
	}

	/**
	 * Gets a value from the internal storage.
	 * @see https://lodash.com/docs/#get
	 * @param path - The object path at which to read.
	 * @param fallback - A fallback value if undefined at given path.
	 */
	get(path: string, fallback?: any): any {
		return get(this._data, path, fallback);
	}

	/**
	 * Sets a value in the internal storage.
	 * @see https://lodash.com/docs/#set
	 * @param path - The object path at which to set.
	 * @param value - The value to set at the given path.
	 */
	set(path: string, value: any): void {
		set(this._data, path, value);
	}

	/**
	 * Merges an object with the internal storage.
	 * @see https://lodash.com/docs/#merge
	 * @param data - The object to merge into the store object.
	 */
	merge(data: QueueStoreData): void {
		merge(this._data, data);
	}

	/**
	 * Returns a deep clone of the internal storage.
	 * @see https://lodash.com/docs/#cloneDeep
	 */
	dump(): QueueStoreData {
		return cloneDeep(this._data);
	}
}
