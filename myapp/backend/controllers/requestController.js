// controllers/requestController.js
import Request from '../models/Request.js';

export const createRequest = async (req, res) => {
  try {
    const {
      type,
      companyName,
      services = [],
    } = req.body;

    const userId = req.user.id; // assuming JWT middleware adds this

    const files = {};
    if (req.files?.letterFile) {
      files.letter = req.files.letterFile[0]?.filename;
    }
    if (req.files?.projectFile) {
      files.project = req.files.projectFile[0]?.filename;
    }

    const newRequest = new Request({
      requestId: `GRC-${Date.now()}`,
      userId,
      type,
      companyName,
      file: {
        filename: files.letter || files.project || '',
      },
      services: JSON.parse(req.body.services || '[]'),
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request submitted', request: newRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
