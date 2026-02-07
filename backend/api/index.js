import app from "../app.js";
import connectDatabase from "../config/db.js";
import { ensureDefaultAdmin } from "../config/initAdmin.js";

let isReady = false;

export default async function handler(req, res) {
  if (!isReady) {
    await connectDatabase();
    await ensureDefaultAdmin();
    isReady = true;
  }
  return app(req, res);
}
