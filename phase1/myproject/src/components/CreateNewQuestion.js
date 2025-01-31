import React, { useState, useEffect } from 'react';
import './CreateNewQuestion.css'; // Ensure this file is included for styling

const CreateNewQuestion = ({ isOpen, onClose, onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [questionData, setQuestionData] = useState({
    questionText: '',
    options: ['', '', '', ''], // Four options
    correctAnswer: '',
    categoryId: '',
    difficulty: 'easy',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://backend-app:8080/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = value;
    setQuestionData({ ...questionData, options: updatedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the question data for debugging
    console.log('Submitting Question Data:', questionData);

    if (!questionData.correctAnswer) {
      alert('Please select a correct answer.');
      return;
    }
    if (!questionData.categoryId) {
      alert('Please select a category.');
      return;
    }
    onSubmit(questionData);
    setQuestionData({
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      categoryId: '',
      difficulty: 'easy',
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Create New Question</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="questionText">Question Description:</label>
            <textarea
              id="questionText"
              className="form-control"
              value={questionData.questionText}
              onChange={(e) => setQuestionData({ ...questionData, questionText: e.target.value })}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Options:</label>
            {questionData.options.map((option, index) => (
              <div key={index} className="option-item">
                <input
                  type="text"
                  className="option-input"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
                <label className="correct-label">
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={option}
                    checked={questionData.correctAnswer === option}
                    onChange={(e) => setQuestionData({ ...questionData, correctAnswer: e.target.value })}
                  />
                  Correct Answer
                </label>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="difficultyLevel">Difficulty Level:</label>
            <select
              id="difficultyLevel"
              className="form-control"
              value={questionData.difficulty}
              onChange={(e) => setQuestionData({ ...questionData, difficulty: e.target.value })}
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="questionCategory">Category:</label>
            <select
              id="questionCategory"
              className="form-control"
              value={questionData.categoryId}
              onChange={(e) => setQuestionData({ ...questionData, categoryId: e.target.value })}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNewQuestion;
