const { Router } = require("express");
const { userModel } = require("./db");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const userRouter = Router();

// Zod schema for signup input validation
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
});

userRouter.post("/signup", async function (req, res) {
  // ✅ Validate input using Zod
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

    res.json({
      message: "Signup successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  const{email, password} = req.body;
  // TODO: ideally password should be hashed, and hence you compare the user provided password and the database password
  const user = await userModel.findOne({
    password: password,
    email: email
  })
  if(user){
    const token: Jwt.sign({
      id: user._id
    },JWT_USER_PASSWORD);
    res.json({
      token: token
    })
  }else{
    res.status(403).json{
      message: "Incorrect crediantials"
    }
  }

  
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Purchases endpoint",
  });
});

module.exports = {
  userRouter,
};
