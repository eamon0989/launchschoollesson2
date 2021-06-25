const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const gameScore = [['user', 0], ['computer', 0]];

function prompt(message) {
  console.log(`=> ${message}`);
}

function startGame() {
  prompt(`The machine uprising has begun...`);
  prompt(`You are humanity's last hope...`);
  prompt(`You have one chance to beat the machine to 3...`);
  prompt(`Choose wisely my friend...`);
  gameFunctions();
}

function gameFunctions() {
  while (isTheGameOver() !== true) {
    let choice = getUserChoice();
    let computerChoice = getComputersChoice();
    let roundWinner = declareRoundWinner(choice, computerChoice);
    keepScore(roundWinner);
    checkIfThereIsAWinner(gameScore);
  }
}

function getUserChoice() {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question();
  }
  return choice;
}

function getComputersChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];
  return computerChoice;
}

function declareRoundWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);
  if (checkIfUserWinsRound(choice, computerChoice)) {
    prompt('You win this round!');
    return 'user';
  } else if (checkIfComputerWinsRound(choice, computerChoice)) {
    prompt('Computer wins this round!');
    return 'computer';
  } else {
    prompt("It's a tie!");
    return 'tie';
  }
}

function checkIfUserWinsRound(choice, computerChoice) {
  if ((choice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
      (choice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
      (choice === 'lizard' && (computerChoice === 'paper' || computerChoice === 'spock')) ||
      (choice === 'spock' && (computerChoice === 'scissors' || computerChoice === 'rock')) ||
      (choice === 'scissors' && (computerChoice === 'lizard' || computerChoice === 'paper'))) {
    return true;
  }
  return false;
}

function checkIfComputerWinsRound(choice, computerChoice) {
  if ((choice === 'rock' && (computerChoice === 'paper' || computerChoice === 'spock')) ||
      (choice === 'paper' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
      (choice === 'scissors' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
      (choice === 'lizard' && (computerChoice === 'scissors' || computerChoice === 'rock')) ||
      (choice === 'spock' && (computerChoice === 'lizard' || computerChoice === 'paper'))) {
    return true;
  }
  return false;
}

function keepScore(roundWinner) {
  if (roundWinner === 'user') {
    gameScore[0][1] += 1;
  } else if (roundWinner === 'computer') {
    gameScore[1][1] += 1;
  }
  gameScore.forEach(element => checkIfThereIsAWinner(element));
}

function checkIfThereIsAWinner(gameScore) {
  let winnersScore = gameScore[1];
  let winnersName = gameScore[0];
  if (winnersScore === 3) {
    declareGameWinner(winnersName);
    return false;
  }
  return true;
}

function declareGameWinner(winnersName) {
  if (winnersName === 'user') {
    prompt('You win! Humanity lives to fight another day!');
  } else if (winnersName === 'computer') {
    prompt('Computer wins, the machine uprising has begun!');
  }
}

function isTheGameOver() {
  if (gameScore[0][1] === 3 || gameScore[1][1] === 3) {
    return true;
  }
  return false;
}



startGame();