const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
//const { FORMERR } = require('dns');
//const { join } = require('path/posix');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      password: 'Nodejs74123',
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
  );


  
module.exports = {
    //view all departments
getDepartments:function getDepartments() {   
  db.query(`SELECT * FROM DEPARTMENT`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
  });
},


  //view all roles w departments
getRoles: function getRoles(){ 
  db.query(`SELECT roles.title AS Job_Title,roles.id AS Role_Id, department.name AS department, roles.salary AS Salary FROM roles JOIN department ON roles.department_id = department.id;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
  });
},  

  //view all employees
getEmployee: function getEmployees() {
  db.query(`SELECT e1.id, e1.first_name, e1.last_name, roles.title, department.name AS department, roles.salary, CONCAT(e2.first_name,' ',e2.last_name) AS manager FROM employee AS e1 JOIN roles ON e1.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee AS e2 ON e1.manager_id= e2.id;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
  });
},

  //insert new department
addDepartment: function addDepartment() { 
  const departmentPrompt = [
    {
      type: "input",
      message:"What department would you like to add?",
      name: "department",
    },
  ]
  inquirer.prompt(departmentPrompt)
          .then((response) => {
  db.query(`INSERT INTO department (name) VALUES (?);`, response.department ,(err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
  })
}
  )
},

  //insert new role, create drop down for department, and a select to get all departments
addRole: function addRole(){
     let departmentsArr = [];
     let departmentsList = [];
     let departmentId = [];
    db.query(`SELECT * FROM DEPARTMENT`, (err, result) => {
      if (err) {
        console.log(err);
      }
      departmentsArr = result;
      for(i=0; i < departmentsArr.length; i++){
            departmentsList[i] = departmentsArr[i].name;
            departmentId[i] = departmentsArr[i].id;
      };
    });
    

  const rolePrompt = [
    {
      type: "input",
      message:"What role would you like to add?",
      name: "role",
    },
    {
      type: "input",
      message:"What is the salary?",
      name: "salary",
    },
    {
      type: "list",
      message:"What department does the role belong to?",
      name: "department",
      choices: departmentsList,
    },
  ]
  
  inquirer.prompt(rolePrompt)
          .then((response) =>{
            
            let id = 0;
            id = departmentId[departmentsList.indexOf(response.department)];
            db.query(`INSERT INTO roles (title,salary, department_id) VALUES (?,?,?);`, [response.role, response.salary, id] ,(err, result) => {
              if (err) {
                console.log(err);
              }
              console.log(result);
            });
          })
},

  //insert employee, select all roles and all employees 
addEmployee: function addEmployee() {
     let rolesArr = [];
     let rolesList = [];
     let rolesId = [];
     db.query(`SELECT * FROM roles`, (err, result) => {
      if (err) {
        console.log(err);
      }
      rolesArr = result;
      for(i=0; i < rolesArr.length; i++){
            rolesList[i] = rolesArr[i].title;
            rolesId[i] = rolesArr[i].id;
      };
    });

     let employeeArr = [];
     let employeeList = [];
     let employeeId = [];
    db.query(`SELECT * FROM employee`, (err, result) => {
      if (err) {
        console.log(err);
      }
      
      employeeArr = result;
      
      for(i=0; i < employeeArr.length; i++){
            employeeList[i] = employeeArr[i].first_name + " " + employeeArr[i].last_name ;
            employeeId[i] = employeeArr[i].id;
      };

    });
    

   const managerPrompt = [
    {
      type: "input",
      message:"What is your employee's first name?",
      name: "firstName",
    },
    {
      type: "input",
      message:"What is your employee's last name?",
      name: "lastName",
    },
    {
      type: "list",
      message:"What title will your employee have?",
      name: "title",
      choices: rolesList,
    },
    {
      type: "list",
      message:"Whose there manager?",
      name: "manager",
      choices: employeeList,
    },
  ]
//maybe wrap the prompt into a function?

  inquirer.prompt(managerPrompt)
  .then((response) =>{

let titleId = 0;
titleId = rolesId[rolesList.indexOf(response.title)];

let managerId = 0;
managerId = employeeId[employeeList.indexOf(response.manager)];

db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`, [response.firstName, response.lastName, titleId, managerId] ,(err, result) => {
if (err) {
console.log(err);
}
console.log(result);
});
});



},



  //update employee. select all employees, grab role_id, update title to dropdown role;
updateEmployeeRole: function updateEmployeeRole(){
  let rolesArr = [];
  let rolesList = [];
  let rolesId = [];
  db.query(`SELECT * FROM roles`, (err, result) => {
   if (err) {
     console.log(err);
   }
   rolesArr = result;
   for(i=0; i < rolesArr.length; i++){
         rolesList[i] = rolesArr[i].title;
         rolesId[i] = rolesArr[i].id;
   };
   
 });
  

  let employeeArr = [];
  let employeeList = [];
  let employeeId = [];
  db.query(`SELECT * FROM employee`, (err, result) => {
   if (err) {
     console.log(err);
   }
   
   employeeArr = result;
   
   for(i=0; i < employeeArr.length; i++){
         employeeList[i] = employeeArr[i].first_name + " " + employeeArr[i].last_name ;
         employeeId[i] = employeeArr[i].id;
   };
  
 });
//creating prompt

  const prompt = [
    {
      type: "list",
      message:"Are you sure you'd like to adjust an employee's role?",
      name: "yoink",
      choices: ['Yes', 'No'],
    },
    {
      type: "list",
      message:"Which employee's role would you like to change?",
      name: "employee",
      choices: employeeList,
    },
    {
      type: "list",
      message:"What role would you like to choose?",
      name: "title",
      choices: rolesList,
    },
  ]
  inquirer.prompt(prompt).then((response) =>{
    
    let id = 0;
    id = employeeId[employeeList.indexOf(response.employee)];
    
    let titleId = 0;
    titleId = rolesId[rolesList.indexOf(response.title)];

  
  //REMEMEBR TO CHNAGE ROLE ID TOO!
  db.query(`UPDATE employee SET role_id = "?" WHERE id = ?`, [titleId, id] ,(err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
})
},
};