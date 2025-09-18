export default class LocalDB {
	constructor() {}

	static saveItem(key, value) {
		localStorage.setItem(key, value);
	}

	static getItem(key) {
		const value = localStorage.getItem(key);
		return value;
	}

	static removeItem(key) {
		localStorage.removeItem(key);
	}

	static clear() {
		localStorage.clear();
	}
}
