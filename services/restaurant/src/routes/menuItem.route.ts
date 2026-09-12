import express from "express";

import { isAuth, isSeller } from "../middlewares/isAuth.middleware.js";
import uploadFile from "../middlewares/multer.middleware.js";
import { addMenuItem, deleteMenuItem, getAllItems, toggleMenuItemAvailability } from "../controllers/menuItem.controller.js";

const router = express.Router();

router.post("/new", isAuth, isSeller, uploadFile, addMenuItem);
router.get("/all/:id", isAuth, getAllItems);
router.delete("/:itemId", isAuth, isSeller, deleteMenuItem);
router.put("/status/:itemId", isAuth, isSeller, toggleMenuItemAvailability);

export default router;
