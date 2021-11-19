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

    //view all departments
  db.query(`SELECT * FROM DEPARTMENT`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });

  //view all positions with departments
  db.query(`SELECT roles.title AS Job_Title,roles.id AS Role_Id, department.name AS department, roles.salary AS Salary FROM roles JOIN department ON roles.department_id = department.id;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });

  //view all roles 
  db.query(`SELECT e1.id, e1.first_name, e1.last_name, roles.title, department.name AS department, roles.salary, CONCAT(e2.first_name,' ',e2.last_name) AS manager FROM employee AS e1 JOIN roles ON e1.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee AS e2 ON e1.manager_id= e2.id;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });

  //insert new department
  db.query(`INSERT INTO department (name) VALUES (?);`,'User-input2' ,(err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });

  //insert new role
  db.query(`INSERT INTO roles (name) VALUES (?,?,?);`,'new role',11000.00,4 ,(err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });

  //port listen
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

 // SELECT e1.id, e1.first_name, e1.last_name, roles.title, department.name AS department, roles.salary, CONCAT(e2.first_name,' ',e2.last_name) AS manager FROM employee AS e1 JOIN roles ON e1.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee AS e2 ON e1.manager_id= e2.id;
  