const city1 = {
  name: 'a',
  home: 'beijing'
};
const city2 = {
  name: 'a',
  home: 'beijing'
};

test('tobe', () => {
  expect(1).toBe(1);
  expect('h').toBe('h');
  expect(city1).toEqual(city2);
  expect([1, 2, 3]).toEqual([1, 2, 3]);
  expect(null).toBeNull();
  expect(NaN).toBeNaN();
})