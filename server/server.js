import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('🚀 Starting Simple OnlineTestMaker Server...');
console.log('📍 Port:', process.env.PORT || 5000);
console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET ? 'Set ✓' : 'Not set ✗');

const app = express();

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

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

// Mock quiz routes
app.get('/api/quizzes', (req, res) => {
  console.log('GET /api/quizzes - Returning mock quizzes');
  res.json([
    {
      _id: 'quiz1',
      title: 'Sample Quiz 1',
      questions: [
        {
          questionText: 'What is the capital of France?',
          options: ['London', 'Berlin', 'Paris', 'Madrid'],
          correctAnswer: 'Paris'
        }
      ],
      user: { name: 'Test User', email: 'test@example.com' },
      createdAt: new Date().toISOString()
    },
    {
      _id: 'quiz2',
      title: 'Math Quiz',
      questions: [
        {
          questionText: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          correctAnswer: '4'
        }
      ],
      user: { name: 'Test User', email: 'test@example.com' },
      createdAt: new Date().toISOString()
    }
  ]);
});

app.get('/api/quizzes/myquizzes', (req, res) => {
  console.log('GET /api/quizzes/myquizzes - Returning user quizzes');
  res.json([
    {
      _id: 'myquiz1',
      title: 'My First Quiz',
      questions: [
        {
          questionText: 'Sample question?',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 'A'
        }
      ],
      createdAt: new Date().toISOString()
    }
  ]);
});

app.get('/api/quizzes/:id', (req, res) => {
  console.log('GET /api/quizzes/:id - Returning specific quiz');
  const quizId = req.params.id;
  res.json({
    _id: quizId,
    title: 'Sample Quiz',
    questions: [
      {
        questionText: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 'Paris'
      }
    ],
    user: { name: 'Test User', email: 'test@example.com' },
    createdAt: new Date().toISOString()
  });
});

app.post('/api/quizzes', (req, res) => {
  console.log('POST /api/quizzes - Creating quiz');
  const { title, questions } = req.body;
  res.status(201).json({
    _id: 'new-quiz-id',
    title,
    questions,
    user: { name: 'Test User' },
    createdAt: new Date().toISOString()
  });
});

// Mock auth routes
app.post('/api/auth/login', (req, res) => {
  console.log('POST /api/auth/login - Mock login');
  const { email, password } = req.body;
  
  if (email && password) {
    res.json({
      _id: 'user123',
      name: 'Test User',
      email: email,
      role: 'user',
      token: 'mock-jwt-token-12345'
    });
  } else {
    res.status(400).json({ message: 'Email and password required' });
  }
});

app.post('/api/auth/register', (req, res) => {
  console.log('POST /api/auth/register - Mock registration');
  const { name, email, password } = req.body;
  
  if (name && email && password) {
    res.status(201).json({
      _id: 'user123',
      name: name,
      email: email,
      role: 'user',
      token: 'mock-jwt-token-12345'
    });
  } else {
    res.status(400).json({ message: 'Name, email, and password required' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
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
      'POST /api/auth/login',
      'POST /api/auth/register'
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