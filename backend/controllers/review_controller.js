import pool from "./mysql_pool.js";

//add food review
export async function addReview(req, res) {
  const { review, rating, username, establishment_id, item_id } = req.body;

  try {
    const [rows] = await pool.query(
      `INSERT INTO food_review (entry_id, review, rating, review_date, review_time, username, establishment_id, item_id) VALUES (UUID(), ?, ?, CURDATE(), CURTIME(), ?, ?, ?);`,
      [review, rating, username, establishment_id, item_id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to insert food review to the database" });
  }
}

//update food review
export async function updateReview(req, res) {
  const { review, rating, entry_id } = req.body;

  try {
    const [rows] = await pool.query(
      `UPDATE food_review SET review = ?, rating = ?, review_date=CURDATE(), review_time=CURTIME() WHERE entry_id = ?;`,
      [review, rating, entry_id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to update food review from the database" });
  }
}

//delete food review
export async function deleteReview(req, res) {
  const { entry_id } = req.body;

  try {
    const [rows] = await pool.query(
      `DELETE FROM food_review WHERE entry_id = ?;`,
      [entry_id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to delete food review from the database" });
  }
}
