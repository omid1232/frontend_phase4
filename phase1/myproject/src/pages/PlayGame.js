import React, { useState, useEffect } from 'react';
import Navigation from "../components/Navigation";
import PreviouslyAnswered from '../components/PreviouslyAnswered';
import './PlayGame.css';

const PlayGame = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const playerId = localStorage.getItem('playerId');

  useEffect(() => {
    const fetchAnsweredQuestions = async () => {
      try {
        // IMPORTANT: Hit the *new* endpoint we just added in QuestionController
        const response = await fetch(`http://localhost:8080/api/questions/answered_by_player/${playerId}`);
        const data = await response.json();
        console.log(data);
        setAnsweredQuestions(data);
      } catch (error) {
        console.error('Error fetching answered questions:', error);
      }
    };

    fetchAnsweredQuestions();
  }, [playerId]);

  const links = [
    { text: "Home", href: "/player" },
    { text: "Answered questions", href: "/answered" },
    { text: "Scoreboard", href: "/scoreboard" },
  ];

  return (
    <div className="container">
      <Navigation links={links} />
      <div className="content">
        {/* <h2>Welcome, {playerId || 'Player'}!</h2> */}
        {/* Display the answered questions table */}
        <PreviouslyAnswered answeredQuestions={answeredQuestions} />
      </div>
    </div>
  );
};

export default PlayGame;
