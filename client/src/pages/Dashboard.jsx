import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyQuizzes = async () => {
      try {
        const { data } = await axios.get('/api/quizzes/myquizzes');
        setMyQuizzes(data);
      } catch (error) {
        console.error('Could not fetch quizzes', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyQuizzes();
  }, []);

  if (loading) {
    return <p>Loading your quizzes...</p>;
  }

  return (
    <div>
      <h1>My Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <Link to="/create" className="button">Create a New Quiz</Link>
      <h2 style={{marginTop: '30px'}}>My Quizzes</h2>
      {myQuizzes.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {myQuizzes.map((quiz) => (
            <li key={quiz._id} style={{ background: 'white', padding: '15px', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '5px' }}>
              <h3>{quiz.title}</h3>
              <p>{quiz.questions.length} questions</p>
              <Link to={`/quiz/${quiz._id}`} className="button">Take Quiz</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't created any quizzes yet.</p>
      )}
    </div>
  );
};

export default Dashboard;