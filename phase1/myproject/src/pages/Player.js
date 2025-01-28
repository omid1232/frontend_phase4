import React from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import LogoutButton from "../components/LogoutButton";
import FollowDesigner from "../components/FollowDesigner";
import AnswerQuestions from "../components/AnswerQuestion";
import FollowedDesignerQuestions from '../components/FollowedDesignerQuestions';
import "./player.css";

const Player = () => {
  const links = [
    { text: "Home", href: "/" },
    { text: "Play Game", href: "/play_game" },
    { text: "Scoreboard", href: "/scoreboard" },
  ];

  return (
    <div className="player-page">
      <Header title="Player Dashboard" />

      <div className="container">
        {/* Left Side: Navigation */}
        <div className="navigation">
          <Navigation links={links} />
        </div>

        {/* Main Content */}
        <div className="content">
          <h2>Welcome back, Player!</h2>
          <p>Select an action below to continue:</p>

          <div className="main-sections">
            {/* Answer Questions Section */}
            <div className="answer-questions-container">
              <AnswerQuestions />
            </div>

            {/* Follow Designers Section */}
            <div className="follow-designer-container">
              <FollowDesigner />
            </div>
          </div>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Player;
