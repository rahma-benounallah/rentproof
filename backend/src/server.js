const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const groupRoutes = require("./routes/groupRoutes");
const rentalRequestRoutes = require("./routes/rentalRequestRoutes");
const agreementRoutes = require("./routes/agreementRoutes");
require("dotenv").config();

const db = require("./database/connection");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/rental-requests", rentalRequestRoutes);
app.use("/api/agreements", agreementRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "RentProof backend is running!",
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");

    res.json({
      message: "Database connected successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
