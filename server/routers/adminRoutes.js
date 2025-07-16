import express from 'express';
const router = express.Router();
import {
  getUsers,
  deleteUser,
  getAllQuizzes,
  deleteQuiz,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/users', protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);
router.get('/quizzes', protect, admin, getAllQuizzes);
router.delete('/quizzes/:id', protect, admin, deleteQuiz);

export default router;