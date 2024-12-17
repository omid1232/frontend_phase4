import React, { useEffect, useState } from 'react';
import './scoreboard.css';

const Scoreboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/scoreboard');
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching scoreboard:', error);
      }
    };

    fetchTopPlayers();
  }, []);

  return (
    <div className="scoreboard-container">
      <h2>Top Players</h2>
      <table className="score-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player._id}>
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
