import mongoose from "mongoose";

const gatewayConfigSchema = new mongoose.Schema(
  {
    activeGateway: {
      type: String,
      enum: ["razorpay", "cashfree", "phonepe", "payu", "stripe"],
      default: "razorpay"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("GatewayConfig", gatewayConfigSchema);