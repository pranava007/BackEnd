import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import paymentRoutes from "./src/routes/payment.routes.js";

dotenv.config();

// ✅ DB connect
connectDB();

const app = express();

app.use(express.json());

// routes
app.use("/api/payment", paymentRoutes);

// health check
app.get("/", (req, res) => {
  res.send("🚀 Payment Gateway Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});