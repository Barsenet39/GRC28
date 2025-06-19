import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  const { companyEmail, password } = req.body;

  console.log('🔐 Sign-in attempt:', { companyEmail });

  if (!companyEmail || !password) {
    return res.status(400).json({ message: 'Company email and password are required' });
  }

  try {
    // Find user by companyEmail (assuming your schema uses this field)
    const user = await User.findOne({ companyEmail });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    console.log('✅ User found:', user.companyEmail);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Create JWT token with 1 hour expiry
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    const firstLetter = user.firstName?.charAt(0).toUpperCase() || '';

    // Set cookies
    res.cookie('firstLetter', firstLetter, {
      httpOnly: false,
      sameSite: 'Lax',
      path: '/',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Return user info and token
    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      companyEmail: user.companyEmail,
      companyName: user.companyName,
    });
  } catch (error) {
    console.error('❌ Sign-in server error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
