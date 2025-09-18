export const shallowFreeze = (obj = {}) => Object.freeze(obj);
export const toggleBool = (val) => !val;
export const getRandomBool = () => Math.random() >= 0.5;
export const shuffleArray = (arr = []) => {
	arr.sort(() => Math.random() - 0.5);
};

export const deepFreeze = (obj = {}) => {
	Object.keys(obj).forEach((name) => {
		let prop = obj[name];
		if (typeof prop === 'object' && prop !== null) {
			deepFreeze(prop);
		}
	});

	return Object.freeze(obj);
};
