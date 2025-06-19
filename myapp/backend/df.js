import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import requestsRouter from './routes/requests.js';
import decisionsRouter from './routes/decisions.js';

// Load environment variables
config();
console.log('🔍 .env loaded, MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET,POST,PATCH,PUT,DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// MongoDB connection
mongoose.set('strictQuery', false);
mongoose.set('debug', true);
const connectWithRetry = async (retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 30000,
      });
      console.log('✅ MongoDB connected');
      return true;
    } catch (err) {
      console.error(`❌ MongoDB connection attempt ${i + 1} failed:`, err.message);
      console.error('MONGO_URI:', process.env.MONGO_URI?.replace(/:.*@/, ':****@'));
      if (i === retries - 1) {
        console.error('⚠️ MongoDB not connected, continuing without DB...');
        return false;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// Debug routes
app.use((req, res, next) => {
  console.log(`📡 Incoming request: ${req.method} ${req.url}`);
  next();
});

// Mount routes
console.log('🔗 Mounting /api/requests');
app.use('/api/requests', requestsRouter);
console.log('🔗 Mounting /api/decisions');
app.use('/api/decisions', decisionsRouter);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Catch-all for unknown routes
app.use((req, res) => {
  console.log(`⚠️ Unknown route: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error:', err.message, err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start server
const startServer = async () => {
  const dbConnected = await connectWithRetry();
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔍 MongoDB status: ${dbConnected ? 'Connected' : 'Not connected'}`);
  });
};
startServer();

// Process error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
