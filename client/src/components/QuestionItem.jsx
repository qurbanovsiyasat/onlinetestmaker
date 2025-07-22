import React from 'react';

const QuestionItem = ({ 
  question, 
  index, 
  selectedAnswer, 
  onAnswerChange, 
  showResult = false, 
  isCorrect = false 
}) => {
  const handleAnswerChange = (answer) => {
    if (onAnswerChange) {
      onAnswerChange(index, answer);
    }
  };

  const getOptionStyle = (option) => {
    if (!showResult) {
      return {
        margin: '5px 0',
        padding: '8px',
        backgroundColor: selectedAnswer === option ? '#e3f2fd' : '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer'
      };
    }

    // Show results styling
    let backgroundColor = '#fff';
    if (option === question.correctAnswer) {
      backgroundColor = '#d4edda'; // Green for correct
    } else if (selectedAnswer === option && option !== question.correctAnswer) {
      backgroundColor = '#f8d7da'; // Red for incorrect selection
    }

    return {
      margin: '5px 0',
      padding: '8px',
      backgroundColor,
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'default'
    };
  };

  return (
    <div style={{ 
      marginBottom: '20px', 
      background: '#fff', 
      padding: '20px', 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h4 style={{ marginBottom: '15px' }}>
        {index + 1}. {question.questionText}
      </h4>
      
      {question.image && (
        <img 
          src={question.image} 
          alt="Question visual" 
          style={{ 
            maxWidth: '300px', 
            marginBottom: '15px', 
            borderRadius: '5px',
            display: 'block'
          }}
        />
      )}

      <div>
        {question.options.map((option, oIndex) => (
          <div key={oIndex} style={getOptionStyle(option)}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: showResult ? 'default' : 'pointer'
            }}>
              <input
                type="radio"
                name={`question_${index}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerChange(option)}
                disabled={showResult}
                style={{ marginRight: '10px' }}
              />
              <span>{option}</span>
              {showResult && option === question.correctAnswer && (
                <span style={{ 
                  marginLeft: '10px', 
                  color: '#28a745', 
                  fontWeight: 'bold' 
                }}>
                  ✓ Correct
                </span>
              )}
            </label>
          </div>
        ))}
      </div>

      {showResult && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <strong>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </strong>
          {!isCorrect && (
            <span> The correct answer was: <strong>{question.correctAnswer}</strong></span>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionItem;