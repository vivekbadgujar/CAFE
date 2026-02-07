import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDatabase from "./config/db.js";
import { cloudinaryConfig } from "./config/cloudinary.js";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { ensureDefaultAdmin } from "./config/initAdmin.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || "*",
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

cloudinaryConfig();

app.get("/", (req, res) => {
  res.json({ status: "Cafe API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/settings", settingsRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDatabase();
  await ensureDefaultAdmin();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
