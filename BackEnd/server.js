import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import paymentRoutes from "./routes/payment.routes.js";

// ✅ DB connect
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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