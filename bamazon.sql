DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("yeezys", "shoes", $850, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lebron 8 south beach", "shoes", $725, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("patagonia coat", "outerwear", $400, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("north face coat", "outerwear", $350, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("supreme backpack", "bags", $300, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lebron james lakers jersey", "sports apparel", $120, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("derrick rose timberwolves jersey", "sports apparel", $120, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("donovan mitchell jazz jersey", "sports apparel", $120, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("apple iphone xs", "cell phones", $1000, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("samsung galaxy note 9", "cell phones", $1000, 150);