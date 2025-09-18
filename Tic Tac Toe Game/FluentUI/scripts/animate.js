export const animate = (element, animationClass) => {
	element.addEventListener('click', () => {
		element.classList.add(animationClass);
		element.addEventListener(
			'animationend',
			() => {
				element.classList.remove(animationClass);
			},
			{ once: true }
		);
	});
};
