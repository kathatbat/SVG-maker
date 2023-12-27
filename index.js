const inquirer = require ("inquirer");
// const jest = require ("jest");
const fs = require ("fs");

const questions = [
    {
        type:"input",
        name:"text",
        message: "Enter up to 3 characters for your logo.",
    },
    {
        type:"input",
        name:"text-color",
        message:"What color do you want the text to be? (hexadecimal number)",
    },
    {
        type:"list",
        message:"What shape do you want your logo to be?",
        name:"shape",
        choices: ['circle', 'triangle', 'square'],
    },
    {
        type:"input",
        message:"What color do you want the shape's color?",
        name:"shape-color",
    },
];

async function init() {
    try {
        const answers = await inquirer.prompt(questions);
        const svgLogo = generateSVG(answers);
        const fileName = "logo.svg";

        fs.writeFileSync(fileName, svgLogo);
        console.log("User answers", answers);
    } catch (error) {
        console.error("Error", error);
    }
};


function generateSVG(answers) {
    let shapeSVG = '';
    switch (answers.shape) {
        case 'circle':
            shapeSVG = `<circle cx="50" cy="50" r="50" fill="${answers['shape-color']}" />`;
            break;
        case 'triangle':
            shapeSVG = `<polygon points="50,0 100,100 0,100" fill="${answers['shape-color']}" />`;
            break;
        case 'square':
            shapeSVG = `<rect width="100" height="100" fill="${answers['shape-color']}" />`;
            break;
        default:
            console.error("Unsupported shape");
            return '';
    };
    const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    ${shapeSVG}
    <text x="50" y="50" fill="${answers['text-color']}" text-anchor="middle" alignment-baseline="middle" font-size="20">${answers.text}</text>
    </svg>`;
    return svg;
};

init();