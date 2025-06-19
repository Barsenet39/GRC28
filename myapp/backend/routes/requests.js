import express from 'express';
import multer from 'multer';
import Joi from 'joi';
import path from 'path';
import fs from 'fs';
import { authenticateUser } from '../middleware/authMiddleware.js';
import Request from '../models/Request.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join('uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer config for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const cleanName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${timestamp}-${cleanName}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).fields([
  { name: 'letterFile', maxCount: 1 },
  { name: 'projectFile', maxCount: 1 },
]);

// Joi validation schema for services
const serviceSchema = Joi.object({
  mainTitle: Joi.string().trim().required(),
  category: Joi.string().trim().required(),
  subCategory: Joi.string().trim().required(),
  items: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        cost: Joi.string().trim().required(),
      })
    )
    .min(1)
    .required(),
});

// Generate unique requestId with retries
const generateRequestId = async (maxAttempts = 10) => {
  for (let i = 0; i < maxAttempts; i++) {
    const requestId = `REG/${Math.floor(100000 + Math.random() * 900000)}`;
    const exists = await Request.findOne({ requestId }).lean();
    if (!exists) return requestId;
  }
  throw new Error('Failed to generate unique requestId');
};

// Multer error handler middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ error: `File upload error: ${err.message}` });
  }
  next();
};

// POST /api/requests - submit a new request
router.post('/', authenticateUser, upload, handleMulterError, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(401).json({ error: 'User not found' });

    const { services } = req.body;
    const letterFile = req.files?.letterFile?.[0];
    const projectFile = req.files?.projectFile?.[0];

    if (!services || !letterFile || !projectFile) {
      return res.status(400).json({ error: 'Services, letterFile, and projectFile are required' });
    }

    let parsedServices;
    try {
      parsedServices = JSON.parse(services);
    } catch {
      return res.status(400).json({ error: 'Invalid services JSON format' });
    }

    const { error } = Joi.array().items(serviceSchema).validate(parsedServices);
    if (error) {
      return res.status(400).json({ error: 'Invalid services structure', details: error.details });
    }

    const requestId = await generateRequestId();
    const companyName = user.companyName?.trim() || 'Anonymous';
const type = req.body.type === 'Technical Support' ? 'Technical Support' : 'Project';

    const newRequest = new Request({
  requestId,
  userId: user.userId,
  companyName,
  companyPhone: user.companyPhone || '',
  companyEmail: user.companyEmail || '',
  businessType: user.businessType || '',
  otherBusinessType: user.otherBusinessType || '',
  companyAddress: user.companyAddress || '',
  firstName: user.firstName || '',
  lastName: user.lastName || '',
  type,
  status: 'Requested',
  date: new Date(),
  services: parsedServices,
  files: {
    letterFile: {
      path: letterFile.path,
      filename: letterFile.originalname.trim(),
      contentType: letterFile.mimetype,
    },
    projectFile: {
      path: projectFile.path,
      filename: projectFile.originalname.trim(),
      contentType: projectFile.mimetype,
    },
  },
});


    // Log to verify userId and the whole request data:
console.log('Saving new request:', {
  requestId: newRequest.requestId,
  userId: newRequest.userId,
  companyName: newRequest.companyName,
  services: newRequest.services,
  files: newRequest.files,
});
console.log('Body:', req.body);
console.log('Files:', req.files);

    await newRequest.save();

    res.status(201).json({ message: 'Request submitted successfully', requestId });
  } catch (error) {
    console.error('POST /api/requests error:', error);
    res.status(500).json({ error: 'Server error submitting request' });
  }
});

// GET /api/requests - get all requests for logged-in user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user || !user.userId) {
      return res.status(401).json({ error: 'User not found' });
    }

    const userId = req.query.userId || user.userId;

    const requests = await Request.find({ userId }).sort({ createdAt: -1 }).lean();

    console.log(`GET /api/requests for userId: ${userId}`); // ✅ log before response
    return res.status(200).json(requests);
  } catch (err) {
    console.error('GET /api/requests error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



// GET /api/requests/:id - get specific request by requestId
// Updated route: GET /api/requests/id/:id
router.get('/id/:id', authenticateUser, async (req, res) => {
  try {
    const decodedId = decodeURIComponent(req.params.id);

    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(401).json({ error: 'User not found' });

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database unavailable' });
    }

    const request = await Request.findOne({
      requestId: decodedId,
      userId: user.userId,
    }).lean();

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json(request);
  } catch (error) {
    console.error(`GET /api/requests/id/${req.params.id} error:`, error);
    res.status(500).json({ error: 'Server error fetching request' });
  }
});






export default router;
