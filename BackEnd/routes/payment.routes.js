import express from "express";
import { createOrder, getProducts, getOrders, getGatewayConfig, updateGatewayConfig, verifyPayment, getExternalConfig, updateExternalConfig } from "../controllers/payment.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-order", createOrder); // Public for demo, maybe protect later
router.get("/products", getProducts); // Public
router.get("/orders", protect, getOrders);
router.get("/config", protect, authorize("admin"), getGatewayConfig);
router.patch("/config", protect, authorize("admin"), updateGatewayConfig);
router.get("/external-config", protect, authorize("admin"), getExternalConfig);
router.patch("/external-config", protect, authorize("admin"), updateExternalConfig);
router.post("/verify-payment", verifyPayment); // Public (webhook/verification)

export default router;