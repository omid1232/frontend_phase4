import React, { useState, useEffect } from 'react';
import './scoreboard.css';
import './player.css';
import Scoreboard from '../components/Scoreboard';

const ShowScoreboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchScoreboard = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/scoreboard/');
        const data = await response.json();
        setPlayers(data);
        console.log("hello")
      } catch (error) {
        console.error('Error fetching scoreboard:', error);
      }
    };

    fetchScoreboard();
  }, []);

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
