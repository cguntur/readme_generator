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
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for this project',
        choices: ['GPL V3', 'MIT License', 'Mozilla Public License', 'Apache License'],
    },
    {
        type: 'input',
        message: 'Enter your GitHub username',
        name: 'github',
    },
    {
        type: 'input',
        message: 'Enter your Email address',
        name: 'email',
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    if(data){
        let template = fs.readFileSync("new_readme_template.md", "utf8");
        var email = data.email;
        var github = data.github;
        var license = data.license;

        template = template.replace("{{title}}", data.title);
        template = template.replace("{{description}}", data.description);
        template = template.replace("{{installation}}", data.installation);
        template = template.replace("{{usage}}", data.usage);
        template = template.replace("{{contribution}}", data.contribution);
        template = template.replace("{{testing}}", data.testing);
        template = template.replace("{{license}}", displayLicense(license));
        template = template.replace("{{badge}}", displayLicenseBadge(license));
        template = template.replace("{{github}}", displayGithubProfile(github));
        template = template.replace("{{email}}", displayEmail(email));

        fs.writeFileSync(fileName, template);
    }
}

function displayLicense(license){
    if(license == ""){
        var licenseInfo = "";
    }
    licenseInfo = `This project is licensed under ${license}\n\n`;

    switch (license) {
        case 'GPL V3':
            licenseInfo += `[Learn more about ${license}](https://opensource.org/license/gpl-3-0)\n`;
          break;
        case 'MIT License':
            licenseInfo += `[Learn more about ${license}](https://opensource.org/license/mit)\n`;
            break;
        case 'Mozilla Public License':
            licenseInfo += `[Learn more about ${license}](https://opensource.org/license/mpl-2-0)\n`;
          break;
          case 'Apache License':
            licenseInfo += `[Learn more about ${license}](https://opensource.org/license/apache-2-0)\n`;
          break;
        default:
          licenseInfo = "";
      }
    return licenseInfo;
}

function displayLicenseBadge(license){
    var licenseBadge = "";
    switch (license) {
        case 'GPL V3':
            licenseBadge = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
          break;
        case 'MIT License':
            licenseBadge = `[![License: MIT](https://assets-global.website-files.com/5e0f1144930a8bc8aace526c/65dd9eb5aaca434fac4f1c34_License-MIT-blue.svg)](/LICENSE)`;
            break;
        case 'Mozilla Public License':
            licenseBadge = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
          break;
          case 'Apache License':
            licenseBadge = `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
          break;
        default:
            licenseBadge = "";
      }
      return licenseBadge;
    
}

function displayGithubProfile(github){
    var githubProfile = `[View my Github Profile](https://github.com/${github})`;

    return githubProfile;
}

function displayEmail(email){
    var eamilContent = `If you have any questions about this project, you can contact me at [${email}](mailto:${email})`;
    return eamilContent;
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
