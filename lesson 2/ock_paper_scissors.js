const readline = require('readline-sync');

const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

prompt('Choose one: rock, paper, scissors');
let choice = readline.question();

while (!['rock', 'paper', 'scissors'].includes(choice)) {
  prompt("That's not a valiud choice");
  choice = readline.question();
}

