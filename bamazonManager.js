var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var chalk = require('chalk');
var figlet = require('figlet');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showList();
});


// figlet('BAMAZON!', function (err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data)
// });

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
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLowInventory()
                    break;
                case "Add to Inventory":
                    addToInventory()
                    break;
                case "Add New Product":
                    addProduct()
                    break;
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, response) {

        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price', 'Quantity'],
            colWidths: [5, 50, 30, 10, 10]
        });

        for (var i = 0; i < response.length; i++) {

            table.push([response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity])
        }

        console.log(table.toString());

    })
}

function viewLowInventory() {
    var chosenItems;
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function (err, response) {
        for (var i = 0; i < response.length; i++) {
            chosenItems = response[i];
            if (chosenItems.stock_quantity < 5) {

                var lowStock = new Table({
                    head: ['ID', 'Product', 'Department', 'Price', 'Quantity'],
                    colWidths: [5, 50, 40, 10, 10]
                });

                lowStock.push([chosenItems.item_id, chosenItems.product_name, chosenItems.department_name, chosenItems.price, chosenItems.stock_quantity])
                console.log(lowStock.toString());
            }
        }
    })
}


function addToInventory() {
    viewProducts();
    inquirer
        .prompt([
            {
                name: "choice",
                type: "input",
                message: "What is the product in which you'd like to add more inventory?"
            },
            {
                name: "stock",
                type: "input",
                message: "How many units would you like to add?"
            }
        ])
        .then(function (answer) {
            var chosenItem;
            var chosenStock;

            connection.query("SELECT * FROM products WHERE item_id=?", answer.choice, function (err, response) {
                for (var i = 0; i < response.length; i++) {
                    if (Number(response[i].item_id) === Number(answer.choice)) {
                        chosenItem = response[i];
                    }
                }
                console.log(chosenItem)
                chosenStock = Number(chosenItem.stock_quantity) + Number(answer.stock);

                var query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: chosenStock

                        },
                        {
                            item_id: answer.choice

                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log(chosenStock)
                        console.log("Your items were added to the inventory successfully!");
                        viewProducts();
                    }
                )
            })
        })
}

function addProduct() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What is the name of the product you'd like to add?"
            },
            {
                name: "department",
                type: "input",
                message: "In which department should the product go?"
            },
            {
                name: "price",
                type: "input",
                message: "How much does the product cost?"
            },
            {
                name: "stock",
                type: "input",
                message: "How many units are in stock?"
            }
        ])
        .then(function (answer) {
            var productName = answer.product;
            var departmentName = answer.department;
            var price = Number(answer.price);
            var stock = Number(answer.stock);

                var query = connection.query(
                    "INSERT INTO products SET ?",
                        {
                            product_name: productName,
                            department_name: departmentName,
                            price: price,
                            stock_quantity: stock
                        },
                    function (err) {
                        if (err) throw err;
                        console.log("Your product was added to the store successfully!");
                        viewProducts();
                    }
                )
            })
}
