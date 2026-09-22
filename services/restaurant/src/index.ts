import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.config.js";
import restaurantRoutes from "./routes/restaurant.route.js";
import itemRoutes from "./routes/menuItem.route.js";
import cartRoutes from "./routes/cart.route.js";
import addressRoutes from "./routes/address.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Restaurant service is running on port ${PORT}`);
    connectDB()
});
