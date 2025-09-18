const inputText = document.querySelector('.input-text');
const inputType = document.querySelector('.input-type');

const converter = document.querySelector('.converter-btn');
const outputType = document.querySelector('.output-type');

const unitInSec = {
	seconds: 1,
	minutes: 60,
	hours: 3_600,
	days: 86_400,
};

function validate() {
	const inputValue = parseInt(inputText.value, 10);
	if (isNaN(inputValue)) {
		console.error("Input value isn't a number");
	} else {
		return {
			Currentvalue: inputValue, //number
			from: inputType.value, //string
			to: outputType.value, //string
		};
	}
}

function calc() {
	const value = validate().Currentvalue;
	const fromUnit = validate().from;
	const toUnit = validate().to;

	const valueInSec = value * unitInSec[fromUnit];
	const finalResult = (valueInSec / unitInSec[toUnit]).toFixed(2);
	return finalResult;
}

converter.onclick = () => {
	const result = calc();
	document.querySelector('.result').innerHTML = result;
};
