import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    gateway: {
      type: String,
      enum: ["razorpay", "cashfree", "phonepe", "payu", "stripe"]
    },

    paymentId: String, // gateway payment id

    amount: Number,

    currency: {
      type: String,
      default: "INR"
    },

    status: {
      type: String,
      enum: ["created", "success", "failed", "pending", "refunded"],
      default: "created"
    },

    method: String, // UPI / CARD / NETBANKING

    gatewayResponse: Object // full response store
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);