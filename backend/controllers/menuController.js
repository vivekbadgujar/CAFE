import cloudinary from "../config/cloudinary.js";
import MenuItem from "../models/MenuItem.js";

const parseBoolean = (value, fallback = true) => {
  if (typeof value === "boolean") {
    return value;
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return fallback;
};

export const getMenuItems = async (req, res) => {
  const items = await MenuItem.find().sort({ createdAt: -1 });
  res.json(items);
};

export const getMenuItem = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Menu item not found" });
  }
  return res.json(item);
};

export const createMenuItem = async (req, res) => {
  const { name, description, price, category, available } = req.body;

  let imageUrl;
  let imagePublicId;

  if (req.file) {
    const upload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "cafe/menu" }, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
      stream.end(req.file.buffer);
    });
    imageUrl = upload.secure_url;
    imagePublicId = upload.public_id;
  }

  const item = await MenuItem.create({
    name,
    description,
    price,
    category,
    available: parseBoolean(available, true),
    imageUrl,
    imagePublicId
  });

  res.status(201).json(item);
};

export const updateMenuItem = async (req, res) => {
  const { name, description, price, category, available } = req.body;
  const item = await MenuItem.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  if (req.file) {
    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId);
    }

    const upload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "cafe/menu" }, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
      stream.end(req.file.buffer);
    });

    item.imageUrl = upload.secure_url;
    item.imagePublicId = upload.public_id;
  }

  item.name = name ?? item.name;
  item.description = description ?? item.description;
  item.price = price ?? item.price;
  item.category = category ?? item.category;
  if (available !== undefined) {
    item.available = parseBoolean(available, item.available);
  }

  await item.save();
  res.json(item);
};

export const deleteMenuItem = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  if (item.imagePublicId) {
    await cloudinary.uploader.destroy(item.imagePublicId);
  }

  await item.deleteOne();
  res.json({ message: "Menu item deleted" });
};
