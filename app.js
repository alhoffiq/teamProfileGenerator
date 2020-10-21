const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let allEmployees = [];

promptUser();

function promptUser() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the employee's name?"
            },
            {
                name: "id",
                type: "input",
                message: "What is the employee's ID number?"
            },
            {
                name: "email",
                type: "input",
                message: "What is the employee's Email?"
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee's role",
                choices: ["Manager", "Engineer", "Intern"]
            },
        ])
        .then(answersOne => {
            if (answersOne.role === "Manager") { // Questions specific to managers
                inquirer
                    .prompt([
                        {
                            name: "officeNumber",
                            type: "input",
                            message: "What is the manager's office number?"
                        },
                        {
                            name: "another",
                            type: "list",
                            message: "Would you like to add another employee?",
                            choices: ["Yes", "No"]
                        },
                    ])
                    .then(async answersTwo => {
                        const employee = new Manager(answersOne.name, answersOne.id, answersOne.email, answersTwo.officeNumber);
                        allEmployees.push(employee);
                        if (answersTwo.another === "Yes") {
                            promptUser();
                        }
                        else {
                            fs.writeFile(outputPath, render(allEmployees), 'utf-8', (err) => {
                                if (err) throw err;
                                console.log("File generated!")
                            });
                        }

                    })
            }
            else if (answersOne.role === "Engineer") { // Questions specific to engineers
                inquirer
                    .prompt([
                        {
                            name: "github",
                            type: "input",
                            message: "What is the engineer's github profile name?"
                        },
                        {
                            name: "another",
                            type: "list",
                            message: "Would you like to add another employee?",
                            choices: ["Yes", "No"]
                        },
                    ])
                    .then(async answersTwo => {
                        const employee = new Engineer(answersOne.name, answersOne.id, answersOne.email, answersTwo.github);
                        allEmployees.push(employee);
                        if (answersTwo.another === "Yes") {
                            promptUser();
                        }
                        else {
                            fs.writeFile(outputPath, render(allEmployees), 'utf-8', (err) => {
                                if (err) throw err;
                                console.log("File generated!")
                            });
                        }
                    })
            }
            else { // Questions specific to interns
                inquirer
                    .prompt([
                        {
                            name: "school",
                            type: "input",
                            message: "What school did the intern attend?"
                        },
                        {
                            name: "another",
                            type: "list",
                            message: "Would you like to add another employee?",
                            choices: ["Yes", "No"]
                        },
                    ])
                    .then(async answersTwo => {
                        const employee = new Intern(answersOne.name, answersOne.id, answersOne.email, answersTwo.school);
                        allEmployees.push(employee);
                        if (answersTwo.another === "Yes") {
                            promptUser();
                        }
                        else {
                            fs.writeFile(outputPath, render(allEmployees), 'utf-8', (err) => {
                                if (err) throw err;
                                console.log("File generated!")
                            });
                        }


                    });
            };
        });
    }
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
