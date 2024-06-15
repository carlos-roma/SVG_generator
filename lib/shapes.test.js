const { Circle, Square, Triangle } = require('./shapes');

// logs test result
const logTestResult = (shapeName, result) => {
  console.log(`Test for ${shapeName}: ${result ? 'PASSED' : 'FAILED'}`);
};

describe('shape render tests', () => {
  // test for circle rendering
  test('circle render method should return correct svg string', () => {
    const circle = new Circle();
    circle.setColor('red');
    const result = circle.render() === '<circle cx="150" cy="100" r="80" height="100%" width="100%" fill="red" />';
    logTestResult('circle', result);
    expect(result).toBe(true);
  });

  // test for square rendering
  test('square render method should return correct svg string', () => {
    const square = new Square();
    square.setColor('blue');
    const result = square.render() === '<rect x="50" height="200" width="200" fill="blue" />';
    logTestResult('square', result);
    expect(result).toBe(true);
  });

  // test for triangle rendering
  test('triangle render method should return correct svg string', () => {
    const triangle = new Triangle();
    triangle.setColor('green');
    const result = triangle.render() === '<polygon height="100%" width="100%" points="150, 18 244, 182 56, 182" fill="green" />';
    logTestResult('triangle', result);
    expect(result).toBe(true);
  });
});
