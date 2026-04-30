import "dotenv/config";
import express from "express";
import connectDB from "./config/db.config.js";
import authRoutes from './routes/auth.route.js';
const app = express();
const port = process.env.PORT || 5100;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.listen(port, () => {
    console.log(`Auth service is running on port ${port}`);
    connectDB();
});
