const { Router } = require("express");
const { userModel } = require("./db");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstname, lastname} = req.body;
  //TODO: adding zod validation
  //TODO: hash the password so plaintext pw is not stored in the DB
  //TODO: put inside a try catch block
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
