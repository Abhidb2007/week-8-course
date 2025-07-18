const { Router } = require("express");
const adminRouter = Router();

// Admin signup
adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "Admin signup endpoint",
  });
});

// Admin signin
adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "Admin signin endpoint",
  });
});

// Get all courses created by admin
adminRouter.get("/", function (req, res) {
  res.json({
    message: "List all courses created by admin",
  });
});

// Update a course (You should ideally use /:courseId)
adminRouter.put("/", function (req, res) {
  res.json({
    message: "Update a course endpoint",
  });
});

// Get bulk courses (e.g., for homepage or explore tab)
adminRouter.get("/bulk", function (req, res) {
  res.json({
    message: "Get multiple courses (bulk) endpoint",
  });
});

module.exports = {
  adminRouter,
};
