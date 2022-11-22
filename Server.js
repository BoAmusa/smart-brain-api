const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const register = require("./Controllers/Register");
const signin = require("./Controllers/Signin");
const profile = require("./Controllers/Profile");
const image = require("./Controllers/Image");
const Parse = require("parse/node");
const cors = require("cors");
const TABLE_NAME = "smartbrain_db";

Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  process.env.B4APP_ID, // This is your Application ID
  process.env.B4JAVASCRIPT_ID, // This is your Javascript key
  process.env.B4MASTER_KEY // This is your Master key (never use it in the frontend)
);

const db = new Parse.Object(TABLE_NAME);
const query = new Parse.Query(TABLE_NAME);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/profile/:email", (req, res) => {
  profile.handleProfileGet(req, res, query);
});

app.put("/image", (req, res) => {
  image.handleImagePut(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, query, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt, TABLE_NAME);
});
