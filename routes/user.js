const { Router } = require("express");
const { userModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "abhi@123";
const bcrypt = require("bcrypt");
const { z } = require("zod");

const userRouter = Router();

// ✅ Zod schema for signup input validation
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
});

// ✅ Signup Route
userRouter.post("/signup", async function (req, res) {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues });
  }

  const { email, password, firstname, lastname } = parsed.data;

  try {
    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save to DB
    await userModel.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });

    res.json({ message: "Signup successfully" });
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
});

// ✅ Signin Route
userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  try {
    // ✅ Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    // ✅ Compare hashed passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    // ✅ Create JWT token
   const token = jwt.sign({
  id: user._id
}, JWT_USER_PASSWORD);


    res.json({ token });
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
});

// ✅ Dummy Purchases Route
userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Purchases endpoint",
  });
});

module.exports = {
  userRouter,
};
