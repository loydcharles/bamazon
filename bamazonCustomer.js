var mysql = require("mysql");
require('console.table');
var inquirer = require("inquirer");
var readline = require('readline');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  console.log("Welcome to BAmazon");
  if (err) throw err;

  connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
 //   console.table(res);
    start(res);
  });
});


function start(res) {
  inquirer
    .prompt({
      name: "option",
      type: "list",
      message: "Would you like to VIEW or Buy an Item?",
      choices: ["VIEW ITEMS", "BUY", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.option.toUpperCase() === "VIEW ITEMS") {
        console.table(res);
        start();
      }
      else if (answer.option.toUpperCase() === "BUY") {
        console.log("Here is the items for sale");
        console.table(res);
      }
      else if (answer.option.toUpperCase() === "EXIT") {
        process.exit(1);
      }
    });
}