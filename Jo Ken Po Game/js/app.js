//! Imports from the fluent library ******
import { onPressDown } from '../../FluentUI/scripts/events.js';
import { deepFreeze } from '../../FluentUI/scripts/utils.js';
import { isTouchDevice } from '../../FluentUI/scripts/window.js';

//! Import modules ***************
import { board } from './data.js';

const gameInfo = document.querySelector('.game-state');
const gameBoard = document.querySelector('.game-board');
board.forEach((element) => {
	const button = document.createElement('button');
	button.className = 'play-button button';
	button.dataset.id = element.id;
	button.dataset.occupied = element.occupied;
	gameBoard.appendChild(button);
});

const choices = deepFreeze({
	circle: '⭕',
	cross: '❌',
});

const winningCombinations = [
	['id1', 'id2', 'id3'],
	['id1', 'id4', 'id7'],
	['id1', 'id5', 'id9'],
	['id2', 'id5', 'id8'],
	['id3', 'id6', 'id9'],
	['id3', 'id5', 'id7'],
	['id4', 'id5', 'id6'],
	['id7', 'id8', 'id9'],
];

class Player {
	constructor(name = '', choice) {
		this.name = name;
		this.choice = choice;
		this.score = 0;
		this.hasPlayed = false;
		this.playedOn = [];
		this.hasWon = false;
		this.scoreEl = document.querySelector(
			`.player-${choice === choices.circle ? 'one' : 'two'}-score`
		);
		this.scoreEl.textContent = this.score;
	}

	getScore() {
		return this.score;
	}

	increaseScore() {
		this.score++;
		this.scoreEl.textContent = this.score;
	}

	resetScore() {
		this.score = 0;
		this.scoreEl.textContent = this.score;
	}

	verifyWinner() {
		winningCombinations.forEach((combination) => {
			// these gets each one of the possible ways of winnig
			if (combination.every((id) => this.playedOn.includes(id))) {
				// compares to the playedOn array
				this.hasWon = true;
				this.increaseScore();
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

	reset() {
		this.hasWon = false;
		this.playedOn = [];
		this.hasPlayed = false;
		this.scoreEl.textContent = this.score;
	}
}

const playerOne = new Player('Player One', choices.circle);
const playerTwo = new Player('Player Two', choices.cross);
const playButton = document.querySelectorAll('.play-button');

const resetPlayButton = () => {
	playButton.forEach((button) => {
		button.textContent = '';
		button.dataset.occupied = 'false';
	});
};

const startButton = document.querySelector('.start-button');
let hasStarted = false;
onPressDown(startButton, () => {
	hasStarted = true;
	console.log('the game has begun');
	[playerOne, playerTwo].forEach((player) => player.reset());
	startButton.textContent = 'Play again';
	gameInfo.textContent = 'Click on the squares to play';
	resetPlayButton();
});

const newGameButton = document.querySelector('.new-game');
onPressDown(newGameButton, () => {
	hasStarted = false;
	[playerOne, playerTwo].forEach((player) => {
		player.reset();
		player.resetScore();
	});
	startButton.textContent = 'Start';
	gameInfo.textContent = 'Click to Start';
	resetPlayButton();
});

playButton.forEach((button) => {
	onPressDown(button, () => {
		if (
			!hasStarted ||
			playerOne.hasWon ||
			playerTwo.hasWon ||
			button.dataset.occupied === 'true'
		)
			return;
		if (playerOne.hasPlayed === false) {
			playerOne.play(button);
			playerTwo.hasPlayed = false;
		} else {
			playerTwo.play(button);
			playerOne.hasPlayed = false;
		}
		button.dataset.occupied = 'true';
	});
});
