import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
    title: { type: String },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("GalleryImage", galleryImageSchema);
