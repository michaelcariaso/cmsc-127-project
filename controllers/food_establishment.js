import { pool } from "../database.js";
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

//view all reviews made within a month for an establishment
async function viewAllMonthlyReviewsEstablishment(date, establishment_name) {
  const [rows] = await pool.query(
    `SELECT food_item.item_name AS "Food Name", food_establishment.establishment_name AS
      "Establishment Name", review AS "Review", rating AS "Rating", user.display_name AS "Display
      Name", review_date AS "Date", review_time AS "Time"
      FROM food_review JOIN food_item ON food_review.item_id=food_item.item_id
      JOIN food_establishment ON
      food_review.establishment_id=food_establishment.establishment_id
      JOIN user ON user.username=food_review.username WHERE (MONTH(${date}) =
      MONTH(food_review.review_date)) WHERE establishment.establishment_name = ? GROUP BY food_review.entry_id, food_review.username,
      food_review.establishment_id, food_review.item_id;`,
    [establishment_name]
  );

  return rows;
}

//view all reviews made within a month for a food item
async function viewAllMonthlyReviewsFoodItem(date, item_name) {
  const [rows] = await pool.query(
    `SELECT food_item.item_name AS "Food Name", food_establishment.establishment_name AS
      "Establishment Name", review AS "Review", rating AS "Rating", user.display_name AS "Display
      Name", review_date AS "Date", review_time AS "Time"
      FROM food_review JOIN food_item ON food_review.item_id=food_item.item_id
      JOIN food_establishment ON
      food_review.establishment_id=food_establishment.establishment_id
      JOIN user ON user.username=food_review.username WHERE (MONTH(${date}) =
      MONTH(food_review.review_date)) WHERE food_item.item_name = ? GROUP BY food_review.entry_id, food_review.username,
      food_review.establishment_id, food_review.item_id;`,
    [item_name]
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
