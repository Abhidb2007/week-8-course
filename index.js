const express = require("express");
const { userRouter } = require("./routes/user")
const { CourseRouter } = require("./routes/course");
const app = express();

app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",CourseRouter);

 app.listen(4000);
