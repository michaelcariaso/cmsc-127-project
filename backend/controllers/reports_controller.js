import pool from "./mysql_pool.js";

// view all establishments
export async function viewAllEstablishments(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT food_establishment.establishment_id,
              food_establishment.establishment_name AS "Establishment Name",
              food_establishment.establishment_address AS "Address",
              food_establishment.establishment_cuisine AS "Cuisine",
              COALESCE(AVG(food_review.rating), 0) AS "Average Rating"
         FROM food_establishment 
         LEFT JOIN food_review ON food_establishment.establishment_id = food_review.establishment_id
         GROUP BY food_establishment.establishment_id
         ORDER BY "Average Rating" DESC;`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch establishments" });
  }
}

// view all reviews for an establishment
export async function viewAllReviewsEstablishment(req, res) {
  const establishment_id = req.query.establishment_id;
  try {
    const [rows] = await pool.query(
      `SELECT food_establishment.establishment_id, food_review.entry_id, food_establishment.establishment_name AS
      "Establishment Name", review AS "Review", rating AS "Rating", user.display_name AS "Display Name",
      review_date AS "Date", review_time AS "Time"
        FROM food_review JOIN food_establishment ON food_review.establishment_id=food_establishment.establishment_id
        JOIN user ON user.username=food_review.username WHERE food_establishment.establishment_id= ? AND food_review.item_id IS NULL ORDER BY food_review.entry_id,
        food_review.username, food_review.establishment_id`,
      [establishment_id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch food reviews for the establishment" });
  }
}

// view all food reviews for a food item
export async function viewAllFoodReviewsFoodItem(req, res) {
  const item_id = req.query.item_id;
  try {
    const [rows] = await pool.query(
      `SELECT food_item.item_name AS "Food Name", food_review.entry_id, food_establishment.establishment_name AS
      "Establishment Name", review AS "Review", rating AS "Rating", user.display_name AS "Display
      Name", review_date AS "Date", review_time AS "Time"
      FROM food_review JOIN food_item ON food_review.item_id=food_item.item_id
      JOIN food_establishment ON
      food_review.establishment_id=food_establishment.establishment_id
      JOIN user ON user.username=food_review.username WHERE food_item.item_id= ?
      ORDER BY food_review.entry_id,
      food_review.username, food_review.establishment_id, food_review.item_id; `,
      [item_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch food reviews for the food item" });
  }
}

// view all food items from an establishment
export async function viewAllFoodItems(req, res) {
  const establishment_id = req.query.establishment_id;
  // const order = req.query.order;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM food_item JOIN food_establishment
        ON food_item.establishment_id=food_establishment.establishment_id
        WHERE food_establishment.establishment_id= ?
        ORDER BY food_item.item_price;`,
      [establishment_id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch food items from the establishment" });
  }
}

// view all food items from an establishment that belong to a food type {meat | veg | etc}
export async function viewAllFoodItemsWithType(req, res) {
  const type = req.query.type;
  const establishment_id = req.query.establishment_id;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM food_item JOIN food_establishment
      ON food_item.establishment_id=food_establishment.establishment_id
      WHERE food_item.food_type="${type}" AND food_establishment.establishment_id= ?
      ORDER BY food_item.item_price DESC;`,
      [establishment_id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch food items with the given type" });
  }
}

// view all reviews made within a month for an establishment;
export async function viewAllMonthlyReviewsEstablishment(req, res) {
  const month = req.query.month;
  const year = req.query.year;
  const establishment_id = req.query.establishment_id;
  try {
    const [rows] = await pool.query(
      `SELECT food_item.item_name AS "Food Name", food_establishment.establishment_name AS
      "Establishment Name", review AS "Review", rating AS "Rating", user.display_name AS "Display
      Name", review_date AS "Date", review_time AS "Time"
      FROM food_review JOIN food_item ON food_review.item_id=food_item.item_id
      JOIN food_establishment ON
      food_review.establishment_id=food_establishment.establishment_id
      JOIN user ON user.username=food_review.username WHERE (${month} =
      MONTH(food_review.review_date)) AND (${year} =
        YEAR(food_review.review_date)) AND establishment.establishment_id = ? GROUP BY food_review.entry_id, food_review.username,
      food_review.establishment_id, food_review.item_id;`,
      [establishment_id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Failed to fetch reviews within the given month for the establishment",
    });
  }
}

// view all reviews made within a month for a food item;
export async function viewAllMonthlyReviewsFoodItem(req, res) {
  const month = req.query.month;
  const year = req.query.year;
  const item_id = req.query.item_id;
  try {
    const [rows] = await pool.query(
      `SELECT food_item.item_name AS "Food Name", food_establishment.establishment_name AS
      "Establishment Name", review AS "Review", rating AS "Rating", user.display_name AS "Display
      Name", review_date AS "Date", review_time AS "Time"
      FROM food_review JOIN food_item ON food_review.item_id=food_item.item_id
      JOIN food_establishment ON
      food_review.establishment_id=food_establishment.establishment_id
      JOIN user ON user.username=food_review.username WHERE (${month} =
      MONTH(food_review.review_date)) AND (${year} =
        YEAR(food_review.review_date)) AND food_item.item_id = ? GROUP BY food_review.entry_id, food_review.username,
      food_review.establishment_id, food_review.item_id;`,
      [item_id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch reviews within the given month for the food",
    });
  }
}

// view all establishments with a high average rating (rating >= 4). (rating from 1-5; highest is 5);
export async function viewAllHighAverageRatingEstablishments(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT e.establishment_id, e.establishment_name AS "Establishment Name", e.establishment_address AS "Address", e.establishment_cuisine AS "Cuisine", AVG(r.rating) AS "Average Rating" FROM food_review r JOIN food_establishment e ON r.establishment_id = e.establishment_id JOIN food_item f ON r.item_id = f.item_id GROUP BY f.establishment_id, e.establishment_name, e.establishment_address HAVING AVG(r.rating) >= 4;`
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch establishments with a high average rating ",
    });
  }
}

// view all food items from an establishment arranged according to price
export async function viewAllFoodItemsOrderByPrice(req, res) {
  const order = req.query.order;

  if (!order) {
    order = "ASC";
  }

  try {
    const [rows] = await pool.query(
      `SELECT item_name, item_price FROM food_item
      WHERE establishment_id = 'INSERT ID HERE'
      ORDER BY ${order};`
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch food items from the establishment",
    });
  }
}

// search food items from any establishment based on a given price range and/or food type.
export async function searchFoodItem(req, res) {
  const min_price = req.query.min_price;
  const max_price = req.query.max_price;
  const food_type = req.query.food_type;

  try {
    const [rows] = await pool.query(
      `SELECT f.item_id, f.item_name, f.item_price, f.food_type, e.establishment_name FROM
      food_item f JOIN food_establishment e ON f.establishment_id = e.establishment_id
      WHERE (${min_price} IS NULL OR f.item_price >= ${min_price})
      OR (${max_price} IS NULL OR f.item_price <= ${max_price})
      OR (${food_type} IS NULL OR f.food_type = ${food_type});`
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Failed to fetch food items from all of the establishments with the given price range and/or food type",
    });
  }
}
