import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import LogoutButton from '../components/LogoutButton';
import './player.css';

const Player = () => {
  const links = [
    { text: 'Home', href: '/' },          // Redirects to login page for now
    { text: 'Play Game', href: '/play_game' },     // Temporarily points to login page
    { text: 'Scoreboard', href: '/scoreboard' },    // Temporarily points to login page
  ];

  return (
    <div className="player-page">
      <Header title="Player Dashboard" />
      <div className="container">
        <Navigation links={links} />
        <div className="content">
          <h2>Welcome back</h2>
          <p>You can access the game, see your old games, and also see the Scoreboard.</p>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Player;
