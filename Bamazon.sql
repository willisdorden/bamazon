CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INTEGER DEFAULT 0,
  product_name VARCHAR(55) NOT NULL,
  department_name VARCHAR(55) NOT NULL,
  price DECIMAL(10,2) NOT NULL ,
  stock_quantiy INTEGER DEFAULT 0,
  PRIMARY KEY (id)
);

  INSERT INTO products(item_id,product_name,department_name,price,stock_quantiy)
    VALUES ( 20,"harmonica","music",7.99,12);

  INSERT INTO products(item_id,product_name,department_name,price,stock_quantiy)
    VALUES (10,"peeps","sesonal",2.99,10);

  INSERT INTO products(item_id,product_name,department_name,price,stock_quantiy)
    VALUES (431,"light bulb","home & garden",9.99,20);

  INSERT INTO products(item_id,product_name,department_name,price,stock_quantiy)
    VALUES (33,"rubber ducky","novalty",5.99,100);

  INSERT INTO products(item_id,product_name,department_name,price,stock_quantiy)
    VALUES (178,"iphone","electronics",700,1000);

  INSERT INTO products(item_id,product_name,department_name,price,stock_quantiy)
    VALUES (284-1,"chewbacca","clothing",39.99,13);

  INSERT INTO products(item_id,product_name,department_name,price,stock_quantiy)
    VALUES (3,"banana","produce",.69,25);

  INSERT INTO products(item_id,product_name,department_name,price,stock_quantiy)
    VALUES (517,"coffee","food",5.99,5);

  INSERT INTO products(item_id,product_name,department_name,price,stock_quantiy)
    VALUES (932,"sponge","cleaning",4.50,50);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantiy)
VALUES (27,"florial purse","accesories",25.00,16);