import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Quiz from '../models/Quiz.js';

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      // Admin-in özünü silməsinin qarşısını alaq
      if (user.role === 'admin') {
        res.status(400);
        throw new Error('Cannot delete admin user');
      }
      await User.deleteOne({ _id: req.params.id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({}).populate('user', 'name email');
  res.json(quizzes);
});

const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (quiz) {
    await Quiz.deleteOne({ _id: req.params.id });
    res.json({ message: 'Quiz removed' });
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

export { getUsers, deleteUser, getAllQuizzes, deleteQuiz };