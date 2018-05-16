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

        if (bypass === true) {
        inquirer
        .prompt({
            name: "menu",
            type: "rawlist",
            message: "What would you like to do now?",
            choices: ["View Low Inventory", "Add to Inventory", "Add New Product", "Leave and come back later"]
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "View Low Inventory":
                    viewLowInventory()
                    break;
                case "Add to Inventory":
                    addToInventory()
                    break;
                case "Add New Product":
                    addProduct()
                    break;
                case "Leave and come back later":
                    leave()
                    break;
            }
        });
    }
    })
}


function viewLowInventory() {
    var chosenItems;
    var query = "SELECT * FROM products";
    connection.query(query, function (err, response) {
        for (var i = 0; i < response.length; i++) {
            chosenItems = response[i];}
            if (chosenItems.stock_quantity < 5) {

                var lowStock = new Table({
                    head: ['ID', 'Product', 'Department', 'Price', 'Quantity'],
                    colWidths: [5, 50, 40, 10, 10]
                });

                lowStock.push([chosenItems.item_id, chosenItems.product_name, chosenItems.department_name, chosenItems.price, chosenItems.stock_quantity])
                console.log(lowStock.toString());
            } else {
                console.log("No low inventory items at this time!")
            }

        inquirer.prompt({
            name: "menu",
            type: "rawlist",
            message: "What would you like to do now?",
            choices: ["View Products For Sale", "Add to Inventory", "Add New Product", "Leave and come back later"]
        })
            .then(function (answer) {
                switch (answer.menu) {
                    case "View Products For Sale":
                        viewProducts()
                        break;
                    case "Add to Inventory":
                        addToInventory()
                        break;
                    case "Add New Product":
                        addProduct()
                        break;
                    case "Leave and come back later":
                        leave()
                        break;
                }
            });
    })
}


function addToInventory() {

        bypass = false;
        viewProducts(); 
        connection.query("SELECT * FROM products", function (err, response) { 

        inquirer
            .prompt([
            {
                name: "choice",
                type: "input",
                message: "What is the ID of the product in which you'd like to add more inventory?",
                validate: function(input) {
                    var IDarray = []
                    for (var i = 0; i < response.length; i++) {
                        var IDs = response[i].item_id;
                        IDarray.push(IDs)
                    }
                    if (IDarray.indexOf(Number(input)) > -1) {
                      return true;
                    }
                    console.log(" Please enter a valid ID.")
                    return false;
                }
            },
            {
                name: "stock",
                type: "input",
                message: "How many units would you like to add?",
                validate: function(value) {
                    if (isNaN(value) === false && isNaN(value) > -1) {
                      return true;
                    }
                    console.log(" Please enter a valid number.")
                    return false;
                }
            }
        ])
    
        .then(function (answer) {
            var chosenItem;
            var chosenStock;
            var currentStock;

            for (var i = 0; i < response.length; i++) {
                if (Number(response[i].item_id) === Number(answer.choice))
                {
                chosenItem = response[i];
                }
            }

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
                        console.log("Your units were added to the inventory successfully!");
                        bypass = true;
                        viewProducts();
                    }
                )
        })
    });
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


function leave() {
    console.log(chalk.blue("See you later!"))
    process.exit();
}
