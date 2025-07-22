import asyncHandler from 'express-async-handler';
import Quiz from '../models/Quiz.js';
import { isCloudinaryConfigured } from '../config/cloudinary.js';

const createQuiz = asyncHandler(async (req, res) => {
  console.log('Creating quiz:', req.body);
  const { title, questions } = req.body;
  
  if (!title || !questions || questions.length === 0) {
    res.status(400);
    throw new Error('Title and questions are required');
  }

  const quiz = new Quiz({
    title,
    questions,
    user: req.user._id,
  });
  
  const createdQuiz = await quiz.save();
  console.log('Quiz created successfully:', createdQuiz._id);
  res.status(201).json(createdQuiz);
});

const getAllQuizzes = asyncHandler(async (req, res) => {
  console.log('Fetching all quizzes');
  try {
    const quizzes = await Quiz.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    console.log(`Found ${quizzes.length} quizzes`);
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500);
    throw new Error('Failed to fetch quizzes');
  }
});

const getMyQuizzes = asyncHandler(async (req, res) => {
  console.log('Fetching quizzes for user:', req.user._id);
  try {
    const quizzes = await Quiz.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    console.log(`Found ${quizzes.length} quizzes for user`);
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching user quizzes:', error);
    res.status(500);
    throw new Error('Failed to fetch your quizzes');
  }
});

const getQuizById = asyncHandler(async (req, res) => {
  console.log('Fetching quiz by ID:', req.params.id);
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('user', 'name email');
    
    if (quiz) {
      console.log('Quiz found:', quiz.title);
      res.json(quiz);
    } else {
      res.status(404);
      throw new Error('Quiz not found');
    }
  } catch (error) {
    console.error('Error fetching quiz:', error);
    if (error.message === 'Quiz not found') {
      res.status(404);
      throw new Error('Quiz not found');
    } else {
      res.status(500);
      throw new Error('Failed to fetch quiz');
    }
  }
});

const uploadImage = asyncHandler(async (req, res) => {
  console.log('Image upload request received');
  
  if (!isCloudinaryConfigured) {
    res.status(500);
    throw new Error("Image upload service not configured. Please contact administrator.");
  }
  
  if(req.file) {
    console.log('Image uploaded successfully:', req.file.path);
    res.status(201).json({
      message: "Image uploaded successfully",
      imageUrl: req.file.path
    });
  } else {
    res.status(400);
    throw new Error("Image upload failed.");
  }
});

export { createQuiz, getAllQuizzes, getMyQuizzes, getQuizById, uploadImage };