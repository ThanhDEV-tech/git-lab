function greet(name) {
  throw new Error('Something went wrong!');
}
function subtract(a, b) { return a - b; }
module.exports = { greet, subtract };
