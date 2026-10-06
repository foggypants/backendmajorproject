const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("Course Feedback API is running");
});

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port " + port));
