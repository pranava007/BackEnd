import express from "express";
import { createOrder, getProducts, getOrders, getGatewayConfig, updateGatewayConfig, verifyPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/products", getProducts);
router.get("/orders", getOrders);
router.get("/config", getGatewayConfig);
router.patch("/config", updateGatewayConfig);
router.post("/verify-payment", verifyPayment);

export default router;