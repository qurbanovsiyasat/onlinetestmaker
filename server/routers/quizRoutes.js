import express from 'express';
const router = express.Router();
import { createQuiz, getAllQuizzes, getMyQuizzes, getQuizById, uploadImage } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';
import { parser } from '../config/cloudinary.js';

// Get all quizzes (public route for home page)
router.get('/', getAllQuizzes);

// Create new quiz (protected route)
router.post('/', protect, createQuiz);

// Get user's quizzes (protected route)
router.get('/myquizzes', protect, getMyQuizzes);

// Upload image (protected route)
router.post('/upload', protect, parser.single('image'), uploadImage);

// Get specific quiz by ID (public route)
router.get('/:id', getQuizById);

export default router;