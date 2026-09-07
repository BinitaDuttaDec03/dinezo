import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.config.js";
import restaurantRoutes from "./routes/restaurant.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/restaurant", restaurantRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Restaurant service is running on port ${PORT}`);
    connectDB()
});
