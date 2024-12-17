import React from 'react';

const CurrentQuestion = ({ question, onSubmit }) => {
  const handleSubmit = (option) => {
    onSubmit(option);
  };

  return (
    <div className="current-question">
      <h3>{question.question}</h3>
      {question.options.map((option, index) => (
        <button key={index} onClick={() => handleSubmit(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default CurrentQuestion;
