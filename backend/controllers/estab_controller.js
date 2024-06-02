import pool from "./mysql_pool.js";

export async function addFoodEstablishment(req, res) {
  try {
    const { establishment_name, establishment_address, establishment_cuisine } =
      req.body;
    const result = await pool.query(
      `INSERT INTO food_establishment(establishment_id, establishment_name, establishment_address, establishment_cuisine)
      VALUES ((SELECT CONCAT(?,"-",COUNT(f.establishment_id)) FROM food_establishment f),?,?,?);`,
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

export async function deleteFoodEstablishment(req, res, establishment_id) {
  try {
    const result = await pool.query(
      `DELETE FROM food_establishment WHERE establishment_id= ?;`,
      [establishment_id]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting food establishment:", error);
    throw error;
  }
}


export default async function searchFoodEstablishment(req, res) {
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
export async function updateFoodEstablishment(req, res, estab_update) {
  try {
    const result = await pool.query(
      `UPDATE food_establishment SET ${estab_update};`
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating food establishment:", error);
    throw error;
  }
}
