import pool from "./mysql_pool.js";

//add user
export async function addUser(req, res) {
  const { username, user_password, display_name, age } = req.body;

  try {
    const [rows] = await pool.query(
      `INSERT INTO user (username, user_password, display_name, age) VALUES (?, ?, ?, ?);
        `,
      [username, user_password, display_name, age]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to insert user to the database" });
  }
}

//search user
export async function searchUser(req, res) {
  const username = req.query.username;
  const user_password = req.query.password;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM user WHERE username = ? AND user_password = ?;
          `,
      [username, user_password]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user from the database" });
  }
}
