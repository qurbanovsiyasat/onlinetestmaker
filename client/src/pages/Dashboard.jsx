import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMyQuizzes();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchMyQuizzes = async () => {
    try {
      console.log('Fetching quizzes for user:', user.email);
      
      const response = await axios.get('/api/quizzes/myquizzes', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      
      console.log('User quizzes loaded:', response.data);
      setMyQuizzes(response.data || []);
      setError('');
    } catch (error) {
      console.error('Error loading quizzes:', error);
      setError('Failed to load your quizzes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await axios.delete(`/api/quizzes/${quizId}`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        setMyQuizzes(myQuizzes.filter(quiz => quiz._id !== quizId));
        alert('Quiz deleted successfully!');
      } catch (error) {
        console.error('Error deleting quiz:', error);
        alert('Failed to delete quiz');
      }
    }
  };

  if (!user) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Please log in to access your dashboard</h2>
        <Link to="/login" style={{ 
          background: '#007bff', 
          color: 'white', 
          padding: '10px 20px', 
          textDecoration: 'none', 
          borderRadius: '5px' 
        }}>
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>
          Welcome back, {user.name}! 👋
        </h1>
        <p style={{ margin: '0', fontSize: '1.2rem', opacity: '0.9' }}>
          Ready to manage your quizzes?
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <Link 
          to="/create" 
          style={{
            background: '#28a745',
            color: 'white',
            padding: '25px',
            borderRadius: '8px',
            textDecoration: 'none',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <h3 style={{ margin: '0 0 10px 0' }}>+ Create New Quiz</h3>
          <p style={{ margin: '0', opacity: '0.9' }}>Build your next quiz</p>
        </Link>

        <div style={{
          background: '#17a2b8',
          color: 'white',
          padding: '25px',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>📊 Your Stats</h3>
          <p style={{ margin: '0', opacity: '0.9' }}>
            {myQuizzes.length} quiz{myQuizzes.length !== 1 ? 'es' : ''} created
          </p>
        </div>

        {user.role === 'admin' && (
          <Link 
            to="/admin" 
            style={{
              background: '#dc3545',
              color: 'white',
              padding: '25px',
              borderRadius: '8px',
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 10px 0' }}>⚙️ Admin Panel</h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Manage system</p>
          </Link>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <strong>Error:</strong> {error}
          <button 
            onClick={fetchMyQuizzes}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '3px',
              marginLeft: '10px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>⏳ Loading your quizzes...</h3>
          <p>Please wait while we fetch your data.</p>
        </div>
      )}

      {/* Quizzes Section */}
      {!loading && (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0, color: '#333' }}>
              My Quizzes ({myQuizzes.length})
            </h2>
            <button 
              onClick={fetchMyQuizzes}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🔄 Refresh
            </button>
          </div>
          
          {myQuizzes.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gap: '20px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
            }}>
              {myQuizzes.map((quiz) => (
                <div 
                  key={quiz._id} 
                  style={{ 
                    background: 'white', 
                    padding: '25px', 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <h3 style={{ 
                    margin: '0 0 15px 0', 
                    color: '#333',
                    fontSize: '1.3rem'
                  }}>
                    {quiz.title}
                  </h3>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '15px',
                    color: '#666'
                  }}>
                    <span>📝 {quiz.questions?.length || 0} questions</span>
                    <span>📅 {new Date(quiz.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '10px',
                    flexWrap: 'wrap'
                  }}>
                    <Link 
                      to={`/quiz/${quiz._id}`} 
                      style={{
                        background: '#007bff',
                        color: 'white',
                        padding: '8px 16px',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        transition: 'background 0.2s'
                      }}
                    >
                      📋 Take Quiz
                    </Link>
                    
                    <button 
                      onClick={() => {
                        const url = `${window.location.origin}/quiz/${quiz._id}`;
                        navigator.clipboard.writeText(url);
                        alert('Quiz link copied to clipboard!');
                      }}
                      style={{
                        background: '#28a745',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    >
                      🔗 Copy Link
                    </button>
                    
                    <button 
                      onClick={() => handleDeleteQuiz(quiz._id)}
                      style={{
                        background: '#dc3545',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 20px',
              background: 'white',
              borderRadius: '12px',
              border: '2px dashed #e0e0e0'
            }}>
              <h3 style={{ color: '#666', marginBottom: '15px' }}>
                No quizzes yet! 📝
              </h3>
              <p style={{ color: '#999', marginBottom: '25px' }}>
                Create your first quiz to get started
              </p>
              <Link 
                to="/create" 
                style={{
                  background: '#007bff',
                  color: 'white',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  display: 'inline-block',
                  transition: 'background 0.2s'
                }}
              >
                ✨ Create Your First Quiz
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Success Message */}
      {myQuizzes.length > 0 && !loading && (
        <div style={{ 
          marginTop: '30px', 
          padding: '20px',
          background: '#d4edda',
          borderRadius: '8px',
          border: '1px solid #c3e6cb',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>
            🎉 Great job! Your quizzes are working perfectly!
          </h4>
          <p style={{ margin: 0, color: '#155724' }}>
            You can now take your quizzes, share them with others, or create new ones.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;