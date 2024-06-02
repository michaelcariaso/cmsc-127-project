import pool from "./mysql_pool.js";

export async function addFoodItem(req, res) {
  try {
    const { item_name, item_price, food_type, establishment_id } = req.body;
    const result = await pool.query(
      `INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id) VALUES
            ((SELECT CONCAT(?, (SELECT (COUNT(i.item_id)+1))) FROM food_item i), ?, ?, ?, ?);`,
      [establishment_id, item_name, item_price, food_type, establishment_id]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error adding food item: ", error);
    res.status(500).json({
      error: "Failed to add food item",
    });
    throw error;
  }
}

export async function deleteFoodItem(req, res) {
  const { item_id } = req.body;

  try {
    const result1 = await pool.query(
      `DELETE FROM food_review WHERE item_id = ?;`,
      [item_id]
    );
    const result2 = await pool.query(
      `DELETE FROM food_item WHERE item_id = ?;`,
      [item_id]
    );
    res.status(200).json(result2);
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({
      error: "Failed to delete food item",
    });
    throw error;
  }
}

export async function searchFoodItem(req, res) {
  const { item_name } = req.body.item_name;
  try {
    const result = await pool.query(
      `SELECT * FROM food_item WHERE item_name= ?;`,
      [item_name]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding food item:", error);
    res.status(500).json({
      error: "Failed to find food item",
    });
    throw error;
  }
}

export async function searchFoodType(req, res) {
  const food_type = req.query.food_type;
  const establishment_id = req.query.establishment_id;
  try {
    if (food_type == "meat" || food_type == "veg") {
      const [result] = await pool.query(
        `SELECT * FROM food_item WHERE food_type= ? AND establishment_id = ?;`,
        [food_type, establishment_id]
      );
      res.status(200).json(result);
    } else {
      const [result] = await pool.query(
        `SELECT * FROM food_item WHERE establishment_id = ? AND food_type NOT IN ("meat", "veg");`,
        [establishment_id]
      );
      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Error finding food item:", error);
    res.status(500).json({ error: "Failed to fetch food with food type" });
    throw error;
  }
}

//item_update string from string builder in
export async function updateFoodItem(req, res) {
  const { item_update } = req.body;
  try {
    const result = await pool.query(
      `UPDATE food_establishment SET ${item_update};`
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(500).json({ error: "Failed to update food item" });
    throw error;
  }
}
