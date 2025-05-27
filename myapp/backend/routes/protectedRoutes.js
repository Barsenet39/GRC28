import express from 'express';
import authenticateUser from './authMiddleware.js'; // Import the authentication middleware

const router = express.Router();

// Use the middleware on routes that need to be protected
router.get('/Package', authenticateUser, (req, res) => {
  res.send('Package Content'); // Replace this with your actual logic
});

router.get('/Risk-Management', authenticateUser, (req, res) => {
  res.send('Risk Management Content'); // Replace this with your actual logic
});

// Similarly, protect other routes
router.get('/Management', authenticateUser, (req, res) => {
  res.send('Management Content');
});

router.get('/Both', authenticateUser, (req, res) => {
  res.send('Both Content');
});

// Export the router for use in your Express app
export default router;
