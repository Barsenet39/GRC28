import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import signupRoutes from './routes/signup.js';
import signinRoutes from './routes/signin.js';
import meRoute from './routes/me.js';
import uploadsRoutes from './routes/uploads.js'; // ✅ updated route
import riskRoutes from './routes/riskmanagement.js';

dotenv.config();

const app = express();
const router = express.Router();
// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};
connectDB();






// DB connect
mongoose.connect("mongodb://localhost:5000/uploads", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.error("MongoDB error ❌", err));
// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/uploads", uploadsRoutes);
// Routes
app.use('/api', meRoute);
app.use('/api/signup', signupRoutes);
app.use('/api/signin', signinRoutes);
app.use('/api', meRoute);
app.use('/api/riskmanagement', riskRoutes);
// Default routes
app.get('/', (req, res) => {
  res.send('✅ Server is running');
})
app.get('/api/risks', (req, res) => {
  res.json({ status: 'OK' });
});
// Example in Express.js
app.get('/api/me', (req, res) => {
  // check user session/auth token and return user info
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
