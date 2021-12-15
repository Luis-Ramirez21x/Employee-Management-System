const inquirer = require('inquirer');
//const connection = require('mysql2/typings/mysql/lib/Connection');
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
        'Add a role',
        'Add an employee',
        'Update an employee',
        'Done',
        ],
    },
];
async function start(){
const response = await inquirer.prompt(initPrompt)
console.clear();
    //based on user response call upon the queries
    switch (response.action){
        case "View all departments":
            await querys.getDepartments();
            break;
        case "View all roles":
            querys.getRoles();
            break;
        case "View all employees":
            querys.getEmployee();
            break;
        case "Add a department":
            await querys.addDepartment();
            break;
        case "Add a role":
            await querys.addRole();
            break;
        case "Add an employee":
            await querys.addEmployee();
            break;
        case "Update an employee":
            await querys.updateEmployeeRole();
            break;
    }
 start();
};

start();