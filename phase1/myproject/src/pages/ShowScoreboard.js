import React from 'react';
import './scoreboard.css';
import './player.css';
import Scoreboard from '../components/Scoreboard'; // Ensure path is correct

const ShowScoreboard = () => {
  const players = [
    { name: 'Player1', score: 5000 },
    { name: 'Player2', score: 4500 },
    { name: 'Player3', score: 4200 },
    // Add more players as needed
  ];

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
        <h2>Scoreboard</h2>
        <Scoreboard players={players} />
      </div>
    </div>
  );
};

export default ShowScoreboard;
