const assert = require('assert');
const qs = require('./qs');

// 自我实现
function assert(expression, message) {
  if (!expression) {
    throw new Error(message)
  }
}

assert(qs.parse('name=st').name === 'st', 'name is st');
assert(qs.parse('age=9').age === '9', 'age is 9');