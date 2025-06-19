import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { authenticateUser } from './middleware/authMiddleware.js'; // <-- import it
import cookieParser from 'cookie-parser';

// Import routes
import signupRoutes from './routes/signup.js';
import signinRoutes from './routes/signin.js';
import authRoutes from './routes/auth.js';
import requestsRoutes from './routes/requests.js';
import decisionsRouter from './routes/decisions.js';
import riskRoutes from './routes/riskmanagement.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/signup', signupRoutes);
app.use('/api/signin', signinRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
// Mount the requests router
// Protect requests route with authentication middleware
app.use('/api/requests', authenticateUser, requestsRoutes);

app.use('/api/riskmanagement', riskRoutes);
app.use('/api/decisions', decisionsRouter);

// Health check or default route
app.get('/', (req, res) => {
  res.send('✅ Server is running');
});

// Forgot-password endpoint example
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset your password',
      text: 'Here is your password reset link: https://your-app.com/reset-password',
    };

    console.log(`📨 Attempting to send email to ${email}`);
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');

    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error('❌ Email error:', error.message);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
