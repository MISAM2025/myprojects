document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.container').innerHTML;
	const saveItem = (key, value) => localStorage.setItem(key, value);
	const getItem = key => localStorage.getItem(key);
	const removeItem = key => {
		localStorage.removeItem(key);
	};
	const removeAll = () => localStorage.clear();

	saveItem('container', container);
	const newContainer = getItem('container');
	document.body.innerHTML += newContainer;
});
