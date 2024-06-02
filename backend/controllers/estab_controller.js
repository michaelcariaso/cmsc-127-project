import pool from "./mysql_pool.js";

export async function addFoodEstablishment(req, res) {
  try {
    const { establishment_name, establishment_address, establishment_cuisine } =
      req.body;
    const result = await pool.query(
      `INSERT INTO food_establishment(establishment_id,     establishment_name, establishment_address, establishment_cuisine) VALUES ((SELECT SUBSTRING( (CONCAT(?,"-",(COUNT(f.establishment_id)))), 10) FROM food_establishment f),?,?,?);`,
      [
        establishment_name,
        establishment_name,
        establishment_address,
        establishment_cuisine,
      ]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error adding food establishment:", error);
    throw error;
  }
}

export async function deleteFoodEstablishment(req, res) {
  const establishment_id = req.body.establishment_id;
  try {
    //delete food reviews
    const result1 = await pool.query(
      `DELETE FROM food_review WHERE establishment_id = ?;`,
      [establishment_id]
    );

    //delete food items
    const result2 = await pool.query(
      `DELETE FROM food_item WHERE establishment_id = ?;`,
      [establishment_id]
    );

    //delete food establishments
    const result3 = await pool.query(
      `DELETE FROM food_establishment WHERE establishment_id= ?;`,
      [establishment_id]
    );
    res.status(200).json(result3);
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete food establishment",
    });
    throw error;
  }
}

export async function searchFoodEstablishment(req, res) {
  const establishment_id = req.query.establishment_id;

  try {
    const [result] = await pool.query(
      `SELECT * FROM food_establishment WHERE establishment_id= ?;`,
      [establishment_id]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting food establishment:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch food reviews for the food item" });
    throw error;
  }
}

//estab_update string from string builder in
export async function updateFoodEstablishment(req, res) {
  const {
    establishment_name,
    establishment_address,
    establishment_cuisine,
    establishment_id,
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE food_establishment SET establishment_name = ?, establishment_address = ?, establishment_cuisine = ? WHERE establishment_id = ?;`,
      [
        establishment_name,
        establishment_address,
        establishment_cuisine,
        establishment_id,
      ]
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update food establishment" });
    console.error("Error updating food establishment:", error);
    throw error;
  }
}
