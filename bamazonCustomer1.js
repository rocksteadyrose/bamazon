var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
    start();
});




function start() {
    var table = new Table({
        head: ['ID', 'Product', 'Price'],
        widths: [80, 80, 80]
    });

    connection.query("SELECT * FROM products", function (err, response) {

        if (err) throw err;
        inquirer
            .prompt([
                {

                    name: "choice",
                    type: "list",
                    choices: function () {
                        

                        for (var i = 0; i < response.length; i++) {
                            table.push([response[i].item_id + response[i].product_name + response[i].price])
                        }
                        console.log(table.toString());                    
                    },

                    message: "What is the ID of the item you'd like to purchase?"
                },
                {
                    name: "stock",
                    type: "input",
                    message: "How many units would you like to purchase?"
                }
            ])
            .then(function (answer) {
                    var chosenItem;
                    var choice = JSON.stringify(answer.choice)
                    var productID = choice.charAt(1);

                    for (var i = 0; i < response.length; i++) {
                        if (response[i].item_id == productID) {
                            chosenItem = response[i];
                        }
                    }

                    // if (response.stock_quantity < parseInt(answer.stock)) {
                    //     connection.query(
                    //         "UPDATE products SET ? WHERE ?",
                    //         [
                    //             {
                    //                 stock_quantity: answer.stock
                    //             },
                    //             {
                    //                 item_id: chosenItem.id
                    //             }
                    //         ],
                    //         function (error) {
                    //             if (error) throw err;
                    //             console.log("Purchased successfully for" + variable);
                    //             //   start();
                    //         }
                    //     );
                    // }
                    // else {
                    //     console.log("Insufficient quantity!");
                    //     //   start();
                    // }
            
            })})}