import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPublicQuizzes = async () => {
      try {
        const { data } = await axios.get('/api/quizzes');
        setQuizzes(data);
      } catch (error) {
        console.error('Could not fetch quizzes', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicQuizzes();
  }, []);

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1>Welcome to OnlineTestMaker</h1>
        <p>Create and take quizzes online with ease!</p>
        
        {!user && (
          <div style={{ margin: '20px 0' }}>
            <Link to="/register" className="button" style={{ marginRight: '10px' }}>
              Get Started
            </Link>
            <Link to="/login" className="button">
              Login
            </Link>
          </div>
        )}
        
        {user && (
          <div style={{ margin: '20px 0' }}>
            <Link to="/dashboard" className="button" style={{ marginRight: '10px' }}>
              Go to Dashboard
            </Link>
            <Link to="/create" className="button">
              Create New Quiz
            </Link>
          </div>
        )}
      </div>

      <div>
        <h2>Available Quizzes</h2>
        {loading ? (
          <p>Loading quizzes...</p>
        ) : quizzes.length > 0 ? (
          <div style={{ display: 'grid', gap: '20px' }}>
            {quizzes.map((quiz) => (
              <div 
                key={quiz._id} 
                style={{ 
                  background: 'white', 
                  padding: '20px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <h3>{quiz.title}</h3>
                <p>Created by: {quiz.user?.name || 'Anonymous'}</p>
                <p>{quiz.questions.length} questions</p>
                <Link to={`/quiz/${quiz._id}`} className="button">
                  Take Quiz
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No quizzes available yet. <Link to="/create">Create the first one!</Link></p>
        )}
      </div>
    </div>
  );
};

export default Home;