CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER NOT NULL,
	product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR (100) NOT NULL,
    price INTEGER NOT NULL,
	stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values (10, 'shower curtain', 'home', 22.99, 4);