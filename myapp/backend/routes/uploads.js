import express from "express";
import multer from "multer";
import mongoose from "mongoose";

const router = express.Router();

// Mongoose Schema
const uploadSchema = new mongoose.Schema({
  userId: String,
  requestId: String,
  companyName: String,
  date: String,
  type: String,
  status: String,
  services: [Number],
  fileName: String,
  fileType: String,
  fileData: Buffer,
});
const Upload = mongoose.model("Upload", uploadSchema);

// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST - upload file + metadata
router.post("/", upload.single("file1"), async (req, res) => {
  try {
    const {
      userId,
      requestId,
      companyName,
      date,
      type,
      status,
      services,
    } = req.body;

    const newUpload = new Upload({
      userId,
      requestId,
      companyName,
      date,
      type,
      status,
      services: JSON.parse(services),
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileData: req.file.buffer,
    });

    await newUpload.save();
    console.log("✅ Saved to MongoDB:", newUpload);
    res.status(200).json({ message: "Upload successful" });
  } catch (error) {
    console.error("❌ Error uploading:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// GET uploads by userId (exclude fileData field)
router.get("/", async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId query parameter" });
  }

  try {
    const uploads = await Upload.find({ userId }).select("-fileData").lean();
    res.json(uploads);
  } catch (error) {
    console.error("Error fetching uploads:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
