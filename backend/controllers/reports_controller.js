import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

export async function viewAllEstablishments(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT food_establishment.establishment_name AS "Establishment Name",
              food_establishment.establishment_address AS "Address",
              food_establishment.establishment_cuisine AS "Cuisine",
              food_establishment.establishment_cost AS "Price Range",
              AVG(food_review.rating) AS "Average Rating"
         FROM food_establishment 
         JOIN food_review ON food_establishment.establishment_id = food_review.establishment_id
         GROUP BY food_establishment.establishment_id
         ORDER BY "Average Rating" DESC;`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch establishments' });
  }
}


