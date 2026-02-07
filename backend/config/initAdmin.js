import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

export const ensureDefaultAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await Admin.create({
    name: "Default Admin",
    email,
    password: hashedPassword,
    role: "admin"
  });
  console.log("Default admin created");
};
