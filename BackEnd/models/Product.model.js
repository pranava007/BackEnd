import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: String,

    price: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "INR"
    },

    stock: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    },
    
    imageUrl: String
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);