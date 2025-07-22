import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useParams, Link } from 'react-router-dom';
import QuestionItem from '../components/QuestionItem';

const TakeQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeStarted, setTimeStarted] = useState(null);
  const [timeFinished, setTimeFinished] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await axios.get(`/api/quizzes/${id}`);
        setQuiz(data);
        setTimeStarted(new Date());
      } catch (error) {
        console.error('Could not fetch the quiz', error);
        alert('Quiz not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    const results = {};
    
    quiz.questions.forEach((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      if (isCorrect) {
        newScore++;
      }
      results[index] = isCorrect;
    });
    
    setScore(newScore);
    setShowResults(true);
    setTimeFinished(new Date());
  };

  const calculateTimeTaken = () => {
    if (timeStarted && timeFinished) {
      const timeDiff = (timeFinished - timeStarted) / 1000; // in seconds
      const minutes = Math.floor(timeDiff / 60);
      const seconds = Math.floor(timeDiff % 60);
      return `${minutes}m ${seconds}s`;
    }
    return 'N/A';
  };

  const getScoreMessage = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 90) return "Excellent! 🎉";
    if (percentage >= 80) return "Great job! 👏";
    if (percentage >= 70) return "Good work! 👍";
    if (percentage >= 60) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <p>Loading quiz...</p>
    </div>
  );

  if (!quiz) return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <p>Quiz not found.</p>
      <Link to="/" className="button">Back to Home</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        background: '#fff', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>{quiz.title}</h1>
        <p style={{ margin: '0', color: '#666' }}>
          {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
          {quiz.user?.name && ` • Created by ${quiz.user.name}`}
        </p>
      </div>

      {!showResults ? (
        <div>
          {quiz.questions.map((question, index) => (
            <QuestionItem
              key={index}
              question={question}
              index={index}
              selectedAnswer={answers[index]}
              onAnswerChange={handleAnswerChange}
            />
          ))}
          
          <div style={{ 
            textAlign: 'center', 
            margin: '30px 0',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Answered: {Object.keys(answers).length} / {quiz.questions.length}
            </p>
            <button 
              onClick={handleSubmit} 
              className="button"
              disabled={Object.keys(answers).length !== quiz.questions.length}
              style={{
                fontSize: '18px',
                padding: '12px 30px',
                backgroundColor: Object.keys(answers).length === quiz.questions.length 
                  ? '#007bff' : '#ccc',
                cursor: Object.keys(answers).length === quiz.questions.length 
                  ? 'pointer' : 'not-allowed'
              }}
            >
              Submit Quiz
            </button>
            {Object.keys(answers).length !== quiz.questions.length && (
              <p style={{ 
                marginTop: '10px', 
                color: '#dc3545', 
                fontSize: '14px' 
              }}>
                Please answer all questions before submitting
              </p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ 
            background: '#fff', 
            padding: '30px', 
            borderRadius: '8px', 
            textAlign: 'center',
            marginBottom: '30px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#28a745', marginBottom: '15px' }}>Quiz Complete!</h2>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>
              <strong>{score}</strong> out of <strong>{quiz.questions.length}</strong>
            </div>
            <div style={{ fontSize: '18px', color: '#666', marginBottom: '10px' }}>
              {((score / quiz.questions.length) * 100).toFixed(1)}%
            </div>
            <div style={{ fontSize: '20px', marginBottom: '15px' }}>
              {getScoreMessage()}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>
              Time taken: {calculateTimeTaken()}
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>Review Your Answers</h3>
            {quiz.questions.map((question, index) => (
              <QuestionItem
                key={index}
                question={question}
                index={index}
                selectedAnswer={answers[index]}
                showResult={true}
                isCorrect={answers[index] === question.correctAnswer}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Link to="/" className="button" style={{ marginRight: '10px' }}>
              Back to Home
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="button"
              style={{ backgroundColor: '#28a745' }}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;