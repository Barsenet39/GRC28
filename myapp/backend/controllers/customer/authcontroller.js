// controllers/customer/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

export const createUser = async (req, res) => {
  const { fullName, organization, email, phone, password, tinNumber, businessType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
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
      role: 'customer' // optionally assign role
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: 'customer' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add signInUser, forgotPassword, resetPassword if not yet defined.
