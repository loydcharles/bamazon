-- Drops the bamazon if it already exists --
DROP DATABASE IF EXISTS bamazon;
-- Create a database called bamazon --
CREATE DATABASE bamazon;

CREATE TABLE products(
	item_id 		int(11) auto_increment,  
	product_name 	varchar(30),
    department_name varchar(30),
	price 			float,	
	primary key(item_id)  
);

-- Create new example rows
insert into products(product_name, department_name, price) values ('bike', 'toys', 100);
insert into products(product_name, department_name, price) values ('Planets of Aps', 'video', 20);
insert into products(product_name, department_name, price) values ('bike', 'toys', 100);
insert into products(product_name, department_name, price) values ('bike', 'toys', 100);
insert into products(product_name, department_name, price) values ('bike', 'toys', 100);
insert into products(product_name, department_name, price) values ('bike', 'toys', 100);
insert into products(product_name, department_name, price) values ('bike', 'toys', 100);
insert into products(product_name, department_name, price) values ('bike', 'toys', 100);
insert into products(product_name, department_name, price) values ('bike', 'toys', 100);
insert into products(product_name, department_name, price) values ('bike', 'toys', 100);