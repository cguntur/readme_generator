// TODO: Include packages needed for this application
const inquirer = require('inquirer');

const fs = require('fs');
const fileName = process.argv[2];

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Please enter the title for your ReadMe',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Enter the description of your project',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Enter the installation instructions',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Enter the usage information',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'Enter the contribution guidelines for this project',
        name: 'contribution',
    },
    {
        type: 'input',
        message: 'Enter the test instructions for this project',
        name: 'testing',
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    if(data){
        let template = fs.readFileSync("new_readme_template.md", "utf8");

        template = template.replace("{{title}}", data.title);
        template = template.replace("{{description}}", data.description);
        template = template.replace("{{installation}}", data.installation);
        template = template.replace("{{usage}}", data.usage);
        template = template.replace("{{contribution}}", data.contribution);
        template = template.replace("{{testing}}", data.testing);

        fs.writeFileSync(fileName, template);
    }
}

// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt(
        questions
    )
    .then((response) =>
        writeToFile(fileName, response)
    )
}

// Function call to initialize app
init();
