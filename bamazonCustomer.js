var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

console.log(`
################
*ITEMS FOR SALE*
################
  ID  |NAME                                |PRICE      |QUANTITY
      |                                    |           |
  1   | nike air yeezy 2 solar             | $850      | 5
  2   | lebron 8 south beach               | $725      | 10
  3   | patagonia coat                     | $400      | 50
  4   | north face coat                    | $350      | 50
  5   | supreme backpack                   | $300      | 10
  6   | lebron james lakers jersey         | $120      | 15
  7   | derrick rose timberwolves jersey   | $120      | 10
  8   | donovan mitchell jazz jersey       | $120      | 7
  9   | apple iphone xs                    | $1,000    | 200
  10  | samsung galaxy note 9              | $1,000    | 150
#################################################################  
`)

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: process.env.MY_PASSWORD,
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    inventorySearch();
  });


  function inventorySearch() {
    inquirer
      .prompt([
      {
        name: "product",
        type: "list",
        message: "What product would you like to buy?",
        choices: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10"
          ]
      },
      {
          name: "quantity",
          type: "input",
          message: "How many units would you like to buy?"
      }
    ])
      .then(function(answer) {
        console.log(answer);
        var query = "SELECT item_id, product_name, year FROM bamazon WHERE ?";

        connection.query(query, { product: answer.product }, function(err, res) {
            for (var i = 0; i < res.length; i++) {
              console.log(res[i].item_id);
            }
      });
    })}