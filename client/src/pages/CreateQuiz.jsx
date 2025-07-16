import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '', image: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuestionChange = (index, event) => {
    const values = [...questions];
    values[index][event.target.name] = event.target.value;
    setQuestions(values);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const values = [...questions];
    values[qIndex].options[oIndex] = event.target.value;
    setQuestions(values);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '', image: '' }]);
  };

  const handleRemoveQuestion = (index) => {
    const values = [...questions];
    values.splice(index, 1);
    setQuestions(values);
  };
  
  const handleImageUpload = async (index, file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
        setLoading(true);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${user.token}`,
            },
        };
        const { data } = await axios.post('/api/quizzes/upload', formData, config);
        const values = [...questions];
        values[index].image = data.imageUrl;
        setQuestions(values);
    } catch (error) {
        console.error('Image upload failed', error);
        alert('Image could not be uploaded.');
    } finally {
        setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
        alert("Please enter a quiz title.");
        return;
    }
    setLoading(true);
    try {
      await axios.post('/api/quizzes', { title, questions });
      alert('Quiz created successfully!');
      navigate(`/dashboard`);
    } catch (error) {
      console.error('Error creating quiz', error);
      alert('Failed to create quiz.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>Quiz Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        {questions.map((question, qIndex) => (
          <div key={qIndex} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
            <h4>Question {qIndex + 1}</h4>
            <label>Question Text</label>
            <input
              type="text"
              name="questionText"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e)}
              required
            />

            <label>Image (Optional)</label>
            <input type="file" onChange={(e) => handleImageUpload(qIndex, e.target.files[0])} style={{marginBottom: '10px'}} />
            {question.image && <img src={question.image} alt="question" style={{width: '100px', height: '100px', objectFit: 'cover'}}/>}

            {question.options.map((option, oIndex) => (
              <div key={oIndex}>
                <label>Option {oIndex + 1}</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  required
                />
              </div>
            ))}
             <label>Correct Answer (enter the exact text of the correct option)</label>
             <input
              type="text"
              name="correctAnswer"
              value={question.correctAnswer}
              onChange={(e) => handleQuestionChange(qIndex, e)}
              required
            />
            <button type="button" onClick={() => handleRemoveQuestion(qIndex)} style={{backgroundColor: '#dc3545', marginTop: '10px'}}>Remove Question</button>
          </div>
        ))}
        
        <button type="button" onClick={handleAddQuestion} style={{marginRight: '10px'}}>Add Another Question</button>
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Quiz'}</button>
      </form>
    </div>
  );
};

export default CreateQuiz;