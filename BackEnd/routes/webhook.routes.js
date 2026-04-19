import express from "express";
import { handleShopifyWebhook } from "../controllers/webhook.controller.js";
// import { verifyWebhook } from "../middlewares/webhookVerify.middleware.js";

const router = express.Router();

// router.post("/shopify", verifyWebhook, handleShopifyWebhook);
router.post("/shopify", handleShopifyWebhook);

export default router;
