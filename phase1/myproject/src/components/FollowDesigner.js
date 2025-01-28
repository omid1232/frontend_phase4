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
      const response = await fetch(`http://localhost:8080/api/players/${playerId}/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designerId }),
      });

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
      const response = await fetch(`http://localhost:8080/api/designers/${designerId}/questions`);
      const questions = await response.json();
      setSelectedDesigner(designerName);
      setSelectedDesignerQuestions(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div className="follow-designer-container">
      <h2>Follow Designers</h2>
      <ul>
        {designers.map((designer) => (
          <li key={designer.id} className="designer-item">
            <span>{designer.username}</span>
            <button
              className={`follow-button ${
                followedDesignerIds.includes(designer.id) ? "followed" : ""
              }`}
              disabled={followedDesignerIds.includes(designer.id)}
              onClick={() => handleFollow(designer.id)}
            >
              {followedDesignerIds.includes(designer.id) ? "Followed" : "Follow"}
            </button>
            {followedDesignerIds.includes(designer.id) && (
              <button
                className="view-questions-button"
                onClick={() => handleFetchQuestions(designer.id, designer.username)}
              >
                View Questions
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Show questions of the selected designer */}
      {selectedDesigner && (
        <div className="designer-questions">
          <h3>Questions by {selectedDesigner}</h3>
          <ul>
            {selectedDesignerQuestions.length > 0 ? (
              selectedDesignerQuestions.map((question) => (
                <li key={question.id} className="question-item">
                  <p>
                    <strong>Question:</strong> {question.questionText}
                  </p>
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index} className="question-option">
                        <span
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor:
                              option === question.correctAnswer ? "blue" : "transparent",
                            marginRight: "8px",
                            border: "1px solid blue",
                            display: "inline-block",
                          }}
                        ></span>
                        {option}
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <p>No questions available from this designer.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FollowDesigner;
