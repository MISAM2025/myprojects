export const getUserSelectedText = () => {
	return window.getSelection().toString();
};

export const getUserOS = () => {
	const user = navigator.userAgent;

	if (user.match(/Windows/i)) return 'Windows';
	else if (user.match(/Android/i)) return 'Android';
	else if (user.match(/iPhone|iPad|iPod/i)) return 'iOS';
	else if (user.match(/Mac/i)) return 'MacOS';
	else if (user.match(/Linux/i)) return 'Linux';
	else return undefined;
};

export const getDeviceOrientation = () => {
	const orientation = window.screen.orientation.type;

	if (orientation.includes('portrait')) return 'portrait';
	else return 'landscape';
};

export const getPreferredTheme = () => {
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		return 'dark';
	} else return 'light';
};
export const scrollToTop = () => window.scroll(0, 0);

export const isTouchDevice = () => {
	return (
		'ontouchstart' in Window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	);
};
