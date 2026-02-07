import ContactMessage from "../models/ContactMessage.js";

export const createMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;
  const newMessage = await ContactMessage.create({ name, email, phone, message });
  res.status(201).json(newMessage);
};

export const getMessages = async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
};

export const deleteMessage = async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);
  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }
  await message.deleteOne();
  res.json({ message: "Message deleted" });
};
