var mySQL = require('mysql');
var inquirer = require('inquirer');
var connection = mySQL.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Shredder321@',
    database: 'bamazon'
});


connection.connect(function(err){

    if (err){
        console.log(err);
    }

    firstQuestion();

    
});

//test to see all of inventory and thread id
function afterConnection() {
connection.query('SELECT * FROM products', function(error, results, fields) {
    
        if (error) {
            console.log(error);
        }
        
        console.log("id: " + connection.threadId);

        for (i = 0; i < results.length; i++) {
            console.log(results[i].product_name);
        }

        
    });

};

function firstQuestion() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the I.D. number of the item you would like to purchase",
            name: "id"
        }
    ]).then(function(answer) {

        connection.query("SELECT * FROM products", function(error, results) {

            

            var chosenId;
            var isNotFound = true;

            if (error) {
                 console.log(error);
            }

            for (var i = 0; i < results.length; i++) {

                
                
                if (results[i].item_id === Number(answer.id) && results[i].stock_quantity >= 1) {
                    chosenId = results[i];
                    console.log(results[i].product_name + ", yes we have that in stock. we have " + results[i].stock_quantity);
                    isNotFound = false;
                    productDetails(results[i]);
                }

                else if ((results.length - 1) === i && isNotFound)
                {
                    console.log("sorry we dont have that product");
                }
            }
            
        });
    });
}

function secondQuestion() {
    inquier.prompt();
}


function productDetails(chosenItem) {
    connection.query("SELECT * FROM products", function(error, results) {

        console.log(chosenItem.product_name +  " costs: " + chosenItem.price);

        inquirer.prompt([
            {
                name: "decision",
                type: "input",
                message: "Would you like to purchase this item?"
            },
            {
                name: "amount",
                type: "input",
                message: "how many would you like to buy?"
            }
        ]).then(function(answer) {
           
            try {

            if (answer.decision === "yes" && answer.amount <= chosenItem.stock_quantity) {
                updateInventory(chosenItem, answer);
            }

            else {
                console.log("sorry we cant fulfill that order!");
            }
        }

        catch (error) { 
            console.error(error);

        }

        });

    });
}


function updateInventory(boughtItem, answer) {
    
    connection.query("UPDATE products SET stock_quantity = stock_quantity - " + answer.amount + " WHERE ?", {
        item_id: boughtItem.item_id
    }, function(error){

        var total = answer.amount * boughtItem.price;

        if(error) {
            console.log(error);
        }
        console.log("your total is: " + total);
        console.log("Thank you for the purchase!");
    });

};
