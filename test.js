const { add, subtract } = require('./app');

let passed = 0, failed = 0;

function assert(desc, actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${desc}`);
    passed++;
  } else {
    console.error(`FAIL: ${desc} — expected ${expected}, got ${actual}`);
    failed++;
  }
}

assert('add(2,3) = 5', add(2, 3), 5);
assert('subtract(5,2) = 3', subtract(5, 2), 3);

console.log(`\nResult: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
