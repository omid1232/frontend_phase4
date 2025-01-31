import React, { useState, useEffect } from "react";
import "./FollowDesigner.css";

const FollowDesigner = () => {
  const [designers, setDesigners] = useState([]);
  const [followedDesignerIds, setFollowedDesignerIds] = useState([]);
  const [selectedDesignerQuestions, setSelectedDesignerQuestions] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState(null);

  const playerId = localStorage.getItem("playerId");

  useEffect(() => {
    const fetchData = async () => {
      if (!playerId) {
        console.error("Player ID not found in localStorage.");
        return;
      }

      try {
        // Fetch all designers
        const designerResponse = await fetch("http://localhost:8080/api/designers");
        const designerData = await designerResponse.json();
        setDesigners(designerData);

        // Fetch followed designers for the player
        const followedResponse = await fetch(`http://localhost:8080/api/players/${playerId}`);
        const playerData = await followedResponse.json();
        setFollowedDesignerIds(playerData.followedDesignerIds || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [playerId]);

  const handleFollow = async (designerId) => {
    if (!playerId) {
      console.error("Player ID not found in localStorage.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/players/${playerId}/follow`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ designerId }),
        }
      );

      if (response.ok) {
        setFollowedDesignerIds((prev) => [...prev, designerId]);
      } else {
        const errorData = await response.json();
        console.error("Failed to follow designer:", errorData.message);
      }
    } catch (error) {
      console.error("Error following designer:", error);
    }
  };

  const handleFetchQuestions = async (designerId, designerName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/designers/${designerId}/questions`
      );
      const questions = await response.json();
      setSelectedDesigner(designerName);
      setSelectedDesignerQuestions(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div className="follow-designer-section">
      <h3 className="section-heading">Follow Designers</h3>

      <ul className="designer-list">
        {designers.map((designer) => {
          const isFollowed = followedDesignerIds.includes(designer.id);
          return (
            <li key={designer.id} className="designer-card">
              <div className="designer-info">
                <span className="designer-name">{designer.username}</span>
                <div className="designer-actions">
                  <button
                    className={`follow-button ${isFollowed ? "followed" : ""}`}
                    disabled={isFollowed}
                    onClick={() => handleFollow(designer.id)}
                  >
                    {isFollowed ? "Followed" : "Follow"}
                  </button>
                  {isFollowed && (
                    <button
                      className="view-questions-button"
                      onClick={() =>
                        handleFetchQuestions(designer.id, designer.username)
                      }
                    >
                      View Questions
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Display questions from the selected designer */}
      {selectedDesigner && (
        <div className="designer-questions">
          <h4 className="questions-heading">
            Questions by <span className="selected-designer">{selectedDesigner}</span>
          </h4>
          {selectedDesignerQuestions.length > 0 ? (
            <ul className="question-list">
              {selectedDesignerQuestions.map((question) => (
                <li key={question.id} className="question-item">
                  <p className="question-text">
                    <strong>Question:</strong> {question.questionText}
                  </p>
                  <ul className="option-list">
                    {question.options.map((option, index) => {
                      const isCorrect = option === question.correctAnswer;
                      return (
                        <li key={index} className="question-option">
                          <span
                            className={`option-bullet ${isCorrect ? "correct" : ""}`}
                          ></span>
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available from this designer.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowDesigner;
