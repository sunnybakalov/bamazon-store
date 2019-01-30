var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: process.env.MY_PASSWORD,
    database: ""
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
            "nike air yeezy 2 solar",
            "lebron 8 south beach",
            "patagonia coat",
            "north face coat",
            "supreme backpack",
            "lebron james lakers jersey",
            "derrick rose timberwolves jersey",
            "donovan mitchell jazz jersey",
            "apple iphone xs",
            "samsung galaxy note 9"
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