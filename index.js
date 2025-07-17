const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin"); // match export name

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter); // no error now


async function main() {
   await mongoose.connect("mongodb+srv://adb49278:rl12fP92ud2KMkNU@cluster0.d9wdxfi.mongodb.net/") 
   app.listen(3000);
   console.log("listening on port 3000")
}   
