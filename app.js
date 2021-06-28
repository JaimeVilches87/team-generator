const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util');
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputFile = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//Array containing employee info that will be used to push into render function
const employeeArray = [];

//first ask questions
const ManagerQuestions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please Enter The Team Manager\'s Name'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please Enter The Team Manager\'s Employee ID'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please Enter The Team Manager\'s Email Address'
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Please Enter The Team Manager\'s Office Number'
        }])
        //create a new object of the manager and push it to the array, 
        // then call employee questions
        .then(({ name, id, email, officeNumber }) => {
            employeeArray.push(new Manager(name, id, email, officeNumber))
            EmployeeQuestions();
        })
};

//then ask if they want to enter an intern, engineer or if they are finished
const EmployeeQuestions = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Would you like to add an Engineer, an Intern or are you finished?',
            choices: ['Engineer', 'Intern', 'I am finished']
        }])
        //if Engineer is selected then
        .then(({ choice }) => {
            if (choice === 'Engineer') {
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Please Enter The Engineer\'s Name'
                    },
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Please Enter The Engineer\'s Employee ID'
                    },
                    {
                        type: 'input',
                        name: 'email',
                        message: 'Please Enter The Engineer\'s Email Address'
                    },
                    {
                        type: 'input',
                        name: 'github',
                        message: 'What is the Engineer\'s Github username?'
                    }
                ])

                    //create a new object of engineer and push it to the array, 
                    // then call employee questions again
                    .then(({ name, id, email, github }) => {
                        employeeArray.push(new Engineer(name, id, email, github))

                        return EmployeeQuestions();
                    })
            }

            //if Intern is selected then
            else if (choice === 'Intern') {
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Please Enter The Intern\'s Name'
                    },
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Please Enter The Intern\'s Employee ID'
                    },
                    {
                        type: 'input',
                        name: 'email',
                        message: 'Please Enter The Intern\'s Email Address'
                    },
                    {
                        type: 'input',
                        name: 'school',
                        message: 'Please enter Intern\'s school name'
                    }
                ])

                    //create a new object of engineer and push it to the array, 
                    // then call employee questions again
                    .then(({ name, id, email, school }) => {
                        employeeArray.push(new Intern(name, id, email, school))

                        return EmployeeQuestions();
                    })
            }
            //when I am Finished is selected then call function to write html
            else {
                writeHTML();
            }
        })
};

// function to call render function to return HTML and write it on team.html
const writeHTML = () => {
    // console.log(employeeArray);
    const dataTemplate = render(employeeArray);
    fs.writeFileSync(outputFile, dataTemplate);

}
const init = async () => {
    console.log('Welcome To The Team Profile Generator!');
    try {
        ManagerQuestions(); //Prompt manager for team information
    } catch (err) {
        console.log(err);
        console.log('There was an error with user input');
    };
};

// Function call to initialize app
init();

