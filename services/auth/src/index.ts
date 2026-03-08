import "dotenv/config";
import express from "express";
import connectDB from "./config/db.config.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
  connectDB();
});
