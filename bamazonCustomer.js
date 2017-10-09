var mysql = require("mysql");
require('console.table');
var inquirer = require("inquirer");

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

  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
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
      choices: ["VIEW ITEMS", "BUY AN ITEM", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.option.toUpperCase() === "VIEW ITEMS") {
        console.table(res);
        start(res);
      }
      else if (answer.option.toUpperCase() === "BUY AN ITEM") {
        console.log("Here is the items for sale");
        console.table(res);
        buyItem(res);
      }
      else if (answer.option.toUpperCase() === "EXIT") {
        process.exit(1);
      }
    });
}

function buyItem(res) {
   inquirer
    .prompt([
    {
      name: "item",   
      type: "input",   
      message: "Please enter item_id for purchase?"      
    },
    {
      name: "quantity",
      type: "input",
      message: "How many items would you like to buy?"
    }]).then(function(order) {      
        if(order.quantity > res[order.item-1].stock_quantity) {
      //the order we have start from 1 where the object from DB starts from 0
         console.log("Insufficient quantity!");
         start(res);
       }
       else {
          console.log("Total Cost: $" + order.quantity * res[order.item-1].price);     
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: res[order.item-1].stock_quantity - order.quantity
              },
              {
                item_id: order.item
              }
            ],
            function(error) {
              if (error) throw err;              
                connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
                if (err) throw err;
                console.table(res);
                start(res);
              });
            }
          );
       } 
    });
}