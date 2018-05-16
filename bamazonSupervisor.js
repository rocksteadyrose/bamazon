var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var chalk = require('chalk');
var figlet = require('figlet');
var bypass = true;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"
});

// figlet('BAMAZON!', function (err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data)
// });

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    showList();
});

function showList() {
    inquirer
        .prompt({
            name: "menu",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "View Product Sales by Department":
                    viewProductSales();
                    break;
                case "Create New Department":
                    newDepartment()
                    break;
            }
        });
}

function viewProductSales() {

}

function newDepartment() {
    
}