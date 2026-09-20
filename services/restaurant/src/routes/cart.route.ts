import express from "express";

import { isAuth } from "../middlewares/isAuth.middleware.js";
import { addToCart, fetchMyCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", isAuth, addToCart);
router.get("/all", isAuth, fetchMyCart);

export default router;
