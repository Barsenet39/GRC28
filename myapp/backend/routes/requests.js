import mongoose from "mongoose";
import express from "express";
import multer from "multer";
import Joi from "joi";
import Request from "../models/Request.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const serviceSchema = Joi.object({
  mainTitle: Joi.string().required(),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        cost: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
});

const validateServices = (services) =>
  Joi.array().items(serviceSchema).validate(services);

const generateRequestId = async (attempts = 5) => {
  for (let i = 0; i < attempts; i++) {
    const randomId = `REG/${Math.floor(100000 + Math.random() * 900000)}`;
    const exists = await Request.findOne({ requestId: randomId }).lean();
    if (!exists) return randomId;
  }
  throw new Error("Failed to generate unique requestId");
};

router.use(authenticateUser);

router.post(
  "/",
  upload.fields([
    { name: "letterFile", maxCount: 1 },
    { name: "projectFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const { companyName, date, type, status, services } = req.body;

      const letterFile = req.files?.letterFile?.[0] || null;
      const projectFile = req.files?.projectFile?.[0] || null;

      if (!letterFile && !projectFile) {
        return res.status(400).json({ error: "At least one PDF file is required" });
      }

      if (!services) {
        return res.status(400).json({ error: "Services field is required" });
      }

      let parsedServices;
      try {
        parsedServices = JSON.parse(services);
      } catch {
        return res.status(400).json({ error: "Invalid JSON in services" });
      }

      const { error } = validateServices(parsedServices);
      if (error) {
        return res.status(400).json({ error: "Invalid services structure", details: error.details });
      }

      const requestId = await generateRequestId();

      const files = {};
      if (letterFile) {
        files.letterFile = {
          data: letterFile.buffer,
          filename: letterFile.originalname.trim(),
          contentType: letterFile.mimetype,
        };
      }
      if (projectFile) {
        files.projectFile = {
          data: projectFile.buffer,
          filename: projectFile.originalname.trim(),
          contentType: projectFile.mimetype,
        };
      }

      const newRequest = new Request({
        userId: new mongoose.Types.ObjectId(userId),
        requestId,
        companyName: companyName?.trim(),
        date: date || new Date().toISOString().split("T")[0],
        type,
        status,
        services: parsedServices,
        files,
      });

      await newRequest.save();

      return res.status(201).json({
        message: "Request submitted successfully",
        requestId,
      });
    } catch (err) {
      console.error("Error submitting request:", err);
      return res.status(500).json({ error: "Server error submitting request" });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const requests = await Request.find({ userId })
      .select("-files.letterFile.data -files.projectFile.data")
      .lean();
    return res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching user requests:", err);
    return res.status(500).json({ error: "Error fetching user requests" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;

    // Validate ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid request ID format" });
    }

    const request = await Request.findOne({
      _id: id,
      userId,
    })
      .select("-files.letterFile.data -files.projectFile.data")
      .lean();

    if (!request) {
      return res.status(404).json({ error: "Request not found or access denied" });
    }

    return res.status(200).json(request);
  } catch (err) {
    console.error("Error fetching request:", err);
    return res.status(500).json({ error: "Server error fetching request" });
  }
});

router.get("/test-auth", authenticateUser, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

export default router;
