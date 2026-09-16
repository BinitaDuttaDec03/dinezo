import express from "express";

import {
    addRestaurant,
    fetchMyRestaurant,
    fetchSingleRestaurant,
    getNearbyRestaurant,
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
router.get("/all", isAuth, getNearbyRestaurant);
router.get("/:id", isAuth, fetchSingleRestaurant);

export default router;
