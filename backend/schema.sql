CREATE DATABASE cmsc_127_proj;
USE cmsc_127_proj;

--TABLE DEFINITIONS

--USER
CREATE TABLE user(
username VARCHAR(20) NOT NULL,
user_password LONGTEXT NOT NULL,
display_name VARCHAR(20) NOT NULL,
age INT(2) NOT NULL,
CONSTRAINT user_username_pk PRIMARY KEY (username)
);

--FOOD_ESTABLISHMENT
CREATE TABLE food_establishment(
establishment_id VARCHAR(10) NOT NULL,
establishment_name VARCHAR(20) NOT NULL,
establishment_address VARCHAR(100) NOT NULL,
establishment_cuisine VARCHAR(20) NOT NULL,
CONSTRAINT food_establishment_pk PRIMARY KEY(establishment_id)
);

--FOOD_ITEM
CREATE TABLE food_item(
item_id VARCHAR(10) NOT NULL,
item_name VARCHAR(20) NOT NULL,
item_price decimal(5,2),
food_type VARCHAR(5),
establishment_id VARCHAR(10) NOT NULL,
CONSTRAINT item_id_pk PRIMARY KEY(item_id),
CONSTRAINT item_establishment_id FOREIGN KEY(establishment_id) REFERENCES
food_establishment(establishment_id)
);

--FOOD_REVIEW
CREATE TABLE food_review(
entry_id VARCHAR(20) NOT NULL,
review VARCHAR(150),
rating INT(1) NOT NULL,
review_date date NOT NULL,
review_time time NOT NULL,
username VARCHAR(20) NOT NULL,
establishment_id VARCHAR(20) NULL,
item_id VARCHAR(20) NULL,
CONSTRAINT food_review_pk PRIMARY KEY (entry_id),
CONSTRAINT food_review_username FOREIGN KEY(username) REFERENCES user(username),
FOREIGN KEY(establishment_id) REFERENCES
food_establishment(establishment_id),
FOREIGN KEY(item_id) REFERENCES food_item(item_id)
);

INSERT INTO user (username, user_password, display_name, age) VALUES ("mike123", "12345", "Mike", 35);
INSERT INTO user (username, user_password, display_name, age) VALUES ("jeboy456", "12345", "Jeboy", 35);
INSERT INTO user (username, user_password, display_name, age) VALUES ("alex789", "12345", "Alex", 35);

--insert food establishment
INSERT INTO food_establishment(establishment_id, establishment_name, establishment_address, establishment_cuisine) 
VALUES ("estab1", "Mcdonald's", "Lopez Avenue", "American Fast Food");

--insert food establishment
INSERT INTO food_establishment(establishment_id, establishment_name, establishment_address, establishment_cuisine) 
VALUES ("estab2", "Mang Inasal", "SM North Edsa", "Filipino Fast Food");

--insert food establishment
INSERT INTO food_establishment(establishment_id, establishment_name, establishment_address, establishment_cuisine) 
VALUES ("estab3", "Pizza Hut", "Manila", "Pizza Shop");

--insert food establishment
INSERT INTO food_establishment(establishment_id, establishment_name, establishment_address, establishment_cuisine) 
VALUES ("estab4", "Dairy Queen", "Cubao", "Ice Cream Shop");


--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("mcitem1", "McWater", 5.00, "bev", "estab1");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("mcitem2", "Cheeseburger", 12.00, "burg", "estab1");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("mcitem3", "Fried Chicken", 20.00, "rice", "estab1");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("miitem1", "Chicken", 35.00, "bev", "estab2");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("miitem2", "BBQ", 36.00, "burg", "estab2");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("miitem3", "halo halo", 20.00, "rice", "estab2");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("pitem1", "Pepperoni Pizza", 56.00, "pizza", "estab3");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("pitem2", "Mozarella Sticks", 46.00, "pizza", "estab3");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("pitem3", "Hawaiian Pizza", 56.00, "pizza", "estab3");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("iitem2", "Coookies and Cream", 15.00, "ice", "estab4");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("iitem3", "Chocolate", 15.00, "ice", "estab4");




--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("72747ewu1313", "It is good, will come again soon", 5, CURDATE(), CURTIME(), "mike123", "estab1", "mcitem1");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("32uu3h2uh32", "It was okay, needs improvement", 3, CURDATE(), CURTIME(), "mike123", "estab1", "mcitem3");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("i32i32i11", "It is good, will buy again soon", 4, CURDATE(), CURTIME(), "mike123", "estab2", "miitem1");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("32hehuh2u3h2", "Bad food, bad customer service", 1, CURDATE(), CURTIME(), "jeboy456", "estab2", "miitem2");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("7eifuh32324", "Very tasty, will try again", 4, CURDATE(), CURTIME(), "jeboy456", "estab3", "pitem2");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("23ieh2h532oo", "Soo goooddd, my new favorite", 5, CURDATE(), CURTIME(), "jeboy456", "estab3", "pitem2");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("2o3i42i4i2", "Pretty good for the price", 4, CURDATE(), CURTIME(), "alex789", "estab3", "pitem3");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("ij23iji242ji", "It is mid", 3, CURDATE(), CURTIME(), "alex789", "estab4", "iitem2");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("2je2jehj2ji", "Very nice food and customer service", 5, CURDATE(), CURTIME(), "alex789", "estab4", "iitem3");











