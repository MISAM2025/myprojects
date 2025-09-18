export const createElement = (html = '') => {
	const template = document.createElement('template');
	template.innerHTML = html.trim();
	return template.content.firstElementChild;
};

export const appendElement = (element, container) => {
	container.appendChild(element);
};
