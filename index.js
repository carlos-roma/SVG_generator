const fs = require('fs');
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");

// validating input
function validateColor(input) {
  const colorKeywords = ['blue', 'green', 'yellow', 'red', 'orange', 'black', 'brown', 'gold', 'aqua','white'];
  if (colorKeywords.includes(input.toLowerCase())) {
    return true;
  } else {
    return 'Please enter a valid color keyword or a hexadecimal number';
  }
}

// prompts the user for input
const shapeInstr = async () => {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Welcome to SVG logo generator, please select up to three characters for your logo',
      validate: (input) => {
        return input.length > 0 && input.length <= 3 ? true : 'Please enter between 1 to 3 characters';
      },
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Choose text color',
      validate: validateColor,
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['Circle', 'Triangle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hex):',
      validate: validateColor,
    },
  ]);
  return userInput;
};

// creates the SVG file
function createSVG({ text, textColor, shape, shapeColor }) {
  let selectedShape;
  switch (shape) {
    case 'Circle':
      selectedShape = new Circle();
      break;
    case 'Triangle':
      selectedShape = new Triangle();
      break;
    case 'Square':
      selectedShape = new Square();
      break;
  }

  // set shape color and generate SVG content
  selectedShape.setColor(shapeColor);
  const svgContent = `
    <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${selectedShape.render()}
      <text x="150" y="125" font-size="50" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;

  // write SVG content to file
  fs.writeFileSync('logo.svg', svgContent);
  console.log('Generated logo.svg');
}

// main function to run the app
const main = async () => {
  const userInput = await shapeInstr();
  createSVG(userInput);
};

// run the app
main();
