import React, { useState } from 'react';

const QuizForm = ({ onSubmit, initialData = null, isEditing = false }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [questions, setQuestions] = useState(initialData?.questions || [
    { questionText: '', options: ['', '', '', ''], correctAnswer: '', image: '' },
  ]);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a quiz title.");
      return;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        alert(`Please enter text for question ${i + 1}`);
        return;
      }
      if (!q.correctAnswer.trim()) {
        alert(`Please enter the correct answer for question ${i + 1}`);
        return;
      }
      if (q.options.some(opt => !opt.trim())) {
        alert(`Please fill all options for question ${i + 1}`);
        return;
      }
    }

    setLoading(true);
    try {
      await onSubmit({ title, questions });
    } catch (error) {
      console.error('Error submitting quiz', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <label>Quiz Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ width: '100%' }}
        />
      </div>

      {questions.map((question, qIndex) => (
        <div key={qIndex} style={{ 
          border: '1px solid #ccc', 
          padding: '15px', 
          borderRadius: '5px', 
          marginBottom: '15px',
          backgroundColor: '#f9f9f9'
        }}>
          <h4>Question {qIndex + 1}</h4>
          <label>Question Text</label>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(qIndex, e)}
            required
            style={{ width: '100%' }}
          />

          <label>Image URL (Optional)</label>
          <input
            type="url"
            name="image"
            value={question.image}
            onChange={(e) => handleQuestionChange(qIndex, e)}
            placeholder="https://example.com/image.jpg"
            style={{ width: '100%' }}
          />
          {question.image && (
            <img 
              src={question.image} 
              alt="Question visual" 
              style={{ 
                width: '100px', 
                height: '100px', 
                objectFit: 'cover',
                marginTop: '10px',
                borderRadius: '5px'
              }}
            />
          )}

          <div style={{ marginTop: '10px' }}>
            <label>Options:</label>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} style={{ marginBottom: '5px' }}>
                <label style={{ display: 'block', fontSize: '14px' }}>Option {oIndex + 1}</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  required
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>Correct Answer</label>
            <select
              name="correctAnswer"
              value={question.correctAnswer}
              onChange={(e) => handleQuestionChange(qIndex, e)}
              required
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">Select the correct answer</option>
              {question.options.map((option, oIndex) => (
                <option key={oIndex} value={option}>
                  {option || `Option ${oIndex + 1}`}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="button" 
            onClick={() => handleRemoveQuestion(qIndex)} 
            style={{ 
              backgroundColor: '#dc3545', 
              marginTop: '10px',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
            disabled={questions.length === 1}
          >
            Remove Question
          </button>
        </div>
      ))}
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          type="button" 
          onClick={handleAddQuestion} 
          style={{ 
            marginRight: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Another Question
        </button>
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Saving...' : (isEditing ? 'Update Quiz' : 'Create Quiz')}
        </button>
      </div>
    </form>
  );
};

export default QuizForm;