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
establishment_cost VARCHAR(5) NOT NULL,
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
establishment_id VARCHAR(20),
item_id VARCHAR(20),
CONSTRAINT food_review_pk PRIMARY KEY (entry_id),
CONSTRAINT food_review_username FOREIGN KEY(username) REFERENCES user(username),
CONSTRAINT food_review_establishment_id FOREIGN KEY(establishment_id) REFERENCES
food_establishment(establishment_id),
CONSTRAINT food_review_item_id FOREIGN KEY(item_id) REFERENCES food_item(item_id)
);