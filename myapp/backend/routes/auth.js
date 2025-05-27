import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';  // Import your User model
import jwt from 'jsonwebtoken';        // Import JWT for generating tokens

const router = express.Router();

// Sign Up Route
router.post('/signup', async (req, res) => {
  const { fullName, organization, email, phone, password, tinNumber, businessType } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      organization,
      email,
      phone,
      password: hashedPassword,
      tinNumber,
      businessType,
    });

    // Save new user to the database
    await newUser.save();

    // Create JWT token (optional step for authentication)
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
