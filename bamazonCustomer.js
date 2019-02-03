var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

//connection to the bamazon database
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: process.env.MY_PASSWORD,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

//function that displays the stock and prompts the user to choose an item to buy
function whatToBuy() {
  connection.query("SELECT * FROM products", function(err, results) {
    console.table(results);
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "productId",
          type: "input",
          message: "What item id would you like to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many units would you like to buy?"
        }
      ])
      .then(function(answer) {
        console.log(answer);
        var quantity = parseInt(answer.quantity);

        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === parseInt(answer.productId)) {
            chosenItem = results[i];
            break;
          }
        }

        if (chosenItem.stock_quantity >= quantity) {
          //there were enough items to accomodate for the quantity that the buyer requests.
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenItem.stock_quantity - quantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],

            function(err, bamazonResponse) {
              if (err) {
                console.log(
                  "Sorry, something went wrong when processing your order :("
                );
              } else {
                var orderTotal = chosenItem.price * quantity;
                console.log(
                  `Thank you for shopping bamazon.com! Your order total is $${orderTotal}`
                );
              }
            }
          );
        } else {
          console.log(
            `Sorry there are not enough ${chosenItem.product_name} :(`
          );
        }
      });
  });
}

whatToBuy();
