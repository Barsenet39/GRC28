// server.js (ES Modules Syntax)
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/signup.js'; // Correct the path here
import dotenv from 'dotenv';


import signinRoutes from './routes/signin.js';


dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Routes
app.use('/api/signup', userRoutes);
app.use('/api/signin', signinRoutes);


// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
