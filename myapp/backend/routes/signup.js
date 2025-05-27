import express from 'express';
import User from '../models/User.js'; 
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/', async (req, res) => {
  const { fullName, organization, email, phone, password, tinNumber, businessType } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      organization,
      email,
      phone,
      password: hashedPassword,
      tinNumber,
      businessType,
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'User created successfully',
      userId: newUser._id, 
     companyName: newUser.organization 
     });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error',  });
  }
});

export default router;
