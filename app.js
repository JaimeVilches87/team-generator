const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


//Array containing employee info that will be used to push into render function
const employeeArray = {
    'manager': [],
    'engineer': [],
    'intern': []
};


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
            employeeArray.manager.push(new Manager(name, id, email, officeNumber))
            EmployeeQuestions();
        })
};

//first ask if they want to enter an intern, engineer or if they are finished
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
                        employeeArray.engineer.push(new Engineer(name, id, email, github))

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
                        employeeArray.intern.push(new Intern(name, id, email, school))

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
    const dataTemplate = render(employeeArray);
    fs.writeFileSync('./output/team.html', dataTemplate);
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
