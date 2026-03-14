import express from "express";

import { addUserRole, loginUser } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/protectRoute.middleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.put("/add/role", isAuthenticated, addUserRole);

export default router;
