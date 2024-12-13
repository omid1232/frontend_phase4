import React, { useState } from 'react';
import CurrentQuestion from '../components/CurrentQuestion';
import PreviouslyAnswered from '../components/PreviouslyAnswered';
import './PlayGame.css'; // Ensure player.css is in the same directory or adjust the path

const PlayGame = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState([
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
  ]);

  const currentQuestion = "What is the capital of France?";

  const handleSubmitAnswer = (answer) => {
    // Here you would normally check the answer against the correct answer
    // For demo purposes, let's say "Paris" is correct:
    const isCorrect = (answer.toLowerCase() === "paris");
    const newEntry = {
      question: currentQuestion,
      yourAnswer: answer,
      correctAnswer: "Paris",
      isCorrect: isCorrect
    };
    setAnsweredQuestions([...answeredQuestions, newEntry]);
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
        <h2>Play Game</h2>
        <CurrentQuestion question={currentQuestion} onSubmit={handleSubmitAnswer} />
        <PreviouslyAnswered answeredQuestions={answeredQuestions} />
      </div>
    </div>
  );
};

export default PlayGame;
