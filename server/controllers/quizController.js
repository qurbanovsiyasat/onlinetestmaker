import asyncHandler from 'express-async-handler';
import Quiz from '../models/Quiz.js';

const createQuiz = asyncHandler(async (req, res) => {
  const { title, questions } = req.body;
  const quiz = new Quiz({
    title,
    questions,
    user: req.user._id,
  });
  const createdQuiz = await quiz.save();
  res.status(201).json(createdQuiz);
});

const getMyQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({ user: req.user._id });
  res.json(quizzes);
});

const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

const uploadImage = asyncHandler(async (req, res) => {
    if(req.file) {
        res.status(201).json({
            message: "Image uploaded successfully",
            imageUrl: req.file.path
        });
    } else {
        res.status(400);
        throw new Error("Image upload failed.");
    }
});

export { createQuiz, getMyQuizzes, getQuizById, uploadImage };