require("./abc"); // One module into another
const { calculateMultiply, calculateSum } = require("./calculate");

// * core module of nodejs which gives you the access of util object and this object has a lot important functions and properties.

const util = require("node:util")
 
const data = require("./data.json");

// const obj = require("./sum")
// const { calculateSum } = require("./calculate/sum");
// const { calculateMultiply } = require("./calculate/multiply");

console.log(JSON.stringify(data));
// console.log(data)
var name = "Namaste Node";

var a = 10;
var b = 20;

console.log(name);

calculateSum(a, b);
calculateMultiply(a, b);

// console.log(a + a)
// obj.calculateSum(a,b)
// console.log(hello)
// console.log(global)

// console.log(this) // Returns Empty object : It is not equal to global obj

// console.log(globalThis) // Referce to the global object same in browser also

console.log(globalThis === global); // true
