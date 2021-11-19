const inquirer = require('inquirer');
const querys = require('./querys');

const initPrompt = [
    {
    type: "list",
    message:"*** Employee Tracker ***",
    name: "action",
    choices: [
        'View all departments', 
        'View all roles', 
        'View all employees',
        'Add a department',
        'add a role',
        'add an employee',
        'update an employee',
        ],
    },
];

inquirer.prompt(initPrompt).then((response) => {
    //based on user response call upon the queries
    switch (response.action){
        case "View all departments":
            querys.getDepartments();
            break;
        case "View all roles":
            querys.getRoles();
            break;
        case "View all employees":
            querys.getEmployee();
            break;
        case "Add a department":
            querys.addDepartment();
            break;
    }
});