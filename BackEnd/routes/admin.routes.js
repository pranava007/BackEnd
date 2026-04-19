import express from "express";
import { getGatewayConfig, updateGatewayConfig, getExternalConfig, updateExternalConfig } from "../controllers/admin.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/config", protect, authorize("admin"), getGatewayConfig);
router.patch("/config", protect, authorize("admin"), updateGatewayConfig);
router.get("/external-config", protect, authorize("admin"), getExternalConfig);
router.patch("/external-config", protect, authorize("admin"), updateExternalConfig);

export default router;
