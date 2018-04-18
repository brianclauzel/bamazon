var mySQL = require('mysql');
var inquirer = require('inquirer');
var connection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shredder321@',
    database: 'bamazon'
});


connection.connect(function(err){
    if (err){
        console.log(err);
    }
});

connection.query('SELECT * FROM products', function(error, results, fields) {
    if (error) {
        console.log(error);
    }
    for (i = 0; i < results.length; i++) {
        console.log(results[i] + "\n");
    }
    
});
