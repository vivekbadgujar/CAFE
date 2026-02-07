import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/db.js";
import { ensureDefaultAdmin } from "./config/initAdmin.js";
const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();
  await ensureDefaultAdmin();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
