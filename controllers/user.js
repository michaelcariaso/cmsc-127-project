import { pool } from "../database.js";

export async function addUser(username, user_password, display_name, age) {
  const [result] = await pool.query(
    `INSERT INTO user (username, user_password, display_name, age) VALUES (?, ?, ?, ?)
    `,
    [username, user_password, display_name, age]
  );

  return result;
}
