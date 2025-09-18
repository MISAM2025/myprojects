export const onPressUp = (element, callback) => {
	['touchend', 'mouseup', 'keyup'].forEach((event) => {
		element.addEventListener(event, callback);
	});
};

export const onPressDown = (element, callback) => {
	['touchstart', 'mousedown', 'keydown'].forEach((event) => {
		element.addEventListener(event, callback);
	});
};

export const onPressMove = (element, callback) => {
	['touchmove', 'mousemove'].forEach((event) => {
		element.addEventListener(event, callback);
	});
};

export const onClick = (element, callback) => {
	element.addEventListener('click', callback);
};

export const onDBClick = (element, callback) => {
	element.addEventListener('dblclick', callback);
};
