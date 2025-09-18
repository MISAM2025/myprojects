let win = false;
let playerOneScore = 0;
let playerTwoScore = 0;
let round = 0;

//* Getting the elements we need ___________________________
const playerOneScoreEl = document.querySelector('.player1-score');
const playerTwoScoreEl = document.querySelector('.player2-score');
const stateEl = document.querySelector('.state');
const roundEl = document.querySelector('.round');
const playerOneImg = document.querySelector('.player1-img');
const playerTwoImg = document.querySelector('.player2-img');

//* Player moves handler _________________________________
const getUserChoice = () => {
	const target = event.target;
	let userChoice = '';
	if (target.className.includes('paperBtn')) userChoice = 'paper';
	else if (target.className.includes('rockBtn')) userChoice = 'rock';
	else if (target.className.includes('scissorsBtn')) userChoice = 'scissors';
	return userChoice;
};

const getComputerChoice = () => {
	const rNumber = Math.round(Math.random() * 2) + 1;
	let computerChoice = '';
	if (rNumber === 1) computerChoice = 'rock';
	else if (rNumber === 2) computerChoice = 'scissors';
	else computerChoice = 'paper';
	return computerChoice;
};

const getResult = () => {
	const userChoice = getUserChoice();
	const computerChoice = getComputerChoice();
	let result = 'Error';
	round++;
	if (userChoice === computerChoice) result = 'Tie';
	else {
		if (
			(userChoice === 'rock' && computerChoice === 'scissors') ||
			(userChoice === 'paper' && computerChoice === 'rock') ||
			(userChoice === 'scissors' && computerChoice === 'paper')
		) {
			result = 'You win';
			playerOneScore++;
		} else {
			result = 'You lose';
			playerTwoScore++;
		}
	}

	return {
		userChoice,
		computerChoice,
		result,
		round,
		playerOneScore,
		playerTwoScore,
	};
};

//* Animation Gesture Handler ___________________________
const toggleAnimation = (obj) => {
	const { element, className, userChoice, computerChoice } = obj;
	playerOneImg.setAttribute('src', 'imgs/assets/player1-rock.png');
	playerTwoImg.setAttribute('src', 'imgs/assets/player2-rock.png');
	element.classList.add(className);
	element.addEventListener(
		'animationend',
		() => {
			element.classList.remove(className);
			//* Changing the hand form based on User Choice
			if (userChoice !== '' || null || undefined) {
				if (userChoice === 'scissors') {
					playerOneImg.setAttribute('src', `imgs/assets/player1-scissors.png`);
				} else if (userChoice === 'paper') {
					playerOneImg.setAttribute('src', 'imgs/assets/player1-paper.png');
				} else if (userChoice === 'rock') {
					playerOneImg.setAttribute('src', 'imgs/assets/player1-rock.png');
				}
			}

			//*  Changing the hand form based on Computer Choice
			if (computerChoice === 'scissors') {
				playerTwoImg.setAttribute('src', 'imgs/assets/player2-scissors.png');
			} else if (computerChoice === 'paper') {
				playerTwoImg.setAttribute('src', 'imgs/assets/player2-paper.png');
			} else if (computerChoice === 'rock') {
				playerTwoImg.setAttribute('src', 'imgs/assets/player2-rock.png');
			}
		},
		{ once: true } // removes the event after it fires once
	);
};

document.querySelector('.select-div').addEventListener('click', (event) => {
	const target = event.target;
	if (target.tagName !== 'DIV') {
		const {
			userChoice,
			computerChoice,
			result,
			round,
			playerOneScore,
			playerTwoScore,
		} = getResult();

		toggleAnimation({
			element: playerOneImg,
			className: 'shake-left',
			userChoice,
		});

		toggleAnimation({
			element: playerTwoImg,
			className: 'shake-right',
			computerChoice,
		});

		setTimeout(() => {
			playerOneScoreEl.textContent = playerOneScore;
			playerTwoScoreEl.textContent = playerTwoScore;
			roundEl.textContent = round;
			console.log({
				userChoice,
				computerChoice,
				result,
				round,
				playerOneScore,
				playerTwoScore,
			});
		}, 2800);
	}
});

//* Restart Button __________________________________________
document.querySelector('.restart').addEventListener('click', () => {
	playerOneScore = round = playerTwoScore = 0;
	win = false;
	playerOneScoreEl.textContent = playerOneScore;
	playerTwoScoreEl.textContent = playerTwoScore;
	playerOneImg.setAttribute('src', 'imgs/assets/player1-rock.png');
	playerTwoImg.setAttribute('src', 'imgs/assets/player2-rock.png');
	stateEl.textContent = 'Play again';
	roundEl.textContent = round;
	console.clear();
});
