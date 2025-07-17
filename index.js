const express = require("express");
const { userRouter } = require("./routes/user");
const { CourseRouter } = require("./routes/course");

const app = express();

app.use(express.json()); // optional, needed if you want to parse JSON body

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", CourseRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
