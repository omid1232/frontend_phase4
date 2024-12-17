import React, { useState, useEffect } from 'react';
import CurrentQuestion from '../components/CurrentQuestion';
import PreviouslyAnswered from '../components/PreviouslyAnswered';

const PlayGame = () => {
  const [categories, setCategories] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const playerId = localStorage.getItem('playerUsername'); // Get actual username

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAnsweredQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/play_game/answered_questions?playerId=${playerId}`
        );
        const data = await response.json();
        setAnsweredQuestions(data);
      } catch (error) {
        console.error('Error fetching answered questions:', error);
      }
    };

    fetchAnsweredQuestions();
  }, [playerId]);

  const fetchRandomQuestion = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/play_game/current_question?categoryId=${categoryId}`
      );
      const data = await response.json();
      setCurrentQuestion(data);
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const submitAnswer = async (answer) => {
    try {
      const response = await fetch('http://localhost:3001/api/play_game/submit_answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId, // Use actual username
          questionId: currentQuestion.questionId,
          answer,
        }),
      });

      const result = await response.json();
      setAnsweredQuestions([...answeredQuestions, result.result]);

      fetchRandomQuestion(selectedCategory);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="container">
      <nav className="vertical-menu">
        <a href="/player">Home</a>
        <a href="/play_game">Play Game</a>
        <a href="/scoreboard">Scoreboard</a>
        <div className="logout-btn">
          <a href="/">Logout</a>
        </div>
      </nav>

      <div className="content">
        <h2>Welcome, {playerId || 'Player'}!</h2>
        <h3>Play Game</h3>
        {!selectedCategory ? (
          <div>
            <h3>Select a Category</h3>
            {categories.map((category) => (
              <button key={category._id} onClick={() => fetchRandomQuestion(category._id)}>
                {category.name}
              </button>
            ))}
          </div>
        ) : (
          currentQuestion && <CurrentQuestion question={currentQuestion} onSubmit={submitAnswer} />
        )}
        <PreviouslyAnswered answeredQuestions={answeredQuestions} />
      </div>
    </div>
  );
};

export default PlayGame;
