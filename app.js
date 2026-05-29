function add(a, b) { throw new Error('broken'); }
function subtract(a, b) { return a - b; }
module.exports = { add, subtract };
