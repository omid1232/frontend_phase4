import React, { useState, useEffect, useRef } from 'react';
import './ManageQuestions.css';

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [isRelatedModalOpen, setIsRelatedModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const questionContainerRef = useRef(null);

  // State for creating a new question (formerly in CreateNewQuestion.js)
  const [questionData, setQuestionData] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    categoryId: '',
    difficulty: 'easy',
  });

  // --- Modal Controls ---
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openRelatedModal = () => setIsRelatedModalOpen(true);
  const closeRelatedModal = () => setIsRelatedModalOpen(false);

  // --- Fetch categories & questions on mount ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Fetch Categories
        const categoryRes = await fetch('http://localhost:8080/api/categories');
        const categoryData = await categoryRes.json();
        setCategories(categoryData);

        // 2) Fetch Designer's questions
        const designerId = localStorage.getItem('designerId');
        if (!designerId) {
          console.error('Designer ID not found in localStorage.');
          return;
        }
        const questionRes = await fetch(
          `http://localhost:8080/api/designers/${designerId}/questions`
        );
        const questionData = await questionRes.json();
        setQuestions(Array.isArray(questionData) ? questionData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // --- Map categoryId => categoryName ---
  const getCategoryName = (catId) => {
    const found = categories.find(
      (cat) => cat.id === catId || cat._id === catId || cat.name === catId
    );
    return found ? found.name : 'Unknown';
  };

  // --- Create new question: API call ---
  const handleCreateQuestion = async (newQuestion) => {
    const designerId = localStorage.getItem('designerId');
    if (!designerId) {
      console.error('Designer ID not found in localStorage.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/designers/${designerId}/questions/create`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newQuestion),
        }
      );
      if (!response.ok) {
        console.error('Failed to create question:', response.statusText);
        return;
      }
      const result = await response.json();
      setQuestions((prev) => [...prev, result]);
      closeModal();
    } catch (err) {
      console.error('Error creating question:', err);
    }
  };

  // --- Handle the final form submit in the "Create Question" modal ---
  const handleNewQuestionSubmit = (e) => {
    e.preventDefault();
    if (!questionData.correctAnswer) {
      alert('Please select a correct answer.');
      return;
    }
    if (!questionData.categoryId) {
      alert('Please select a category.');
      return;
    }
    // Call our API-creation function
    handleCreateQuestion(questionData);

    // Reset the form
    setQuestionData({
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      categoryId: '',
      difficulty: 'easy',
    });
  };

  // Handle option change in the create-question modal
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = value;
    setQuestionData({ ...questionData, options: updatedOptions });
  };

  // --- Fetch related questions by category ---
  const handleFetchRelatedQuestions = async () => {
    if (!selectedCategory) {
      alert('Please select a category first.');
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8080/api/questions/category/${selectedCategory}`
      );
      const data = await res.json();
      setRelatedQuestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching related questions:', err);
      setRelatedQuestions([]);
    }
  };

  return (
    <div className="manage-questions-page">
      {/* HEADER BAR */}
      <header className="mq-header">
        <h1 className="mq-title">Manage Questions</h1>
        <div className="mq-button-group">
          <button className="secondary-btn" onClick={openRelatedModal}>
            Related Questions
          </button>
          <button className="primary-btn" onClick={openModal}>
            Create New Question
          </button>
        </div>
      </header>

      {/* MAIN CONTENT: List of questions */}
      <div className="questions-container">
        <div className="questions-card" ref={questionContainerRef}>
          {questions.length === 0 ? (
            <p className="no-questions-msg">No questions found.</p>
          ) : (
            <ul className="questions-list">
              {questions.map((q) => (
                <li key={q.id} className="question-card">
                  <div className="q-header">
                    <div className="q-text">
                      <strong>Question:</strong> {q.questionText}
                    </div>
                    <div className="q-category">
                      <strong>Category:</strong> {getCategoryName(q.categoryId)}
                    </div>
                  </div>
                  <div className="q-options">
                    <strong>Options:</strong>
                    <ul>
                      {q.options?.map((option, idx) => (
                        <li key={idx} className={option === q.correctAnswer ? 'option correct' : 'option'}>
                          <span className="option-indicator" />
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* CREATE NEW QUESTION MODAL (Integrated) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2 className="create-modal-title">Create New Question</h2>
            <form className="modal-form" onSubmit={handleNewQuestionSubmit}>
              <div className="form-group">
                <label>Question Description:</label>
                <textarea
                  className="form-control"
                  value={questionData.questionText}
                  onChange={(e) =>
                    setQuestionData({ ...questionData, questionText: e.target.value })
                  }
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
                        onChange={(e) =>
                          setQuestionData({ ...questionData, correctAnswer: e.target.value })
                        }
                      />
                      Correct Answer
                    </label>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label>Difficulty Level:</label>
                <select
                  className="form-control"
                  value={questionData.difficulty}
                  onChange={(e) =>
                    setQuestionData({ ...questionData, difficulty: e.target.value })
                  }
                  required
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category:</label>
                <select
                  className="form-control"
                  value={questionData.categoryId}
                  onChange={(e) =>
                    setQuestionData({ ...questionData, categoryId: e.target.value })
                  }
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id || cat._id} value={cat.id || cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RELATED QUESTIONS MODAL */}
      {isRelatedModalOpen && (
        <div className="modal-overlay" onClick={closeRelatedModal}>
          <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeRelatedModal}>
              &times;
            </button>
            <h2>Related Questions</h2>

            <label htmlFor="relatedCategory">Select a Category:</label>
            <select
              id="relatedCategory"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                -- Choose --
              </option>
              {categories.map((cat) => (
                <option key={cat.id || cat._id} value={cat.id || cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button className="primary-btn fetch-btn" onClick={handleFetchRelatedQuestions}>
              Fetch
            </button>

            <div className="related-questions-results">
              {relatedQuestions.length === 0 ? (
                <p className="no-related-msg">No related questions found.</p>
              ) : (
                <ul>
                  {relatedQuestions.map((rq) => (
                    <li key={rq.id} className="related-q-item">
                      <strong>Question:</strong> {rq.questionText}
                      <div className="rq-options">
                        <strong>Options:</strong>
                        <ul>
                          {rq.options?.map((option, i) => {
                            const isCorrect = option === rq.correctAnswer;
                            return (
                              <li
                                key={i}
                                className={isCorrect ? 'option correct' : 'option'}
                              >
                                <span className="option-indicator" />
                                {option}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQuestions;
