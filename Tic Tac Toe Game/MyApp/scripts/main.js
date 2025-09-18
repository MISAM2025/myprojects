//! Imports from the fluent library _______________
import { appendElement, createElement } from '../../FluentUI/scripts/dom.js';
import { onPressDown } from '../../FluentUI/scripts/events.js';
import LocalDB from '../../FluentUI/scripts/localStorage.js';
import { deepFreeze } from '../../FluentUI/scripts/utils.js';

//! Import modules ________________________________
import { board } from './data.js';

const gameBoard = document.querySelector('.game-board');
board.forEach((element) => {
	const html = createElement(`
		<button
			class="play-button button"
			data-id="${element.id}"
			data-occupied="${element.occupied}"
			></button>
		`);
	appendElement(html, gameBoard);
});

const gameInfo = document.querySelector('.game-state');

const choices = deepFreeze({
	circle: '⭕',
	cross: '❌',
});

class Player {
	score = 0;
	hasPlayed = false;
	playedOn = [].sort();
	hasWon = false;
	constructor(name = '') {
		this.name = name;
	}

	getScore() {
		return this.score;
	}

	increaseScore() {
		this.score++;
	}

	resetScore() {
		this.score = 0;
	}

	verifyWinner() {
		const h1 = this.playedOn.filter(
			(id) => id === 'id1' || id === 'id2' || id === 'id3'
		);
		const h2 = this.playedOn.filter(
			(id) => id === 'id1' || id === 'id4' || id === 'id7'
		);
		const h3 = this.playedOn.filter(
			(id) => id === 'id1' || id === 'id5' || id === 'id9'
		);
		const h4 = this.playedOn.filter(
			(id) => id === 'id2' || id === 'id5' || id === 'id8'
		);
		const h5 = this.playedOn.filter(
			(id) => id === 'id3' || id === 'id6' || id === 'id9'
		);
		const h6 = this.playedOn.filter(
			(id) => id === 'id3' || id === 'id5' || id === 'id7'
		);
		const h7 = this.playedOn.filter(
			(id) => id === 'id4' || id === 'id5' || id === 'id6'
		);
		const h8 = this.playedOn.filter(
			(id) => id === 'id7' || id === 'id8' || id === 'id9'
		);
		const hypotheses = [h1, h2, h3, h4, h5, h6, h7, h8];
		hypotheses.forEach((h) => {
			if (h.length >= 3) {
				this.hasWon = true;
				gameInfo.textContent = `${this.name} won`;
			}
		});
	}

	play(button) {
		button.innerHTML = this.choice;
		this.playedOn.push(button.dataset.id);
		this.hasPlayed = true;
		this.verifyWinner();
	}
}

class PlayerOne extends Player {
	choice = choices?.circle;
	constructor(name) {
		super(name);

		if (this.hasWon) this.increaseScore();
		this.scoreEl = document.querySelector('.player-one-score');
		this.scoreEl.textContent = this.score;
	}
}

class PlayerTwo extends Player {
	choice = choices?.cross;
	constructor(name) {
		super(name);

		if (this.hasWon) this.increaseScore();
		this.scoreEl = document.querySelector('.player-two-score');
		this.scoreEl.textContent = this.score;
	}
}

const playerOne = new PlayerOne('Player One');
const playerTwo = new PlayerTwo('Player Two');
const playButton = document.querySelectorAll('.play-button');

let hasStarted = false;
const startButton = document.querySelector('.start-button');
onPressDown(startButton, () => {
	hasStarted = true;
	console.log('the game has begun');
	LocalDB.clear();
	playButton.forEach((button) => {
		button.textContent = '';
		button.dataset.occupied = 'false';
	});
	[playerOne, playerTwo].forEach((player) => {
		player.hasWon = false;
		player.playedOn = [].sort();
	});
	startButton.textContent = 'Restart';
	gameInfo.textContent = 'Click on the squares to play';
});

playButton.forEach((button) => {
	onPressDown(button, () => {
		if (
			hasStarted === false ||
			playerOne.hasWon === true ||
			playerTwo.hasWon === true
		)
			return;
		else {
			if (button.dataset.occupied === 'true') return;
			else {
				if (playerOne.hasPlayed === false) {
					playerOne.play(button);
					playerTwo.hasPlayed = false;
				} else {
					playerTwo.play(button);
					playerOne.hasPlayed = false;
				}
				button.dataset.occupied = 'true';
			}
		}
	});
});
