import React from 'react';

const CurrentQuestion = ({ question, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = e.target.answer.value.trim();
    if (answer) {
      onSubmit(answer);
      e.target.reset();
    }
  };

  return (
    <div className="current-question">
      <h3>Current Question</h3>
      <p>{question}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="answer" placeholder="Type your answer here" required />
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
};

export default CurrentQuestion;
