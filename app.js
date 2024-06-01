import express from "express";
import { addUser } from "./controllers/user.js";
import {} from "./controllers/food_item.js";
import {} from "./controllers/food_review.js";
import {} from "./controllers/food_establishment.js";

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.strack);
  res.status(500).send("Something broke");
});

//add user
app.post("/add-user", async (req, res) => {
  const { username, user_password, display_name, age } = req.body;
  const addUser = await addUser(username, user_password, display_name, age);
  res.status(200).send(addUser);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
