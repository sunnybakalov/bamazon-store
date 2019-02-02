var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

// console.log(`
// ################
// *ITEMS FOR SALE*
// ################
//   ID  |NAME                                |PRICE      |QUANTITY
//       |                                    |           |
//   1   | nike air yeezy 2 solar             | $850      | 5
//   2   | lebron 8 south beach               | $725      | 10
//   3   | patagonia coat                     | $400      | 50
//   4   | north face coat                    | $350      | 50
//   5   | supreme backpack                   | $300      | 10
//   6   | lebron james lakers jersey         | $120      | 15
//   7   | derrick rose timberwolves jersey   | $120      | 10
//   8   | donovan mitchell jazz jersey       | $120      | 7
//   9   | apple iphone xs                    | $1,000    | 200
//   10  | samsung galaxy note 9              | $1,000    | 150
// #################################################################  
// `)

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: process.env.MY_PASSWORD,
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    displayInventory();
  });


  function displayInventory() {

    connection.query("SELECT * FROM products", function(err, results) {
      console.log(`
        ################
        *ITEMS FOR SALE*
        ################
        ID  |NAME              |PRICE      |QUANTITY
        `)

      for (var i = 0; i < results.length; i++) {
        console.log(`
        ${results[i].item_id}    |${results[i].product_name}    |${results[i].price}    |${results[i].stock_quantity}
        `);
      }

    })
  
  }


  function whatToBuy() {

    inquirer
      .prompt([
      {
        name: "product",
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
        // var query = "SELECT * FROM bamazon";


      });

    }