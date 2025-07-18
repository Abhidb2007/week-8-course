const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin"); // match export name

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Route groups
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter); // no error now

// Main async function to connect DB and start server
async function main() {
  try {
    await mongoose.connect("mongodb+srv://adb49278:8HUN6wKPMdNfRq2P@cluster0.d9wdxfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

    console.log("✅ Connected to MongoDB");

    app.listen(3000, () => {
      console.log("🚀 Server is listening on port 3000");
    });

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

main();
