// Basic Express server setup
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Route imports
import authRoutes from './routes/auth.js';
import interviewRoutes from './routes/interview.js';

dotenv.config();
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',    // React default port
    'http://localhost:5173',    // Vite default port
    'http://localhost:4173',    // Vite preview port
    'https://hackathon-ck-7eu7.vercel.app'  // Your deployed frontend
  ],
  credentials: true,  // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 6000;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Health check
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Log CORS origins for debugging
console.log('🌐 CORS enabled for origins:', corsOptions.origin);