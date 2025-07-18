const mongoose = require("mongoose");

// ✅ Log connection
console.log("connected to MongoDB");

// ✅ Proper MongoDB connection string (make sure DB name is included!)
mongoose.connect("mongodb+srv://adb49278:rl12fP92ud2KMkNU@cluster0.d9wdxfi.mongodb.net/week8-course");

// Shortcuts
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// ✅ User Schema
const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
});

// ✅ Admin Schema (you can reuse userSchema or make new one)
const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
});

// ✅ Course Schema
const courseSchema = new Schema({
  title: String,
  description: String,
  imageurl: String,
  creatorId: ObjectId,  // Admin or user who created it
  price: Number
});

// ✅ Purchase Schema
const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
  purchasedAt: { type: Date, default: Date.now }
});

// ✅ Create models correctly using mongoose.model()
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

// ✅ Correct export
module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel
};
