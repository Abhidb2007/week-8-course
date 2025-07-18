const { Router } = require("express");
const courseRouter = Router();

// 📦 Purchase a course
courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "Course purchased successfully",
  });
});

// 👀 Preview a course
courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "Course preview data",
  });
});

module.exports = {
  courseRouter,
};
