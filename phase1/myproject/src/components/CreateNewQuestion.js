import React from 'react';
import './CreateNewQuestion.css'; // Ensure you include this file for styling

const CreateNewQuestion = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Create New Question</h2>
        <form onSubmit={(e) => { e.preventDefault(); alert('Question submitted!'); onClose(); }}>
          <label htmlFor="questionDescription">Question Description:</label>
          <textarea id="questionDescription" name="questionDescription" required></textarea>

          <div className="options">
            <label>Option 1:</label>
            <input type="text" name="optionA" required />

            <label>Option 2:</label>
            <input type="text" name="optionB" required />

            <label>Option 3:</label>
            <input type="text" name="optionC" required />

            <label>Option 4:</label>
            <input type="text" name="optionD" required />
          </div>

          <label htmlFor="difficultyLevel">Difficulty Level:</label>
          <select id="difficultyLevel" name="difficultyLevel" required>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <label htmlFor="questionCategory">Category:</label>
          <select id="questionCategory" name="questionCategory" required>
            <option value="science">Scientific</option>
            <option value="history">Historical</option>
            <option value="literature">Literature</option>
          </select>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateNewQuestion;
