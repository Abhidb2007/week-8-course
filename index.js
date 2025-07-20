const express = require("express");
const mongoose =  require("mongoose");
const cors = require("cors");
const { purchaseModel } = require("./routes/db");
const jwt = ("jsonwebtoken");
const app = express();
app.use = (express.json());
app.use(cors());
const SECRET = "secret";
//middleware Models
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourse: ({type:monggose.Schema.Type.ObjectId,ref: "course"})


});
const User = mongoose.model("user",userSchema);
 const adminSchema = new mongoose.Schema({
  username: String,
  password: password,

 });
const admin = mongoose.model("admin",adminSchema);
const courseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
});
const Course = mongoose.model("course",courseSchema);
//middleware


