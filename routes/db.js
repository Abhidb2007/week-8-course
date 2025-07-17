const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/week8");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
});

const userModel = mongoose.model("User", userSchema); // ✅ Correct

module.exports = { userModel };

