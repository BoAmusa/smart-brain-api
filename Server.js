const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");
const register = require("./Controllers/Register");
const signin = require("./Controllers/Signin");
const profile = require("./Controllers/Profile");
const image = require("./Controllers/Image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Connected!!");
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImagePut(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
