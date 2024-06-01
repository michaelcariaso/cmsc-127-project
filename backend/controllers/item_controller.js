import pool from "mysql_pool";

async function addFoodItem(req, res, newItem, estab_id) {
    try {
        const {item_id, item_name, item_address, item_price, food_type} = newItem;
        const result = await pool.query(
            
            `INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id) VALUES
            (?, ?, ?, ?, ${estab_id});`, []
        );
        return result;
    } catch (error) {
        console.error("Error adding food item: ", error);
        throw error;
    }
}

async function deleteFoodEstablishment(req, res, item_id) {
    try {
        const result = await pool.query(
            `DELETE FROM food_item WHERE item_id = ?;`,
            [item_id]
          );
      return result;
    } catch (error) {
      console.error("Error deleting food item:", error);
      throw error;
    }
}

async function searchFoodItem(req, res, item_name) {
    try {
        const result = await pool.query(
            `SELECT * FROM food_item WHERE item_name= ?;`,
        [item_name]
      );
      return result;
    } catch (error) {
      console.error("Error finding food item:", error);
      throw error;
    }
}

//item_update string from string builder in 
async function updateFoodEstablishment(req, res, item_update) {
    try {
        const result = await pool.query(
            `UPDATE food_establishment SET ${item_update};`
        );
    return result;
    } catch (error) {
        console.error("Error updating food item:", error);
        throw error;
    }
}
