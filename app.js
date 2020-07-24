const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");
const teamMembers = [];

const employeeType = [
    { type: 'list', name: 'employeeType', message: 'What type of employee would you like to add?', choices: ["Engineer","Intern","None"] }
]

const managerQuestions = [
    { type: 'input', name: 'name', message: 'What is your name?' }, 
    { type: 'input', name: 'email', message: 'What is your email?' }, 
    { type: 'input', name: 'id', message: 'What is your ID?' }, 
    { type:'input', name: 'officeNumber', message: 'What is your office number?'}
]

const engineerQuestions = [
    { type: 'input', name: 'name', message: 'What is your name?' }, 
    { type: 'input', name: 'email', message: 'What is your email?' }, 
    { type: 'input', name: 'id', message: 'What is your ID?' }, 
    { type: 'input', name: 'githubUser', message: 'What is your GitHub username?' }
]

const internQuestions = [
    { type: 'input', name: 'name', message: 'What is your name?' }, 
    { type: 'input', name: 'email', message: 'What is your email?' }, 
    { type: 'input', name: 'id', message: 'What is your ID?' }, 
    { type: 'input', name: 'schoolName', message: 'What school do you attend?' }
]

const createManager = () => {
    inquirer.prompt(managerQuestions) 
    .then(response => {
        const manager = new Manager(response.name, response.email, response.id, response.officeNumber)
        teamMembers.push(manager)
        createTeam();
       
    })
}

const createEngineer = () => {
    inquirer.prompt(engineerQuestions)
    .then(response => {
        const engineer = new Engineer(response.name, response.email, response.id, response.githubUser)
        teamMembers.push(engineer)
        createTeam();
    });

}
const createIntern = () => {
    inquirer.prompt(internQuestions)
    .then(response => {
        const intern = new Intern(response.name, response.email, response.id, response.schoolName)
        teamMembers.push(intern)
        createTeam();
    });

}

function createTeam() {
    inquirer.prompt(employeeType)
    .then(response => {
        switch(response.employeeType) {
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                buildTeam();
                break;
        }
    })
}

function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
}

createManager();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
