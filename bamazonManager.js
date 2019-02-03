//this is the file that allows the manager to  look at the inventory, allow them to add to the inventory, and to add new products.
var mysql = require('mysql');
var inquirer = require('inquirer');
require("dotenv").config();

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: process.env.MY_PASSWORD,
    database: 'bamazon'
})

connection.connect(function (err) {
    if (err) throw err;
});

function managerView() {
    inquirer
        .prompt({
            name: 'managerChoice',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }).then(function(answer) {
            switch (answer.managerChoice) {
                case 'View Products for Sale':
                  console.log('View Products for Sale');
                  connection.query('SELECT * FROM products',
                  function (err, results) {
                      if (err) throw err;
                      console.table(results);
                      connection.end()
                  })
                  break;
                case 'View Low Inventory':
                  console.log('View Low Inventory');
                  connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function (err, results) {
                      if (err) throw err;
                      console.table(results);
                      connection.end();
                  })
                  break;
                // case 'Add to Inventory':
                //   console.log('Add to Inventory');
                //   connection.query('', function (err, results) {
                //       if (err) throw err;
                //       //show entire inventory
                //       //use iquiere to prompt for what item_it
                //       //use iquiere to prompt for how much stock quantityt (make sure to parseInt both values)
                //       //update statment
                //       connection.end()
                //   })
                //   break;
                // case 'Add New Product':
                //   console.log('Add New Product');
                //   connection.query('', function (err, results) {
                //     if (err) throw err;
                //     //insert statement
                //     connection.end()
                //   })
                //   break;
                default:
                
            }
        })
}

managerView();