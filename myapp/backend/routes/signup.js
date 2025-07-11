import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Helper: Generate unique userId like "USR/123456"
const generateUserId = async (maxAttempts = 5) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    const userId = `USR/${randomNum}`;
    const exists = await User.findOne({ userId });
    if (!exists) return userId;
  }
  throw new Error('Failed to generate a unique userId after multiple attempts');
};

router.post('/', async (req, res) => {
  let {
    firstName,
    lastName,
    companyName,
    companyEmail,
    companyAddress = '',
    companyPhone,
    password,
    confirmPassword,
    tinNumber,
    businessType,
    otherBusinessType,
    role = 'customer',
  } = req.body;

  // Normalize email early
  const normalizedEmail = companyEmail?.trim().toLowerCase();

  try {
    // Basic required fields validation
    if (!normalizedEmail || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Email, password, and confirmation are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Regex patterns for validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must include uppercase, lowercase, number, and special character.',
      });
    }

    // Role-specific validation
    if (role === 'customer') {
      if (!companyName) return res.status(400).json({ message: 'Company name is required.' });
      if (!companyPhone) return res.status(400).json({ message: 'Phone number is required.' });
      if (!tinNumber) return res.status(400).json({ message: 'TIN number is required.' });

      if (!/^\d+$/.test(tinNumber)) {
        return res.status(400).json({ message: 'TIN number must contain digits only.' });
      }
      if (!businessType) {
        return res.status(400).json({ message: 'Please select a business type.' });
      }
      if (businessType === 'Other' && !otherBusinessType?.trim()) {
        return res.status(400).json({ message: 'Please specify your business type.' });
      }
      if (businessType === 'HSO' && !/^\d+$/.test(otherBusinessType?.trim())) {
        return res.status(400).json({ message: 'For HSO, the identifier must be numbers only.' });
      }
      if (businessType === 'TIT' && !emailRegex.test(normalizedEmail)) {
        return res.status(400).json({ message: 'Invalid email format for TIT business type.' });
      }
      if (businessType === 'SPHONE' && !/^[\d+\-]+$/.test(companyPhone?.trim())) {
        return res.status(400).json({
          message: 'Phone number can only include digits, +, and -.',
        });
      }
    }

    // Check if user with the same companyEmail already exists
    const existingUser = await User.findOne({ companyEmail: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique userId
    const userId = await generateUserId();

    // Create new user document
    const newUser = new User({
      userId,
      firstName,
      lastName,
      companyName: companyName || '',
      companyEmail: normalizedEmail,
      companyAddress: companyAddress || '',
      companyPhone: companyPhone || '',
      password: hashedPassword,
      tinNumber: tinNumber || '',
      businessType: businessType || '',
      otherBusinessType: otherBusinessType || '',
      role,
    });

    // Save user to DB
    await newUser.save();

    // Respond with success and user info
    return res.status(201).json({
      message: 'User created successfully',
      userId: newUser.userId,
      companyName: newUser.companyName,
      role: newUser.role,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
