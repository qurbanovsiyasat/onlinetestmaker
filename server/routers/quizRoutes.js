import express from 'express';
const router = express.Router();
import { createQuiz, getMyQuizzes, getQuizById, uploadImage } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';
import { parser } from '../config/cloudinary.js';

router.route('/').post(protect, createQuiz);
router.route('/myquizzes').get(protect, getMyQuizzes);
router.route('/upload').post(protect, parser.single('image'), uploadImage);
router.route('/:id').get(getQuizById);

export default router;