import CafeSettings from "../models/CafeSettings.js";

export const getSettings = async (req, res) => {
  let settings = await CafeSettings.findOne();
  if (!settings) {
    settings = await CafeSettings.create({
      name: "Good Grounds",
      description: "",
      address: "",
      openingHours: "",
      socials: {}
    });
  }
  res.json(settings);
};

export const updateSettings = async (req, res) => {
  const payload = req.body;
  let settings = await CafeSettings.findOne();
  if (!settings) {
    settings = new CafeSettings(payload);
  } else {
    settings.set(payload);
  }
  await settings.save();
  res.json(settings);
};
