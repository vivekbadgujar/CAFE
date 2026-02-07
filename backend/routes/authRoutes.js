import express from "express";
import { getProfile, loginAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/me", protect, getProfile);

export default router;
