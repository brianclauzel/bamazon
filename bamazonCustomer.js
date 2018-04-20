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

    // connection.end();
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

        connection.end();
    });

};

function firstQuestion() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the I.D. number of the item you would like to purchase",
            name: "id"
        },
        {
            type: "input",
            message: "How many of this item would you like to purchase?",
            name: "quantity"
        }
    ]).then(function(answer) {

        connection.query("SELECT * FROM products", function(error, results) {

            var chosenId;
            var isNotFound = true;

            if (error) {
                 console.log(error);
            }

            for (var i = 0; i < results.length; i++) {
                
                if (results[i].item_id === Number(answer.id) && results[i].stock_quantity >= Number(answer.quantity)) {
                    chosenId = results[i];
                    console.log(results[i].product_name + ", yes we have that in stock");
                    isNotFound = false;
                    productDetails(results[i]);
                }

                else if ((results.length - 1) === i && isNotFound)
                {
                    console.log("sorry we dont have that product");
                }
            }
            connection.end();
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
                type: "input",
                message: "Would you like to purchase this item?",
                name: "answer"
            }
        ]).then(function(error, answer) {

        });
        
    });
}
