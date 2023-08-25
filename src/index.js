const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();

const container = require("../container");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const userRoutes = require("./routes/userRoutes");

const connection = require("./database/connection");
app.set("trust proxy", true);
app.use(express.json());

app.use((req, res, next) => {
  const clientIP =
    req.header("x-forwarded-for") || req.connection.remoteAddress;
  console.log(`Client IP: ${clientIP}`);
  next();
});

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/user", userRoutes);

app.get("/client-ip", (req, res) => {
  const clientIP =
    req.header("x-forwarded-for") || req.connection.remoteAddress;
  res.send(`Client IP: ${clientIP}`);
});

app.get("/", (req, res) => {
  res.send("Hello, Nodemon!");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await connection;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
});
