// * Modules protect their variables and functions from leaking.

function calculateSum(a, b) {
  console.log(a + b);
}
module.exports = { calculateSum };

// older way
// module.exports = { hello: hello, calculateSum: calculateSum };

// console.log("hello from sum");

// var hello = "calculate function ran successfull";
