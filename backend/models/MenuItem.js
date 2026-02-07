import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Drinks", "Snacks"],
      required: true
    },
    available: { type: Boolean, default: true },
    imageUrl: { type: String },
    imagePublicId: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
