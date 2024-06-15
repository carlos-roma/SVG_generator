const { Circle, Square, Triangle } = require('./shapes');


const logTestResult = (shapeName, result) => {
  console.log(`Test for ${shapeName}: ${result ? 'PASSED' : 'FAILED'}`);
};

describe('Shape Render Tests', () => {
  test('Circle render method should return correct SVG string', () => {
    const circle = new Circle();
    circle.setColor('red');
    const result = circle.render() === '<circle cx="150" cy="100" r="80" height="100%" width="100%" fill="red" />';
    logTestResult('Circle', result);
    expect(result).toBe(true);
  });

  test('Square render method should return correct SVG string', () => {
    const square = new Square();
    square.setColor('blue');
    const result = square.render() === '<rect x="50" height="200" width="200" fill="blue" />';
    logTestResult('Square', result);
    expect(result).toBe(true);
  });

  test('Triangle render method should return correct SVG string', () => {
    const triangle = new Triangle();
    triangle.setColor('green');
    const result = triangle.render() === '<polygon height="100%" width="100%" points="150, 18 244, 182 56, 182" fill="green" />';
    logTestResult('Triangle', result);
    expect(result).toBe(true);
  });
});
