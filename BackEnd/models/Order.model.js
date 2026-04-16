import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },

        name: String,

        quantity: Number,

        price: Number
      }
    ],

    totalAmount: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "INR"
    },

    gateway: {
      type: String,
      enum: ["razorpay", "cashfree", "phonepe", "payu", "stripe"]
    },

    paymentId: String,

    orderIdGateway: String, // Razorpay order id

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);