import express from "express";
import { verifyPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/verify-payment", verifyPayment);
router.get("/verify-payment", verifyPayment); // For redirects (e.g. PayU)

export default router;