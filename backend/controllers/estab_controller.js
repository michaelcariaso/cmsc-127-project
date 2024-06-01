import pool from "mysql_pool";

async function addFoodEstablishment() {
    const result = await pool.query(
      `INSERT INTO food_establishment(establishment_id, establishment_name, establishment_address,
        establishment_cuisine, establishment_cost)
        VALUES("1234567890", "McDonald's", "Lopez Avenue", "American Fast Food", "$$$");`
    );
  
    return result;
  }