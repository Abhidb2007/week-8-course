const express = require("express");
const { userRouter } = require("./routes/user.js")
const { CourseRouter } = require("./routes/course.js");
const app = express();

app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",CourseRouter);

 app.listen(3000);
