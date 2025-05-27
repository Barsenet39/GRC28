import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Debug logs
  console.log('🔐 Sign-in attempt:', { email });

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Debug log
    console.log('✅ User found:', user.email);

    // Check hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    // Get first letter of full name for frontend UI (optional)
    const firstLetter = user.fullName?.charAt(0).toUpperCase() || '';

    // Set cookies
    res.cookie('firstLetter', firstLetter, {
      httpOnly: false,         // Accessible by frontend JS
      sameSite: 'Lax',
    });

    res.cookie('token', token, {
      httpOnly: true,          // Secure token cookie
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production', // Only HTTPS in prod
    });

    // Respond with success
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('❌ Sign-in server error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
