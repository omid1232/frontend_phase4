import React from 'react';

const Scoreboard = ({ players }) => {
  // Sort players by score in descending order for ranking
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <table className="score-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {sortedPlayers.map((player, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{player.name}</td>
            <td>{player.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Scoreboard;
