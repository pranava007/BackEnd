import express from "express";
import { register, login, getMe, shopifyAuth, shopifyCallback } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

// --- Shopify OAuth ---
router.get("/shopify", shopifyAuth);
router.get("/shopify/callback", shopifyCallback);

export default router;
