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
    food_type VARCHAR(10),
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
    FOREIGN KEY(establishment_id) REFERENCES food_establishment(establishment_id),
    FOREIGN KEY(item_id) REFERENCES food_item(item_id)
);

INSERT INTO user (username, user_password, display_name, age) VALUES ("mike123", "12345", "Mike", 35);
INSERT INTO user (username, user_password, display_name, age) VALUES ("jeboy456", "12345", "Jeboy", 35);
INSERT INTO user (username, user_password, display_name, age) VALUES ("alex789", "12345", "Alex", 35);

--FOOD ESTABLISHMENTS
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

--insert food establishment
INSERT INTO food_establishment(establishment_id, establishment_name, establishment_address, establishment_cuisine)
VALUES ("estab5", "Jollibee", "Grove", "Filipino Fast Food");

--insert food establishment
INSERT INTO food_establishment(establishment_id, establishment_name, establishment_address, establishment_cuisine)
VALUES ("estab6", "Jollibee", "Olivarez Plaza", "Filipino Fast Food");

--insert food establishment
INSERT INTO food_establishment(establishment_id, establishment_name, establishment_address, establishment_cuisine)
VALUES ("estab7", "Jollibee", "National Highway cor. Lopez Avenue", "Filipino Fast Food");

-- FOOD ITEMS
-- MCDONALD'S
--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("mcdo1", "Sprite", 5.00, "bev", "estab1");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("mcdo2", "Coke Zero", 5.00, "bev", "estab1");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("mcdo3", "Cheeseburger", 15.00, "burger", "estab1");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("mcdo4", "ChickenMcDo", 35.00, "meat", "estab1");

-- MANG INASAL
--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("mang1", "Paa Large", 35.00, "meat", "estab2");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("mang2", "Pecho Large", 36.00, "meat", "estab2");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("mang3", "Halo-Halo", 20.00, "dessert", "estab2");

-- PIZZA HUT
--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("phut1", "Meat Lovers", 56.00, "pizza", "estab3");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("phut2", "Super Supreme", 46.00, "pizza", "estab3");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("phut3", "Philly Cheesesteak", 56.00, "pizza", "estab3");

-- DAIRY QUEEN
--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("dq1", "Royal Oreo", 15.00, "dessert", "estab4");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("dq2", "Double Dutch", 15.00, "dessert", "estab4");

--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("dq3", "Chocolate Chip", 15.00, "dessert", "estab4");

--JOLLIBEE
--insert food item
INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("jabee1", "ChickenJoy", 30.00, "meat", "estab5");

INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("jabee2", "Tuna Pie", 10.00, "meat", "estab5");

INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("jabee3", "Burger Steak", 20.00, "meat", "estab5");

INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("jabee4", "ChickenJoy", 30.00, "meat", "estab6");

INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("jabee5", "Peach Mango Pie", 10.00, "dessert", "estab6");

INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("jabee6", "JolliHotdog", 15.00, "meat", "estab6");

INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("jabee7", "ChickenJoy", 30.00, "meat", "estab7");

INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("jabee8", "JolliSpaghetti", 20.00, "pasta", "estab7");

INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id)
VALUES ("jabee9", "Chocolate Sundae", 10.00, "dessert", "estab7");

--FOOD REVIEWS
--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("32uu3h2uh32", "It was okay, needs improvement", 3, CURDATE(), CURTIME(), "mike123", NULL, "mcdo3");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("i32i32i11", "It is good, will buy again soon", 4, CURDATE(), CURTIME(), "mike123", NULL, "mang1");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("7eifuh32324", "Very tasty, will try again", 4, CURDATE(), CURTIME(), "jeboy456", NULL, "phut2");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("23ieh2h532oo", "Soo goooddd, my new favorite", 5, CURDATE(), CURTIME(), "jeboy456", NULL, "phut2");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("2o3i42i4i2", "Pretty good for the price", 4, CURDATE(), CURTIME(), "alex789", NULL, "phut3");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("ij23iji242ji", "It is mid", 3, CURDATE(), CURTIME(), "alex789", NULL, "dq2");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("18hatiha1810", "Pastry was extremely crisp and filling was flavorful", 5, CURDATE(), CURTIME(), "alex789", NULL, "jabee2");

--insert food review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("11sesekl001", "Chicken was really dry", 1, CURDATE(), CURTIME(), "mike123", NULL, "jabee1");

-- ESTAB REVIEWS
--insert estab review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("azaz41axza43", "Place was really clean and food is great", 4, CURDATE(), CURTIME(), "jeboy456", "estab1", NULL);

--insert estab review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("32hehuh2u3h2", "Bad food, bad customer service", 1, CURDATE(), CURTIME(), "jeboy456", "estab2", NULL);

--insert estab review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("72747ewu1313", "Great place, will come again soon", 5, CURDATE(), CURTIME(), "mike123", "estab3", NULL);

--insert estab review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("901919tkth44", "I like the vibe and ambiance of the place. Food was decent", 4, CURDATE(), CURTIME(), "mike123", "estab4", NULL);

--insert estab review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("8283amjmm32", "Servers were extremely rude but the food was great", 2, CURDATE(), CURTIME(), "alex789", "estab7", NULL);

--insert estab review
INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) 
VALUES ("16gffxhj165", "Great customer service and amazing food", 5, CURDATE(), CURTIME(), "alex789", "estab6", NULL);