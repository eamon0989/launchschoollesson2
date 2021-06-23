function validateMonthsOrYears() {
  prompt("Would you like to calculate using years, months or both? ");
  let type = rlsync.question();
  while (type !== 'years' || type !== 'months' || type !== 'both'
    || type[0] === 'y' || type[0] === 'm' || type[0] === 'b') {
      prompt(`Type "years", "months" or "both"`)
      type = rlsync.question();   
    }
    getLoanDuration(type);
}

  function getLoanDuration(type) {
    let months;
    while (isInvalidTime(years)) {
      if (type === 'years' || type[0] === 'y') {
        prompt("Over how many years do you intend to pay the loan? ");
        months = rlsync.question() * 12;
      } else if (type === "months" || type[0] === 'm') {
        months = rlsync.question();
        prompt("Over how many months do you intend to pay the loan? ");
      } else if (type === "both" || type[0] === 'y') {
        prompt("Please answer with years first, then months");
        prompt(`Example: "10, 5" would be 10 years, 5 months`);
        months = rlsync.question();
        let split = months.split(',');
        split = split.forEach((element) => split.push(parseInt(element)));
        months = (split[0] * 12) + split[1];
      } else {
        prompt("sorry I didn't understand your answer, try again");
      }
    }
    return Number(years);
  }
  }
  






function isInvalidTime(number) {
  if (number.trimStart() === '' || Number.isNaN(Number(number))) {
    return true;
  } else if (Number(number.trimStart()) <= 0) {
    return true;
  }

  return false;
}