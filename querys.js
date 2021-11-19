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
  db.query(`INSERT INTO department (name) VALUES (?);`,'User-input2' ,(err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
  });
},
};


  //insert new role, create drop down for department, and a select to get all departments
function addRole(){
  db.query(`INSERT INTO roles (title,salary, department_id) VALUES (?,?,?);`, ['new role', 11000.00, 4] ,(err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
};
  //insert employee, select all roles and all employees 
function addEmployee() {
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`, ['John', 'Doe', 2, Luis] ,(err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
};

  //update employee. select all employees, grab role_id, update title to dropdown role;
function updateEmployeeRole(){
  db.query(`UPDATE roles SET title = "?" WHERE id = ?`, ['John', 1] ,(err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
};




  //port listen


 // SELECT e1.id, e1.first_name, e1.last_name, roles.title, department.name AS department, roles.salary, CONCAT(e2.first_name,' ',e2.last_name) AS manager FROM employee AS e1 JOIN roles ON e1.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee AS e2 ON e1.manager_id= e2.id;
  
 