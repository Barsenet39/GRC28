const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth"); // Assuming you have an auth middleware
const Request = require("../models/Request");

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Generate unique request ID
const generateRequestId = () => {
  const randomNum = Math.floor(10000000 + Math.random() * 90000000); // 8-digit number
  return `GOV/${randomNum}`;
};

// Get current date
const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
};

// Upload files and create request
router.post(
  "/",
  auth,
  upload.fields([
    { name: "letter", maxCount: 1 },
    { name: "project", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { companyName } = req.body;
      if (!req.files.letter || !req.files.project || !companyName) {
        return res.status(400).json({ message: "Company name and both files are required" });
      }

      const letterFilePath = req.files.letter[0].path;
      const projectFilePath = req.files.project[0].path;

      // Check if requestId is unique
      let requestId;
      let isUnique = false;
      while (!isUnique) {
        requestId = generateRequestId();
        const existingRequest = await Request.findOne({ requestId });
        if (!existingRequest) isUnique = true;
      }

      const newRequest = new Request({
        requestId,
        companyName,
        date: getCurrentDate(),
        type: "Review",
        status: "Requested",
        letterFilePath,
        projectFilePath,
        user: req.user.id, // From auth middleware
      });

      await newRequest.save();
      res.status(201).json(newRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;