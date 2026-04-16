import mongoose from "mongoose";

const externalServerSchema = new mongoose.Schema(
  {
    baseUrl: {
      type: String,
      required: true,
      default: "http://localhost:8000"
    },
    apiKey: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("ExternalServer", externalServerSchema);
