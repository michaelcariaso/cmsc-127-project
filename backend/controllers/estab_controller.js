import pool from "./mysql_pool.js";

async function addFoodEstablishment(req, res, newEstab) {
  try {
    const {
      establishment_id,
      establishment_name,
      establishment_address,
      establishment_cuisine,
      establishment_cost,
    } = newEstab;
    const result = await pool.query(
      `INSERT INTO food_establishment(establishment_id, establishment_name, establishment_address, establishment_cuisine, establishment_cost)
      VALUES (?, ?, ?, ?, ?);`,
      [
        establishment_id,
        establishment_name,
        establishment_address,
        establishment_cuisine,
        establishment_cost,
      ]
    );
    return result;
  } catch (error) {
    console.error("Error adding food establishment:", error);
    throw error;
  }
}

async function deleteFoodEstablishment(req, res, establishment_id) {
  try {
    const result = await pool.query(
      `DELETE FROM food_establishment WHERE establishment_id= ?;`,
      [establishment_id]
    );
    return result;
  } catch (error) {
    console.error("Error deleting food establishment:", error);
    throw error;
  }
}

async function searchFoodEstablishment(req, res, establishment_name) {
  try {
    const result = await pool.query(
      `SELECT * FROM food_establishment WHERE establishment_name= ?;`,
      [establishment_name]
    );
    return result;
  } catch (error) {
    console.error("Error deleting food establishment:", error);
    throw error;
  }
}

//estab_update string from string builder in
async function updateFoodEstablishment(req, res, estab_update) {
  try {
    const result = await pool.query(
      `UPDATE food_establishment SET ${estab_update};`
    );
    return result;
  } catch (error) {
    console.error("Error updating food establishment:", error);
    throw error;
  }
}
