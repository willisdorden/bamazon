//Then create a Node application called bamazonCustomer.js.
// Running this application will first display all of the items available for sale.
// Include the ids, names, and prices of products for sale.
//The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
//  The second message should ask how many units of the product they would like to buy.

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var total = [];
var table = new Table({
    head:["ItemID", "Product-name", "Price", "Quantiy", ],
    colWidth:[5,20, 5, 5]
});


var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Clover0927",
    database: "bamazon_DB"
});

connection.connect(function(err){
    if (err) throw err;
    console.log(connection.threadId);
    buildTable();
});

var buildTable = function() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantiy]
            );
        }
        console.log(table.toString());
        runSearch();
    })
};


var runSearch = function() {
    inquirer.prompt({
        name: "firstQ",
        type: "input",
        message: " What is the ID of the first product you would like?"
    }).then(function (data) {
        var query = "SELECT * FROM products WHERE `item_id` = "+ data.firstQ;
            connection.query(query, function (err, res) {
                var name = res[0].product_name;
                var price = res[0].price;
                var quantiy = res[0].stock_quantiy;
                console.log("product: " + name + " " + "cost: " + price);
                productBuy(name, price, quantiy);
            })
        })
    };

var productBuy = function(name, price, quantiy){
    inquirer.prompt({
        name: "secondQ",
        type: "input",
        message: "How many of these item would you like to buy?"
    }).then(function (answer){
        console.log(answer.secondQ);
        if( answer.secondQ <= quantiy) {
            checkOut(answer.secondQ, name, price, quantiy);
        }else{
            console.log("Sorry we can not meet your demands");
            buildTable();
        }
    })
};

var checkOut = function(amount, name, price ,quantiy) {
    var totalPrice = amount * price;
   // console.log(totalPrice);
    var totalQuantiy = quantiy - amount;
    //console.log(totalQuantiy);
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [{
        stock_quantiy: totalQuantiy
    },{
        product_name: name
    }], function (err, res) {
        inquirer.prompt({
            name: "thirdQ",
            type: "list",
            message: "Would you like to make another purchase",
            choices:["yes", "no"]
        }).then(function(data){
            switch (data.thirdQ) {
                case "yes" :
                    table();
                    break;
                case "no" :
                        console.log("you have purchased " + name + " and the total cost is " + totalPrice.toFixed(2));

                    connection.end();
                    break;
            }
        })
    })
};







