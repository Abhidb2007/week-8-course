const express = require("express");
const mongoose =  require("mongoose");
const cors = require("cors");
const jwt = ("jsonwebtoken");
const app = express();
app.use = (express.json());
app.use(cors());
const SECRET = "secret";
//middleware Models
const userSchema = new mongoose.Schema({
  username: String,

})

