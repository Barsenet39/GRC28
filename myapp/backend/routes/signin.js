import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  console.log('🔐 Sign-in attempt:', { email });

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    console.log('✅ User found:', user.email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    const firstLetter = user.firstName?.charAt(0).toUpperCase() || '';

    res.cookie('firstLetter', firstLetter, {
      httpOnly: false,
      sameSite: 'Lax',
      path: '/',
    });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    // ✅ Return flattened user data so frontend can directly access role
    res.status(200).json({
      message: 'Login successful',
      role: user.role, // <--- Flattened for frontend
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

  } catch (error) {
    console.error('❌ Sign-in server error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
