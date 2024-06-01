import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

//create mysql pool
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

//FUNCTIONS FOR REPORTS TO BE GENERATED

const result = await pool.query("SELECT * FROM user;");
const rows = result[0];
// console.log(rows);

async function findUser(username, age) {
  const [rows] = await pool.query(
    `SELECT * from user where username = ? and age = ?;`,
    [username, age]
  );

  return rows;
}

//view all establishments
async function viewAllEstablishments(order) {
  const [rows] = await pool.query(
    `SELECT food_establishment.establishment_name AS "Establishment Name",
    food_establishment.establishment_address AS "Address",
    food_establishment.establishment_cuisine AS "Cuisine",
    food_establishment.establishment_cost AS "Price Range",
    AVG(food_review.rating) AS "Average Rating"
    FROM food_establishment JOIN food_review
    ON food_establishment.establishment_id=food_review.establishment_id WHERE food_review.establishment_id is NOT NULL GROUP BY food_review.establishment_id
    ORDER BY AVG(food_review.rating) ${order};`
  );

  return rows;
}

const usertest = await viewAllEstablishments("ASC");
console.log(usertest);

//view all food reviews for an establishment
async function viewAllFoodReviewsEstablishment(establishment_name) {
  const [rows] = await pool.query(
    `SELECT food_item.item_name AS "Food Name", food_establishment.establishment_name AS
    "Establishment Name", review AS "Review", rating AS "Rating", user.display_name AS "Display
    Name", review_date AS "Date", review_time AS "Time"
    FROM food_review JOIN food_item ON food_review.item_id=food_item.item_id
    JOIN food_establishment ON food_review.establishment_id=food_establishment.establishment_id
    JOIN user ON user.username=food_review.username WHERE food_establishment.establishment_name= ? ORDER BY food_review.entry_id,
    food_review.username, food_review.establishment_id, food_review.item_id; `,
    [establishment_name]
  );

  return rows;
}

//view all food reviews for a food item
async function viewAllFoodReviewsFoodItem(food_name) {
  const [rows] = await pool.query(
    `SELECT food_item.item_name AS "Food Name", food_establishment.establishment_name AS
    "Establishment Name", review AS "Review", rating AS "Rating", user.display_name AS "Display
    Name", review_date AS "Date", review_time AS "Time"
    FROM food_review JOIN food_item ON food_review.item_id=food_item.item_id
    JOIN food_establishment ON
    food_review.establishment_id=food_establishment.establishment_id
    JOIN user ON user.username=food_review.username WHERE food_item.item_name= ?
    ORDER BY food_review.entry_id,
    food_review.username, food_review.establishment_id, food_review.item_id; `,
    [food_name]
  );

  return rows;
}

//view all food items from an establishment
async function viewAllFoodItems(establishment_name, order) {
  const [rows] = await pool.query(
    `SELECT * FROM food_item JOIN food_establishment
    ON food_item.establishment_id=food_establishment.establishment_id
    WHERE food_establishment.establishment_name= ?
    ORDER BY food_item.item_price ${order};`,
    [establishment_name]
  );

  return rows;
}

//view all food items from an establishment that belong to a food type {meat | veg | etc}
async function viewAllFoodItemsWithType(type, establishment_name) {
  const [rows] = await pool.query(
    `SELECT * FROM food_item JOIN food_establishment
    ON food_item.establishment_id=food_establishment.establishment_id
    WHERE food_item.food_type="${type}" AND food_establishment.establishment_name= ?
    ORDER BY food_item.item_price DESC;`,
    [establishment_name]
  );
}

//view all reviews made within a month for an establishment or a food items
async function viewAllMonthlyReviews() {
  const [rows] = await pool.query(
    `SELECT food_item.item_name AS "Food Name", food_establishment.establishment_name AS
    "Establishment Name", review AS "Review", rating AS "Rating", user.display_name AS "Display
    Name", review_date AS "Date", review_time AS "Time"
    FROM food_review JOIN food_item ON food_review.item_id=food_item.item_id
    JOIN food_establishment ON
    food_review.establishment_id=food_establishment.establishment_id
    JOIN user ON user.username=food_review.username WHERE (MONTH(CURDATE()) =
    MONTH(food_review.review_date)) GROUP BY food_review.entry_id, food_review.username,
    food_review.establishment_id, food_review.item_id;`
  );

  return rows;
}

//view all establishments with a high average rating (rating >= 4). (rating from 1-5; highest is 5);
async function viewAllHighAverageRatingEstablishments() {
  const [rows] = await pool.query(
    `SELECT f.establishment_id, e.establishment_name, e.establishment_address, e.establishment_cuisine, AVG(r.rating) AS average_rating
    FROM food_review r JOIN food_establishment e ON r.establishment_id = e.establishment_id JOIN food_item f ON r.item_id = f.item_id
    GROUP BY f.establishment_id, e.establishment_name, e.establishment_address, e.establishment_cuisine
    HAVING AVG(r.rating) >= 4;`
  );

  return rows;
}

//view all food items from an establishment arranged according to price
async function viewAllFoodItemsOrderByPrice() {
  const [rows] = await pool.query(
    `SELECT item_name, item_price FROM food_item
    WHERE establishment_id = 'INSERT ID HERE'
    ORDER BY item_price;`
  );

  return rows;
}

//search food items from any establishment based on a given price range and/or food type.
async function searchFoodItem2() {
  const [rows] = await pool.query(
    `SELECT f.item_id, f.item_name, f.item_price, f.food_type, e.establishment_name FROM
    food_item f JOIN food_establishment e ON f.establishment_id = e.establishment_id
    WHERE ({min_price} IS NULL OR f.item_price >= {min_price})
    OR ({max_price} IS NULL OR f.item_price <= {max_price})
    OR ({food_type} IS NULL OR f.food_type = {food_type});`
  );

  return rows;
}

//FEATURES

//ADD, UPDATE, AND DELETE A FOOD REVIEW (ON A FOOD ESTABLISHMENT OR A FOOD ITEM)

//Add a food review (on a food establishment or a food item);
async function addFoodReview() {
  const result = await pool.query(
    `INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username,
    establishment_id, item_id) VALUES ("12345678910", "It is good", 5, CURDATE(), CURTIME(),
    "user123", "12345", "134523");`
  );

  return result;
}

async function addUser() {
  const [result] =
    await pool.query(`INSERT INTO user (username, user_password, display_name, age) VALUES ("testing", "12345", "Mike", 35);
  `);

  return result;
}

const adduser = await addUser();

console.log(adduser);

//Update a food review (on a food establishment or a food item);
async function updateFoodReview() {
  const result = await pool.query(
    `UPDATE food_review SET review="It is good", rating=5, review_date=CURDATE(),
    review_time=CURTIME() WHERE entry_id="12345678910";`
  );

  return result;
}

//Delete a food review (on a food establishment or a food item);
async function deleteFoodReview() {
  const result = await pool.query(
    `DELETE FROM food_review WHERE entry_id="12345678910";`
  );

  return result;
}

//ADD, DELETE, SEARCH, AND UPDATE A FOOD ESTABLISHMENT

//ADD A FOOD ESTABLISHMENT
async function addFoodEstablishment() {
  const result = await pool.query(
    `INSERT INTO food_establishment(establishment_id, establishment_name, establishment_address,
      establishment_cuisine, establishment_cost)
      VALUES("1234567890", "McDonald's", "Lopez Avenue", "American Fast Food", "$$$");`
  );

  return result;
}

//DELETE A FOOD ESTABLISHMENT
async function deleteFoodEstablishment() {
  const result = await pool.query(
    `DELETE FROM food_establishment WHERE establishment_name="McDonald's";`
  );

  return result;
}

//SEARCH A FOOD ESTABLISHMENT
async function searchFoodEstablishment() {
  const result = await pool.query(
    `SELECT * FROM food_establishment WHERE establishment_name="McDonald's";`
  );

  return result;
}

//UPDATE A FOOD ESTABLISHMENT
async function updateFoodEstablishment() {
  const result = await pool.query(
    `UPDATE food_establishment SET establishment_name="McDo", establishment_cost="$" WHERE
    establishment_name="McDonald's";`
  );

  return result;
}

//ADD, DELETE, SEARCH AND UPDATE FOOD ITEM

//ADD A FOOD ITEM
async function addFoodItem() {
  const result = await pool.query(
    `INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id) VALUES
    ("12314", "McWater", "5.00" "beverage", "12345678890");`
  );

  return result;
}

//DELETE A FOOD ITEM
async function deleteFoodItem() {
  const result = await pool.query(
    `DELETE FROM food_item WHERE item_name = "McWater";`
  );

  return result;
}

//SEARCH A FOOD ITEM
async function searchFoodItem() {
  const result = await pool.query(
    `SELECT * FROM food_item WHERE item_name = "McWater";`
  );

  return result;
}

//UPDATE A FOOD ITEM
async function updateFoodItem() {
  const result = await pool.query(
    `UPDATE food_item SET item_name = "Jolly Hatdog", item_price = "50.00" WHERE item_name =
    "Jolly Hotdog";`
  );

  return result;
}
