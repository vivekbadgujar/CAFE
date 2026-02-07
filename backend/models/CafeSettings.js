import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    tiktok: { type: String }
  },
  { _id: false }
);

const cafeSettingsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Good Grounds" },
    description: { type: String },
    address: { type: String },
    openingHours: { type: String },
    socials: socialSchema
  },
  { timestamps: true }
);

export default mongoose.model("CafeSettings", cafeSettingsSchema);
