import express from "express";

const app = express();

app.use((err, req, res, next) => {
  console.error(err.strack);
  res.status(500).send("Something broke");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
