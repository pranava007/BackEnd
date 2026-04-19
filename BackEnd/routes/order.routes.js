import express from "express";
import { createOrder, getProducts, getOrders } from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/products", getProducts);
router.get("/orders", protect, getOrders);

export default router;
