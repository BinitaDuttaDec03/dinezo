import express from "express";

import {
    addRestaurant,
    fetchMyRestaurant,
    updateRestaurant,
    updateStatusRestaurant,
} from "../controllers/restaurant.controller.js";
import { isAuth, isSeller } from "../middlewares/isAuth.middleware.js";
import uploadFile from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/new", isAuth, isSeller, uploadFile, addRestaurant);
router.get("/my", isAuth, isSeller, fetchMyRestaurant);
router.put("/status", isAuth, isSeller, updateStatusRestaurant);
router.put("/edit", isAuth, isSeller, updateRestaurant);

export default router;
