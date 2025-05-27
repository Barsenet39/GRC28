
/*const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/authMiddleware');

// Protect all routes in this file
router.use(requireAuth);

router.get('/', (req, res) => {
  res.send('This is the Package page – logged-in users only');
});

module.exports = router;
*/




import express from 'express';
import multer from 'multer';
import Request from '../models/Request.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Multer config for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Generate unique request ID
const generateRequestId = async () => {
  let requestId;
  let isUnique = false;
  while (!isUnique) {
    const randomNum = Math.floor(10000000 + Math.random() * 90000000); // 8-digit number
    requestId = `GOV/${randomNum}`;
    const existingRequest = await Request.findOne({ requestId });
    if (!existingRequest) isUnique = true;
  }
  return requestId;
};

// Get current date
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
};

// Create new request
router.post(
  '/',
  auth,
  upload.fields([
    { name: 'letterFile', maxCount: 1 },
    { name: 'projectFile', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { type } = req.body;
      if (!req.files.letterFile || !req.files.projectFile) {
        return res.status(400).json({ message: 'Both letter and project files are required' });
      }
      if (type !== 'Technical Support') {
        return res.status(400).json({ message: 'Type must be Technical Support' });
      }

      const requestId = await generateRequestId();
      const newRequest = new Request({
        requestId,
        type,
        status: 'Requested',
        user: req.user.id, // From auth middleware
        files: {
          letter: req.files.letterFile[0].buffer,
          project: req.files.projectFile[0].buffer,
        },
        date: getCurrentDate(),
      });

      await newRequest.save();
      res.status(201).json({ message: 'Request submitted successfully', request: newRequest });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error submitting request' });
    }
  }
);

export default router;