const { Router } = require("express");
const { userModel } = require("./db");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstname, lastname} = req.body;
  await userModel.create({
    email: email,
    password: password,
    firtname: firstname,
    lastname: lastname
  })
  res.json({
    message: "Signup succefully",
  });
});

userRouter.post("/signin", function (req, res) {
  res.json({
    message: "Signup endpoint",
  });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Purchases endpoint",
  });
});

module.exports = {
  userRouter,
};
