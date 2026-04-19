import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/webhooks", webhookRoutes);

// ✅ Routes under /api/payment for backward compatibility
app.use("/api/payment", orderRoutes);   // handles /create-order, /products, /orders
app.use("/api/payment", adminRoutes);   // handles /config, /external-config
app.use("/api/payment", paymentRoutes); // handles /verify-payment

// Health check
app.get("/", (req, res) => {
    res.send("🚀 VirtuaPay Backend Running");
});

export default app;
