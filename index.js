const express = require("express");
const mongoose =  require("mongoose");
const cors = require("cors");
const { purchaseModel } = require("./routes/db");
const jwt = ("jsonwebtoken");
const app = express();
app.use = (express.json());
app.use(cors());
const SECRET = "secret";
//middleware Models
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourse: ({type:monggose.Schema.Type.ObjectId,ref: "course"})


});
const User = mongoose.model("user",userSchema);
 const adminSchema = new mongoose.Schema({
  username: String,
  password: password,

 });
const admin = mongoose.model("admin",adminSchema);
const courseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
});
const Course = mongoose.model("course",courseSchema);
//middleware
function auth(role){
  return(req, res, next){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token)return res.sendStatus(401);
    jwt.verify(token,SECRET,(err, user){
      if(err||user.role!==role) return res.sendStatus(403);
      req.user = user;next();

    });
  };

}

// Admin Routes
app.post("/signup",async(req, res){
  const{ username, password} = req.body;
  if(await admin.findOne({username})) return res.send("Admin exists");
  await admin.create({username,password});
  const token = jwt.sign({username,role: "admin"}, SECRET);
  res.json(token);
})

app.post("admin/login", async(req, res){
  const admin = await admin.findOne(req.body);
  if(!admin)return res.sendStatus(403){
    const token = jwt.sign({username:admin.username,role:"admin"},SECRET);
    res.json({token});
  }
});


app.post("signin" ,async(req, res){
  const course = await course.create(req.body);
  res.json({courseId: course._id});

});

