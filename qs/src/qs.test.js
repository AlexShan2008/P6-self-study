let qs = require('./qs');

// jest facebook
// 1个.test.js文件就是一个Suit
// 1个describe就是一个分组
// 1个test就是一个测试用例
// 相等断言
// 包含断言
// 逻辑断言 大 小 相等 不等
// NOT取反

// Test Suites: 1 passed, 1 total
// Tests:       4 passed, 4 total

describe('parse', () => {
  test('one', () => {
    expect(qs.parse('name=st').name).toBe('st');
  });

  test('two', () => {
    expect(qs.parse('age=9').age).toBe('9');
  });
});

describe('stringify', () => {
  test('three', () => {
    expect(qs.stringify({ name: 'st' })).toBe('name=st');
  });
  test('four', () => {
    expect(qs.stringify({ age: 9 })).toBe('age=9');
  });
});

