import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import authRoutes from './routers/authRoutes.js';
import quizRoutes from './routers/quizRoutes.js';
import adminRoutes from './routers/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('🚀 Starting OnlineTestMaker Server...');
console.log('📍 Port:', process.env.PORT || 5000);
console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET ? 'Set ✓' : 'Not set ✗');
console.log('🍃 MONGO_URI:', process.env.MONGO_URI ? 'Set ✓' : 'Not set ✗');

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000'],
  credentials: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  console.log('GET / - Root route accessed');
  res.json({ 
    message: 'OnlineTestMaker API is running!',
    timestamp: new Date().toISOString(),
    status: 'healthy',
    version: '1.0.0'
  });
});

// Direct login page route
app.get('/direct-login', (req, res) => {
  console.log('GET /direct-login - Serving direct login page');
  res.sendFile(path.join(__dirname, '../direct-login.html'));
});

// Direct login page route
app.get('/direct-login', (req, res) => {
  console.log('GET /direct-login - Serving direct login page');
  res.sendFile(path.join(__dirname, '../direct-login.html'));
});

// Health check
app.get('/health', (req, res) => {
  console.log('GET /health - Health check accessed');
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  console.log('❌ 404 - Route not found:', req.method, req.path);
  res.status(404).json({ 
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      'GET /',
      'GET /health', 
      'GET /api/quizzes',
      'POST /api/quizzes',
      'GET /api/quizzes/myquizzes',
      'POST /api/quizzes/upload',
      'POST /api/auth/login',
      'POST /api/auth/register',
      'GET /api/admin/users',
      'GET /api/admin/quizzes'
    ]
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('✅ Server started successfully!');
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
  console.log(`📋 Quizzes: http://localhost:${PORT}/api/quizzes`);
  console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
  console.log(`⚙️ Admin: http://localhost:${PORT}/api/admin`);
  console.log('🔄 Ready to handle requests...');
});

server.on('error', (error) => {
  console.error('❌ Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use!`);
    console.log('Try: netstat -ano | findstr :5000');
  }
});

export default app;