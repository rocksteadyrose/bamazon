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
    showList();
});



function showList() {
    connection.query("SELECT * FROM products", function(err, response) {

    var table = new Table({
        head: ['ID', 'Product', 'Price'],
        widths: [80, 80, 80]
    });

    for (var i = 0; i < response.length; i++) {
        table.push([response[i].item_id + response[i].product_name + response[i].price])
    }
    console.log(table.toString()); 

    updateItems ()

})}

    function updateItems () {

    connection.query("SELECT * FROM products", function (err, response) {

        if (err) throw err;
        inquirer
            .prompt([
                {   name: "choice",
                    type: "input",
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
                connection.query("SELECT * FROM products WHERE item_id=?", answer.choice, function(err, response) 
                {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].item_id == answer.choice) {
                        chosenItem = response[i];
                        console.log(chosenItem)
                    }
                    } 

                    if (answer.stock < chosenItem.stock_quantity) {
                        var stockUpdate = chosenItem.stock_quantity - answer.stock;
                        console.log(stockUpdate)
                        var query = connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: stockUpdate
                                },
                                {
                                    item_id: answer.choice
                                }
                            ],
                            function (error) {
                                if (error) throw err;
                                console.log("Purchased successfully!");
                                //   start();
                            }
                        );
                    }
                    // else {
                    //     console.log("Insufficient quantity!");
                    //     console.log(chosenItem)
                    //     //   start();
                    // }
                }
            )
            })})
        }