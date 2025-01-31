import React, { useEffect, useState } from 'react';
import './scoreboard.css';
import Navigation from "../components/Navigation";


const Scoreboard = () => {
    const links = [
      { text: "Home", href: "/player" },
      { text: "Answered questions", href: "/answered" },
      { text: "Scoreboard", href: "/scoreboard" },
    ];
  const [players, setPlayers] = useState([]);
  console.log('players ->', players)

  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        const response = await fetch('http://backend-app:8080/api/players/getSortedPlayers');
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
      <div className="navigation">
          <Navigation links={links} />
      </div>
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
