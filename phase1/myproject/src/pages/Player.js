import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import FollowDesigner from "../components/FollowDesigner";
import AnswerQuestions from "../components/AnswerQuestion";
import "./player.css";

const Player = () => {
  const links = [
    { text: "Home", href: "/player" },
    { text: "Answered questions", href: "/answered" },
    { text: "Scoreboard", href: "/scoreboard" },
  ];

  const playerId = localStorage.getItem("playerId");
  const [player, setPlayer] = useState(null);
  const questionContainerRef = useRef(null);

  // Fetch Player Details (username, etc.)
  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        if (!playerId) return;
        const response = await fetch(`http://backend-app:8080/api/players/${playerId}`);
        const data = await response.json();
        setPlayer(data);
      } catch (error) {
        console.error("Error fetching player details:", error);
      }
    };

    fetchPlayerDetails();
  }, [playerId]);

  // Scroll to the top when questions are loaded
  const handleScrollToTop = () => {
    if (questionContainerRef.current) {
      questionContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="player-page">
      <div className="main-container">
        {/* Sidebar Navigation */}
        <Navigation links={links} />

        {/* Main Content Area */}
        <main className="content-area">
          <h2 className="welcome-title">
            Welcome back, {player?.username || "Player"}!
          </h2>

          <section className="sections-container">
            {/* Answer Questions */}
            <AnswerQuestions onQuestionsLoaded={handleScrollToTop} />

            {/* Follow Designers */}
            <div className="follow-container" ref={questionContainerRef}>
              <FollowDesigner onQuestionsLoaded={handleScrollToTop} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Player;
