import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateQuiz = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      imageUrl: ''
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingImages, setUploadingImages] = useState({});
  const renderCount = useRef(0);
  const [isStable, setIsStable] = useState(false);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`CreateQuiz render #${renderCount.current}`);
    
    const timer = setTimeout(() => {
      setIsStable(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleImageUpload = async (questionIndex, file) => {
    if (!file) return;

    // Set uploading state
    setUploadingImages(prev => ({ ...prev, [questionIndex]: true }));
    
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('/api/quizzes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`
        }
      });

      // Update question with image URL
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].imageUrl = response.data.imageUrl;
      setQuestions(updatedQuestions);
      
      setMessage(`✅ Image uploaded for question ${questionIndex + 1}`);
    } catch (error) {
      console.error('Image upload failed:', error);
      setMessage('❌ Image upload failed. Using URL input instead.');
    } finally {
      setUploadingImages(prev => ({ ...prev, [questionIndex]: false }));
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      imageUrl: ''
    }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    }
  };

  const validateQuiz = () => {
    if (!title.trim()) {
      setMessage('❌ Please enter a quiz title');
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      
      if (!q.questionText.trim()) {
        setMessage(`❌ Please enter text for question ${i + 1}`);
        return false;
      }

      if (q.options.some(opt => !opt.trim())) {
        setMessage(`❌ Please fill all options for question ${i + 1}`);
        return false;
      }

      if (!q.correctAnswer.trim()) {
        setMessage(`❌ Please select correct answer for question ${i + 1}`);
        return false;
      }

      if (!q.options.includes(q.correctAnswer)) {
        setMessage(`❌ Correct answer must match one of the options for question ${i + 1}`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateQuiz()) return;

    setLoading(true);
    setMessage('🔄 Creating quiz...');

    try {
      const quizData = {
        title: title.trim(),
        questions: questions.map(q => ({
          questionText: q.questionText.trim(),
          options: q.options.map(opt => opt.trim()),
          correctAnswer: q.correctAnswer.trim(),
          image: q.imageUrl.trim() || undefined
        }))
      };

      console.log('Creating quiz:', quizData);

      const response = await axios.post('/api/quizzes', quizData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      console.log('Quiz created successfully:', response.data);
      setMessage('✅ Quiz created successfully! Redirecting...');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error creating quiz:', error);
      if (error.response) {
        setMessage(`❌ Server error: ${error.response.data.message || 'Unknown error'}`);
      } else {
        setMessage('❌ Failed to create quiz. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isStable) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '20px' }}>
        <h3>❌ Please log in first</h3>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        background: 'white', 
        padding: '30px', 
        borderRadius: '12px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '30px', 
          color: '#333',
          fontSize: '2.5rem'
        }}>
          Create a New Quiz ✨
        </h1>

        {/* User Info */}
        <div style={{ 
          background: '#e8f4fd', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <strong>Welcome, {user.name}!</strong><br/>
          <small>Creating quiz as: {user.email}</small>
        </div>

        {message && (
          <div style={{
            background: message.includes('✅') ? '#d4edda' : '#f8d7da',
            color: message.includes('✅') ? '#155724' : '#721c24',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Quiz Title */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: '#333'
            }}>
              Quiz Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your quiz title..."
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          {/* Questions */}
          {questions.map((question, qIndex) => (
            <div key={qIndex} style={{ 
              border: '2px solid #e0e0e0', 
              padding: '25px', 
              borderRadius: '12px', 
              marginBottom: '20px',
              backgroundColor: '#f9f9f9'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px' 
              }}>
                <h3 style={{ margin: 0, color: '#333' }}>
                  Question {qIndex + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  disabled={questions.length === 1}
                  style={{
                    background: questions.length === 1 ? '#ccc' : '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: questions.length === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  🗑️ Remove
                </button>
              </div>

              {/* Question Text */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Question Text *
                </label>
                <textarea
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                  placeholder="Enter your question here..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  required
                />
              </div>

              {/* Image Upload */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Question Image (Optional)
                </label>
                
                <div style={{ marginBottom: '10px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(qIndex, e.target.files[0])}
                    style={{ marginBottom: '10px' }}
                    disabled={uploadingImages[qIndex]}
                  />
                  {uploadingImages[qIndex] && <span>⏳ Uploading...</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Or enter image URL:</span>
                  <input
                    type="url"
                    value={question.imageUrl}
                    onChange={(e) => handleQuestionChange(qIndex, 'imageUrl', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {question.imageUrl && (
                  <div style={{ marginTop: '10px' }}>
                    <img 
                      src={question.imageUrl} 
                      alt="Question preview" 
                      style={{ 
                        maxWidth: '200px', 
                        maxHeight: '200px', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #ddd'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        setMessage('❌ Failed to load image. Please check the URL.');
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Answer Options */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '12px', 
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Answer Options *
                </label>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} style={{ marginBottom: '10px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '5px', 
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      Option {oIndex + 1}
                    </label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      placeholder={`Enter option ${oIndex + 1}...`}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '15px',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Correct Answer */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Correct Answer *
                </label>
                <select
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: 'white'
                  }}
                  required
                >
                  <option value="">Select the correct answer</option>
                  {question.options.map((option, oIndex) => (
                    <option key={oIndex} value={option}>
                      {option || `Option ${oIndex + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'center',
            marginTop: '30px'
          }}>
            <button
              type="button"
              onClick={addQuestion}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              ➕ Add Question
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
            >
              {loading ? '🔄 Creating...' : '✨ Create Quiz'}
            </button>
          </div>
        </form>

        {/* Summary */}
        <div style={{ 
          marginTop: '30px', 
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h4>📊 Quiz Summary:</h4>
          <p><strong>Title:</strong> {title || 'Not set'}</p>
          <p><strong>Questions:</strong> {questions.length}</p>
          <p><strong>Questions with images:</strong> {questions.filter(q => q.imageUrl).length}</p>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;