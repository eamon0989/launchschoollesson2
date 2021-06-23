let rlsync = require('readline-sync');
const MESSAGES = require('./loanMessages.json');
let english = MESSAGES.en;

function prompt(message) {
  console.log(`=> ${message}`);
}

function getInput() {
  prompt('Welcome to out Mortgage Calculator');
  let loanAmount = getLoanAmount();
  let annualPercentageRate = getAnnualPercentageRate();
  let loanDurationYears = getLoanDuration();
  let loanDurationMonths = loanDurationYears * 12;
  let monthlyInterestRate = (annualPercentageRate / 100) / 12;
  let monthlyInterestRatePercentage = monthlyInterestRate * 100;
  let monthlyPay;
  if (annualPercentageRate === 0) {
    monthlyPay = loanAmount / loanDurationMonths;
  } else {
    monthlyPay = loanAmount * (Number(monthlyInterestRate) /
    ( 1 - Math.pow((1 + monthlyInterestRate), (-loanDurationMonths))));
  }

  let totalToPay = monthlyPay * loanDurationMonths;
  let totalInterest = formatNumber(totalToPay - loanAmount);
  totalToPay = formatNumber(totalToPay);
  monthlyPay = formatNumber(monthlyPay);

  printOutput(monthlyPay, loanDurationMonths,
    totalToPay, totalInterest, monthlyInterestRatePercentage);
}

function formatNumber(number) {
  number = Number(Number.parseFloat(number).toFixed(2));
  number = number.toLocaleString('en-US');

  if (number[number.length - 2] === '.') {
    number += '0'; // if toLocale returns only 1 decimals place, concat 0 to the end
  }

  return number;
}

function printOutput(monthlyPay, loanDurationMonths,
  totalToPay, totalInterest, monthlyInterestRatePercentage) {
  console.log(`The monthly payment will be $${monthlyPay}.`);
  console.log(`The total amount paid after ${loanDurationMonths.toFixed(2)} payments will be $${totalToPay}.`);
  console.log(`The total amount paid in interest will be $${totalInterest}.`);
  console.log(`The monthly interest rate is ${monthlyInterestRatePercentage.toFixed(2)}%`);
  runAgain();
}

function getLoanAmount() {
  prompt(english.amount);
  let loanAmount = rlsync.question('$');

  if (loanAmount.includes(',')) {
    loanAmount = loanAmount.replace(/,/g, '');
  }

  if (loanAmount.includes('.')) {
    loanAmount = loanAmount.split('.').join('');
  }

  while (isInvalidAmount(loanAmount)) {
    prompt(english.invalid);
    loanAmount = rlsync.question('$');
  }

  return Number(loanAmount);
}

function getAnnualPercentageRate() {
  prompt(english.annualRate);
  let annualRate = rlsync.question();
  if (annualRate.includes('%')) {
    annualRate = annualRate.replace(/%/g, '');
  }
  while (validatePercentage(annualRate)) {
    if (annualRate.includes('%')) {
      annualRate = annualRate.replace(/%/g, '');
    }
    prompt(english.validPercentage);
    annualRate = rlsync.question();
  }

  return Number(annualRate);
}

function getLoanDuration() {
  prompt(english.howManyYears);
  let years = rlsync.question();

  while (isInvalidTime(years)) {
    prompt(english.validTerm);
    years = rlsync.question();
  }

  return Number(years);
}

function isInvalidAmount(number) {
  console.log(number);
  if (number[0] === '$') {
    number = number.slice(1, -1);
  } else if (number.trimStart() === '' || Number(number.trimStart()) < 1) {
    return true;
  }

  if (Number.isNaN(Number(number))) {
    console.log(number);

    return true;
  }

  return false;
}

function validatePercentage(number) {
  if (Number(number.trimStart()) < 0 || Number.isNaN(Number(number))) {
    return true;
  }

  return false;
}

function isInvalidTime(number) {
  if (number.trimStart() === '' || Number.isNaN(Number(number))) {
    return true;
  } else if (Number(number.trimStart()) <= 0) {
    return true;
  }

  return false;
}

function runAgain() {
  prompt("Would you like to calculate another mortgage? ");
  prompt('Please enter "y" or "n".');
  let answer = rlsync.question().toLowerCase();
  while (answer[0] !== 'y' && answer[0] !== 'n') {
    prompt('Please enter "y" or "n".');
    answer = rlsync.question().toLowerCase();
  }
  if (answer === 'y' || answer === 'yes') {
    getInput();
  } else if (answer === 'n' || answer === 'yes') {
    return false;
  }
  answer = '';
  return answer;
}

getInput();