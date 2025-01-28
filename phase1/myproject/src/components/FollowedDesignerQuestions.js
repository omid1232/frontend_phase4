import React, { useState, useEffect } from "react";
import "./FollowedDesignerQuestions.css";

const FollowedDesignerQuestions = () => {
  const [followedDesigners, setFollowedDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const playerId = localStorage.getItem("playerId"); // Fetch playerId from localStorage

  useEffect(() => {
    const fetchFollowedDesigners = async () => {
      if (!playerId) {
        console.error("Player ID not found in localStorage.");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:8080/api/players/${playerId}/followed-designers`
        );
        const data = await response.json();
        setFollowedDesigners(data);
      } catch (error) {
        console.error("Error fetching followed designers:", error);
      }
    };

    fetchFollowedDesigners();
  }, [playerId]);

  const fetchQuestionsByDesigner = async () => {
    if (!selectedDesigner) {
      alert("Please select a designer.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/designers/${selectedDesigner}/questions`
      );
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions by designer:", error);
    }
  };

  const handleAnswerSubmit = async (questionId, answer) => {
    try {
      if (!playerId) {
        console.error("Player ID not found in localStorage.");
        return;
      }
      const response = await fetch(
        `http://localhost:8080/api/players/${playerId}/answer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId, yourAnswer: answer }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert(result.correct ? "Correct Answer!" : "Wrong Answer.");
        // Refresh the answered questions list
        setAnsweredQuestions((prev) => [...prev, questionId]);
      } else {
        alert("Error submitting answer.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  // Filter out already answered questions
  const unansweredQuestions = questions.filter(
    (q) => !answeredQuestions.includes(q.id)
  );

  return (
    <div className="followed-designer-questions-container">
      <h3>Questions from Followed Designers</h3>
      <div className="designer-selection">
        <label htmlFor="designerDropdown">Select a Designer:</label>
        <select
          id="designerDropdown"
          value={selectedDesigner}
          onChange={(e) => setSelectedDesigner(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            Choose a designer
          </option>
          {followedDesigners.map((designer) => (
            <option key={designer.id} value={designer.id}>
              {designer.name}
            </option>
          ))}
        </select>
        <button onClick={fetchQuestionsByDesigner} className="primary-btn">
          Fetch Questions
        </button>
      </div>

      <ul className="question-list">
        {unansweredQuestions.map((q) => (
          <li key={q.id}>
            <div>
              <strong>Question:</strong> {q.questionText}
            </div>
            <ul>
              {q.options.map((option, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    onChange={(e) =>
                      handleAnswerSubmit(q.id, e.target.value)
                    }
                  />
                  {option}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowedDesignerQuestions;
