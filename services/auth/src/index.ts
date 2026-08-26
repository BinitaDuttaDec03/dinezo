import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.route.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
    connectDB()
});
