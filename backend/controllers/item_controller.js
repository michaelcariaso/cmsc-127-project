import pool from "./mysql_pool.js";

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

export default async function searchFoodType(req, res) {
    const food_type = req.query.food_type;
    const establishment_id = req.query.establishment_id;
    try {
        if(food_type == "meat" || food_type == "veg"){
            const [result] = await pool.query(
                `SELECT * FROM food_item WHERE food_type= ? AND establishment_id = ?;`,
                [food_type, establishment_id]
            );
            res.status(200).json(result)
        } else {
            const [result] = await pool.query(
                `SELECT * FROM food_item WHERE establishment_id = ? AND food_type NOT IN ("meat", "veg");`,
                [establishment_id]
            );
            res.status(200).json(result)
        }
        } catch (error) {
      console.error("Error finding food item:", error);
      res
      .status(500)
      .json({ error: "Failed to fetch food with food type" });
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
