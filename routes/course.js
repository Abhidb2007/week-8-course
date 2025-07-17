const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "Purchase endpoint",
  });
});

courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "Preview endpoint",
  });
});

module.exports = {
  courseRouter, // 👈 use this if you're importing with lowercase in index.js
};
