import express from "express";

import {
    addRestaurant,
} from "../controllers/restaurant.controller.js";
import { isAuth, isSeller } from "../middlewares/isAuth.middleware.js";

const router = express.Router();

router.post("/new", isAuth, isSeller, addRestaurant);

export default router;
