const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("./db");


// Admin signup
adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstname, lastname } = req.body;
  await userModel.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
      });
  
      res.json({
        message: "Signup successfully",
    });
})

// Admin signin
adminRouter.post("/signin", function (req, res) {
    const{email, password} = req.body;
    // TODO: ideally password should be hashed, and hence you compare the user provided password and the database password
    const admin = await userModel.findOne({
      password: password,
      email: email
    })
    if(user){
      const token: Jwt.sign({
        id: admin._id
      },JWT_ADMIN_PASSWORD);
      res.json({
        token: token
      })
    }else{
      res.status(403).json{
        message: "Incorrect crediantials"
      }
    }
})

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
