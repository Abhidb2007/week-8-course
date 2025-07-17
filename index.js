const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course"); // match export name

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter); // no error now

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
