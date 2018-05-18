# Bamazon!
VIDEO EXAMPLE: https://drive.google.com/open?id=1jdCjvusKm5mWMSvbDDHvFRKsk26cRO27

Bamazon is an Amazon-like storefront that uses MySQL, Node.js, packages like NPM Inquirer.js, and JavaScript to take in orders from customers and deplete stock from the store's inventory. Bamazon also has a Manager and Supervisor view that allows additional functionality - including adding new items, viewing low inventory, viewing product sales, and more.

Technologies Used:
Node.js, MySQL, Javascript

# How it works:

* Clone repo

* Create database and tables in MySQL using SQL file

* Install depedencies from package.json file

There are three views/apps to choose from:

# Customer App:
Enter "node bamazonCustomer" into the command line
Act as a customor and:
*Place a new order using the item's ID, and then input the amount of units
*Once you have placed the order, the app will check if the store has enough of the product to meet your request.

# Manager App:
Enter "node bamazonManager" into the command line
Act as a manager and:
*View products for sale
*View low inventory
*Add to the inventory
*Add a new product

# Supervisor App:
Enter "node bamazonSupervisor" into the command line
Act as a supervisor and:
*View product sales by department
*Create a new department
