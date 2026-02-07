import cloudinary from "../config/cloudinary.js";
import GalleryImage from "../models/GalleryImage.js";

export const getGalleryImages = async (req, res) => {
  const images = await GalleryImage.find().sort({ createdAt: -1 });
  res.json(images);
};

export const createGalleryImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  const upload = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "cafe/gallery" }, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
    stream.end(req.file.buffer);
  });

  const image = await GalleryImage.create({
    title: req.body.title,
    imageUrl: upload.secure_url,
    imagePublicId: upload.public_id
  });

  res.status(201).json(image);
};

export const deleteGalleryImage = async (req, res) => {
  const image = await GalleryImage.findById(req.params.id);
  if (!image) {
    return res.status(404).json({ message: "Image not found" });
  }

  await cloudinary.uploader.destroy(image.imagePublicId);
  await image.deleteOne();
  res.json({ message: "Image deleted" });
};
