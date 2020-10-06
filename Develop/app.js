const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
//Create function that ask the user questions that through prompts to create new employees
function createEmployees() {
    //First question that asks which type of employee the user wants to create
    inquirer.prompt([
        {
            name: "employee",
            message: "Which role would you like to create?",
            type: "list",
            choices: ["Manager", "Engineer", "Intern", "End"]
        }
    ]).then(function(answer) {
        //Switch statement to ask the correct questions after the type of employee has been selected by the user
        switch (answer.employee) {
            //Case for if Manager was selected. The manager will be asked a different question than the other roles. Managers have office room numbers
            case "Manager":
                inquirer.prompt([
                    {
                        name: "name",
                        message: "What is the name of the Manager?",
                        type: "input"
                    },
                    {
                        name: "email",
                        message: "What is the Manager's email?",
                        type: "input"
                    },
                    {
                        name: "officeNumber",
                        message: "What is the Manager's office number?",
                        type: "input"
                    }
                ]).then(function (answer) {
                    //Creating an id based off how many employees have been created. 
                    const id = employees.length += 1;
                    //Role is set off the first question so this is now static
                    const role = "Manager";
                    //Creating the manger with the constructor
                    const manager = new Manager(answer.name, id, answer.email, role, answer.officeNumber);
                    //push employee to the employee array to now have each employee
                    employees.push(manager);
                    //Call function again to keep creatign more employees
                    createEmployees();
                })
                break;

            //Create case for if an engineer is selected by the user
            case "Engineer":
                //Create question for the user to make the engineer, the engineer has the unique quetion for their github username
                inquirer.prompt([
                    {
                        name: "name",
                        message: "What is the name of the Engineer?",
                        type: "input"
                    },
                    {
                        name: "email",
                        message: "What is the Engineer's email?",
                        type: "input"
                    },
                    {
                        name: "username",
                        message: "What is the Engineer's github username?"
                    }
                ]).then(function(answer) {
                    //Create id based on the total number of employees in the employee array
                    const id = employees.length += 1;
                    //Creater role, role is static based of the first question asked to the user
                    const role = "Engineer";
                    //Create new engineer using the engineer contructor
                    const engineer = new Engineer(answer.name, id, answer.email, role, answer.username);
                    //push the new engineer tothe employee array
                    employees.push(engineer);
                    //Call the createEmployee funciton to repeat the process
                    createEmployees();
                })
                break;
                //Create case for the intern role. unique question for the intern is what school do they go to
                case "Intern":
                    inquirer.prompt([
                        {
                            name: "name",
                            message: "What is the name of the Intern?",
                            type: "input"
                        },
                        {
                            name: "email",
                            message: "What is the Intern's email?",
                            type: "input"
                        },
                        {
                            name: "school",
                            message: "What school does the Intern attend?",
                            type: "input",

                        }
                    ]).then(function(answer) {
                    //Create id based on the total number of employees in the employee array
                    const id = employees.length += 1;
                    //Creater role, role is static based of the first question asked to the user
                    const role = "Intern";
                    //Create new intern using the engineer contructor
                    const intern = new Intern(answer.name, id, answer.email, role, answer.school);
                    //push the new intern to the employee array
                    employees.push(intern);
                    //Call the createEmployee funciton to repeat the process
                    createEmployees();
                    })
                    break;

                //Create a way to exit the recursive function
                case "End":
                    
                    fs.writeFile('main.html', render(employees), function (err) {
                        if (err) throw err;
                        console.log("Completed!");})
                    break;
             }}
)}

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
createEmployees();
module.exports = {employees};
