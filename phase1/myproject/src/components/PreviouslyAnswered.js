import React from 'react';

const PreviouslyAnswered = ({ answeredQuestions }) => {
  return (
    <div className="answered-questions">
      <h3>Previously Answered Questions</h3>
      <table className="answered-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {answeredQuestions.map((q, index) => (
            <tr key={index}>
              <td>{q.question}</td>
              <td>{q.yourAnswer}</td>
              <td>{q.correctAnswer}</td>
              <td className={q.isCorrect ? 'correct' : 'incorrect'}>
                {q.isCorrect ? 'Correct' : 'Incorrect'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const answeredQuestionsData = [
    {
      question: "What is the capital of Germany?",
      yourAnswer: "Berlin",
      correctAnswer: "Berlin",
      isCorrect: true
    },
    {
      question: "What is the largest planet in our solar system?",
      yourAnswer: "Saturn",
      correctAnswer: "Jupiter",
      isCorrect: false
    }
  ];
  
export default PreviouslyAnswered;
