INSERT INTO department (name)
VALUES ("Mobile"),
       ("Computers"),
       ("Appliances"),
       ("Home Theatre");

INSERT INTO roles (title, salary, department_id)
VALUES ("At&t Vendor", 30000.00, 1),
       ("Verizon Vendor", 30000.00, 1),
       ("Computer Advisor", 25000.00, 2),
       ("Appliance Sup", 50000.00, 3),
       ("Appliance Advisor", 28000.00, 3),
       ("Magnolia Specialist", 35000.00, 4),
       ("Lg Vendor", 45000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luis", "Ramirez", 1, null),
       ("Ashok", "Hiram", 5, 1),
       ("Quan", "Tran", 3, 1);
       
       
      