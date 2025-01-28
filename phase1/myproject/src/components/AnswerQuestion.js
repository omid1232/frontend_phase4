import React, { useState, useEffect } from 'react';
import './AnswerQuestion.css';

const AnswerQuestion = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchAnsweredQuestions = async () => {
      const playerId = localStorage.getItem('playerId');
      if (!playerId) return;

      try {
        const response = await fetch(`http://localhost:8080/api/players/${playerId}/answered-questions`);
        const data = await response.json();
        setAnsweredQuestionIds(data);
        console.log("Answered Questions:", data);
      } catch (error) {
        console.error("Error fetching answered questions:", error);
      }
    };

    fetchCategories();
    fetchAnsweredQuestions();
  }, []);

  const fetchQuestionsByCategory = async () => {
    if (!selectedCategory) {
      alert('Please select a category.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/questions/category/${selectedCategory}`);
      let data = await response.json();

      // Remove answered questions from the list
      data = data.filter(q => !answeredQuestionIds.includes(q.id));

      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions by category:', error);
    }
  };

  const fetchRandomUnansweredQuestion = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/questions/all');
      console.log("hi   kiiiir");
      let data = await response.json();

      // Filter out answered questions
      const unansweredQuestions = data.filter(q => !answeredQuestionIds.includes(q.id));

      if (unansweredQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
        setRandomQuestion(unansweredQuestions[randomIndex]);
      } else {
        setRandomQuestion(null); // No more questions left
      }
    } catch (error) {
      console.error('Error fetching random question:', error);
    }
  };

  const handleAnswerSubmit = async (questionId, difficulty) => {
    try {
      const playerId = localStorage.getItem('playerId'); // Assuming playerId is stored in localStorage
      const response = await fetch(`http://localhost:8080/api/players/${playerId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, yourAnswer:answer }),
      });
      const result = await response.json();

      if (response.ok) {
        const pointsEarned = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15;
        setFeedback(result.correct
          ? `✅ Correct! You earned ${pointsEarned} points.`
          : '❌ Incorrect! Try again!'
        );

        // Remove answered question from the list dynamically
        setQuestions(questions.filter(q => q.id !== questionId));
        setAnsweredQuestionIds([...answeredQuestionIds, questionId]);

        // Remove random question if it was the answered one
        if (randomQuestion && randomQuestion.id === questionId) {
          setRandomQuestion(null);
        }
      } else {
        setFeedback('Error submitting answer.');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="answer-question-container">
      <h2>Answer Questions</h2>

      {/* Answer by Category */}
      <div className="category-selection">
        <h3>Answer by Category</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button className="primary-btn" onClick={fetchQuestionsByCategory}>
          Fetch Questions
        </button>

        <ul className="question-list">
          {questions.map((q) => (
            <li key={q.id} className="question-card">
              <div className="question-text">{q.questionText}</div>
              <ul className="options-list">
                {q.options.map((option, index) => (
                  <li key={index} className="option-item">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                    {option}
                  </li>
                ))}
              </ul>
              <button className="submit-btn" onClick={() => handleAnswerSubmit(q.id, q.difficulty)}>Submit Answer</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Answer a Random Unanswered Question */}
      <div className="random-question-section">
        <h3>Answer a Random Question</h3>
        <button className="primary-btn" onClick={fetchRandomUnansweredQuestion}>
          Fetch Random Question
        </button>
        {randomQuestion ? (
          <div className="random-question">
            <p className="question-text">{randomQuestion.questionText}</p>
            <ul className="options-list">
              {randomQuestion.options.map((option, index) => (
                <li key={index} className="option-item">
                  <input
                    type="radio"
                    name="random-question"
                    value={option}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  {option}
                </li>
              ))}
            </ul>
            <button className="submit-btn" onClick={() => handleAnswerSubmit(randomQuestion.id, randomQuestion.difficulty)}>Submit Answer</button>
          </div>
        ) : (
          <p>No more unanswered questions available.</p>
        )}
      </div>

      {/* Feedback Section */}
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
};

export default AnswerQuestion;
