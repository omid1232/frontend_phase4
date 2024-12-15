import React, { useState, useEffect } from 'react';
import CurrentQuestion from '../components/CurrentQuestion';
import PreviouslyAnswered from '../components/PreviouslyAnswered';
import './PlayGame.css';

const PlayGame = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // For previously answered questions
  const [currentQuestion, setCurrentQuestion] = useState(''); // For the current question

  // Fetch previously answered questions and the current question from the backend
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const answeredResponse = await fetch('http://localhost:3001/api/play_game/answered_questions');
        const answeredData = await answeredResponse.json();
        setAnsweredQuestions(answeredData);
        console.log(answeredData)

        const questionResponse = await fetch('http://localhost:3001/api/play_game/current_question');
        const questionData = await questionResponse.json();
        setCurrentQuestion(questionData.question);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGameData();
  }, []);

  // Submit an answer to the backend
  const handleSubmitAnswer = async (answer) => {
    try {
      const response = await fetch('http://localhost:3001/api/play_game/submit_answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer })
      });

      const result = await response.json();

      // Add the submitted question to the list of answered questions
      const newEntry = {
        question: currentQuestion,
        yourAnswer: answer,
        correctAnswer: result.correctAnswer,
        isCorrect: result.isCorrect
      };

      setAnsweredQuestions([...answeredQuestions, newEntry]);

      // Fetch the next question
      if (result.nextQuestion) {
        setCurrentQuestion(result.nextQuestion);
      }
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
        <h2>Play Game</h2>
        <CurrentQuestion question={currentQuestion} onSubmit={handleSubmitAnswer} />
        <PreviouslyAnswered answeredQuestions={answeredQuestions} />
      </div>
    </div>
  );
};

export default PlayGame;
