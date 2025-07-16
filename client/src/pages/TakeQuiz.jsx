import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TakeQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await axios.get(`/api/quizzes/${id}`);
        setQuiz(data);
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
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
  };
  
  if (loading) return <p>Loading quiz...</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      {score === null ? (
        <div>
          {quiz.questions.map((q, index) => (
            <div key={index} style={{ marginBottom: '20px', background: '#fff', padding: '15px', borderRadius: '5px' }}>
              <h4>{index + 1}. {q.questionText}</h4>
              {q.image && <img src={q.image} alt="Question visual" style={{maxWidth: '300px', marginBottom: '10px', borderRadius: '5px'}}/>}
              <div>
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} style={{ margin: '5px 0' }}>
                    <input
                      type="radio"
                      id={`q${index}_option${oIndex}`}
                      name={`question_${index}`}
                      value={option}
                      onChange={() => handleAnswerChange(index, option)}
                    />
                    <label htmlFor={`q${index}_option${oIndex}`} style={{ marginLeft: '10px' }}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleSubmit} className="button">Submit Answers</button>
        </div>
      ) : (
        <div>
          <h2>Quiz Finished!</h2>
          <h3>Your score: {score} out of {quiz.questions.length}</h3>
          <p>That's {((score / quiz.questions.length) * 100).toFixed(2)}%!</p>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;