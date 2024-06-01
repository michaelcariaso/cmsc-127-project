import { response } from "express";
import needle from "needle";

const newUser = {
  username: "another test",
  user_password: "12345",
  display_name: "im testing",
  age: 10,
};

needle.post("http://localhost:4000/add-user", newUser, (err, res) => {
  console.log("Response:", res.body);
});
