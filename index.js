const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "secret";

// Mongoose Models
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});
const User = mongoose.model("User", userSchema);

const adminSchema = new mongoose.Schema({ username: String, password: String });
const Admin = mongoose.model("Admin", adminSchema);

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  published: Boolean
});
const Course = mongoose.model("Course", courseSchema);

// Middleware
function auth(role) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, SECRET, (err, user) => {
      if (err || user.role !== role) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };
}

// Admin Routes
app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  if (await Admin.findOne({ username })) return res.send("Admin exists");
  await Admin.create({ username, password });
  const token = jwt.sign({ username, role: "admin" }, SECRET);
  res.json({ token });
});

app.post("/admin/login", async (req, res) => {
  const admin = await Admin.findOne(req.body);
  if (!admin) return res.sendStatus(403);
  const token = jwt.sign({ username: admin.username, role: "admin" }, SECRET);
  res.json({ token });
});

app.post("/admin/courses", auth("admin"), async (req, res) => {
  const course = await Course.create(req.body);
  res.json({ courseId: course._id });
});

app.get("/admin/courses", auth("admin"), async (req, res) => {
  res.json({ courses: await Course.find({}) });
});

// User Routes
app.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;
  if (await User.findOne({ username })) return res.send("User exists");
  await User.create({ username, password });
  const token = jwt.sign({ username, role: "user" }, SECRET);
  res.json({ token });
});

app.post("/user/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.sendStatus(403);
  const token = jwt.sign({ username: user.username, role: "user" }, SECRET);
  res.json({ token });
});

app.get("/user/courses", auth("user"), async (req, res) => {
  res.json({ courses: await Course.find({ published: true }) });
});

app.post("/user/courses/:id", auth("user"), async (req, res) => {
  const course = await Course.findById(req.params.id);
  const user = await User.findOne({ username: req.user.username });
  user.purchasedCourses.push(course._id);
  await user.save();
  res.send("Purchased");
});

app.get("/user/purchased", auth("user"), async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate("purchasedCourses");
  res.json({ purchasedCourses: user.purchasedCourses });
});

// Start Server
mongoose.connect("mongodb://127.0.0.1:27017/course-app").then(() => {
  app.listen(3000, () => console.log("Server running at http://localhost:3000"));
});
