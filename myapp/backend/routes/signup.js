import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/', async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    email,
    phone,
    password,
    confirmPassword,
    tinNumber,
    businessType,
    otherBusinessType,
    role = 'customer', // default to customer if not provided
  } = req.body;

  // Basic required fields
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Email, password, and confirmation are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Password must include uppercase, lowercase, number, and special character.' });
  }

  // Validate customer-specific fields only if role === 'customer'
  if (role === 'customer') {
    if (!companyName) {
      return res.status(400).json({ message: 'Company name is required for customers.' });
    }
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required for customers.' });
    }
    if (!tinNumber) {
      return res.status(400).json({ message: 'TIN number is required for customers.' });
    }
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
    if (businessType === 'TIT' && !emailRegex.test(email?.trim())) {
      return res.status(400).json({ message: 'Invalid email format for TIT business type.' });
    }
    if (businessType === 'SPHONE' && !/^[\d+\-]+$/.test(phone?.trim())) {
      return res.status(400).json({ message: 'Phone number can only include digits, +, and -.' });
    }
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      organization: companyName || '',  // optional for admin roles
      email,
      phone: phone || '',                // optional for admin roles
      password: hashedPassword,
      tinNumber: tinNumber || '',        // optional for admin roles
      businessType: businessType || '',  // optional for admin roles
      otherBusinessType: otherBusinessType || '',
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      userId: newUser._id,
      companyName: newUser.organization,
      role: newUser.role,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
