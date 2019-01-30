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
        type: "input",
        message: "What is the id of the product that you would like to buy?",
      },
      {
          name: "quantity",
          type: "input",
          message: "How many units would you like to buy?"
      }
    ])
      .then(function(answer) {
        console.log(answer);
      });
  }