// routes/riskmanagement.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ _id: 'user123', name: 'Test User' }); // Make sure _id is present
});

export default router;
