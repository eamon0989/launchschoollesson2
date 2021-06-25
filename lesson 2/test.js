// function changeName(name) {
//   name = ["bob"]; // does this reassignment change the variable outside the function?
// }

// function anotherFunction() {
//   let name = ["jim"];
//   changeName(name);
//   console.log(name); // => logs 'jim'
// }

// anotherFunction();

function cap(name) {
  name = name.toUpperCase();
  return name;
}

let myName = "naveed";
cap(myName);
console.log(myName); // => 'naveed'