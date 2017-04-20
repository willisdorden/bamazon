//Create a new Node application called bamazonManager.js. Running this application will:
// List a set of menu options:
//View Products for Sale
//  View Low Inventory
//Add to Inventory
//Add New Product
//If a manager selects View Products for Sale, the app should list every available item:
// the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with a inventory count lower than five.
// If a manager selects Add to Inventory,
// your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.


var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var productArr = [];
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
    mangerPrompt();
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

    })
};
// List a set of menu options:
//View Products for Sale
//  View Low Inventory
//Add to Inventory
//Add New Product

var mangerPrompt = function(){
    inquirer.prompt({
        name: "input1",
        type: "list",
        message: "Menu Options",
        choices: ["Products for Sale",
                  "Low Inventory",
                  "Add to Inventory",
                  "Add New Product"
        ]
    }).then(function(answer){
        switch(answer.input1){
            case "Products for Sale":
                productForSale();
                break;
            case "Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
        }
    })
};
var productForSale = function() {
    buildTable();
    setTimeout(mangerPrompt, 500);
};

var update = function(data){
    
}

var lowInventory = function(){
    var query = "SELECT * FROM products WHERE `stock_quantiy` < " + 5;
    connection.query(query, function(err,res){
        for(var i=0; i < res.length; i++){
            console.log(" || item_id: " + res[i].item_id + "  || product_name: " + res[i].product_name + "  ||  price " + res[i].price + "   || stock_quantiy " + res[i].stock_quantiy);
        }
    });
    setTimeout(mangerPrompt, 500);
};

var addToInventory = function() {
        connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer.prompt([{
            type: "list",
            message: "Which item would you like to restock?",
            choices: function() {
                for (var i = 0; i < res.length; i++) {
                    productArr.push("ID: " + res[i].item_id + " - " + res[i].product_name);
                }
                return productArr;
            },
            name: "input"
        }]).then(function(data) {
            for (var x = 0; x < res.length; x++) {

                switch (data.input) {
                    case productArr[x]:
                        update(res[x]);
                }
            }
        })
    });
};


var addNewProduct = function(){
    inquirer.prompt([{
        name: "product_name",
        message: "What is the name of the product you would like to add?"
    }, {
        name: "department_name",
        message: "What department should it be placed in?"
    }, {
        name: "price",
        message: "What will it cost?"
    }, {
        name: "stock_quantity",
        message: "How many units do we have?"
    }]).then(function(answers) {
        connection.query("INSERT INTO products SET ?", {
            product_name: answers.product_name,
            department_name: answers.department_name,
            price: answers.price,
            stock_quantity: answers.stock_quantity
        }, function(err, res) {
            if (err) throw err;
        });
    });
    inquirer.prompt([{
        type: "list",
        message: "Would you like to do more?",
        choices: ["Yes", "No"],
        name: "input"
    }]).then(function(response) {
        if (response.input === "Yes") {
            addNewProduct();
        } else {
            connection.end(function() {
                console.log("thank you.");
            });
            setTimeout(mangerPrompt, 500);

        }
    });
};
