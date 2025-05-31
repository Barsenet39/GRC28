requests.js

const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');

// Protect all routes in this file
router.use(requireAuth);

router.get('/', (req, res) => {
  res.send('This is the Package page – logged-in users only');
});

module.exports = router;
