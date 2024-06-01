import { pool } from "../database.js";
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
