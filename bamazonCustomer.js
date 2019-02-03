var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: process.env.MY_PASSWORD,
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    // displayInventory();
  });


  // function displayInventory() {

  //   connection.query("SELECT * FROM products", function(err, results) {
  //     console.log(`
  //       ################
  //       *ITEMS FOR SALE*
  //       ################
  //       ID  |NAME              |PRICE      |QUANTITY
  //       `)

  //     for (var i = 0; i < results.length; i++) {
  //       console.log(`
  //       ${results[i].item_id}    |${results[i].product_name}    |${results[i].price}    |${results[i].stock_quantity}
  //       `);
  //     }

  //   })
  
  // }


  function whatToBuy() {

    connection.query("SELECT * FROM products", function(err, results) {

      console.table(results);
      if (err) throw err;

    inquirer
      .prompt([
      {
        name: "productId",
        type: "input",
        message: "What product id would you like to buy?",
      },
      {
          name: "quantity",
          type: "input",
          message: "How many units would you like to buy?"
      }
    ])
      .then(function(answer) {
        console.log(answer);
        // var query = "SELECT * FROM products";

        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.productId) {
            chosenItem = results[i];
          }
        }

        if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
          //there were enough items to accomodate for the quantity that the buyer requests.
          connection.query("UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity : stock_quantity - quantity
            },
            {
              
            }
          ]
          )
        }

      });

    })
    }

    whatToBuy();