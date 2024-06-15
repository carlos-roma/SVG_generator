const fs = require('fs');
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("../Challenge 10/lib/shapes");

// validating input
function validateColor(input) {
  const colorKeywords = ['blue', 'green', 'yellow', 'red', 'orange', 'black', 'brown', 'gold', 'aqua'];
  if (colorKeywords.includes(input.toLowerCase())) {
    return true;
  } else {
    return 'please enter a valid color keyword or a hexadecimal number';
  }
};

// prompts the user for input
const shapeInstr = async () => {
  const UserInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'welcome to svg logo generator, please select up to three characters for your logo',
      validate: (input) => input.length > 0 && input.length <= 3,
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'choose text color',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'choose a shape:',
      choices: ['Circle', 'Triangle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'enter shape color (keyword or hex):',
      validate: validateColor,
    },
  ]);
  return UserInput;
};

// creates the svg file
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

  // set shape color and generate svg content
  selectedShape.setColor(shapeColor);
  const svgContent = `
    <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${selectedShape.render()}
      <text x="150" y="125" font-size="50" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;

  // write svg content to file
  fs.writeFileSync('logo.svg', svgContent);
  console.log('generated logo.svg');
};

// main function to run the app
const main = async () => {
  const userInput = await shapeInstr();
  createSVG(userInput);
};

// run the app
main();
