import React, { useState, useEffect } from 'react';
import CreateNewQuestion from '../components/CreateNewQuestion';
import './ManageQuestions.css';

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [isRelatedModalOpen, setIsRelatedModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openRelatedModal = () => setIsRelatedModalOpen(true);
  const closeRelatedModal = () => setIsRelatedModalOpen(false);

  // Fetch categories and questions
  useEffect(() => {
    const fetchCategoriesAndQuestions = async () => {
      try {
        // Fetch categories
        const categoryResponse = await fetch('http://localhost:8080/api/categories');
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);

        // Fetch questions
        const designerId = localStorage.getItem('designerId');
        if (!designerId) {
          console.error('Designer ID not found in localStorage.');
          return;
        }
        const questionResponse = await fetch(`http://localhost:8080/api/designers/${designerId}/questions`);
        const questionData = await questionResponse.json();
        setQuestions(Array.isArray(questionData) ? questionData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategoriesAndQuestions();
  }, []);

  // Map categoryId to categoryName
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.name === categoryId);
    return category ? category.name : 'Unknown';
  };

  // Fetch related questions by category
  const handleFetchRelatedQuestions = async () => {
    if (!selectedCategory) {
      alert('Please select a category.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/questions/category/${selectedCategory}`);
      const data = await response.json();
      console.log('Related Questions Response:', data);
      setRelatedQuestions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching related questions:', error);
      setRelatedQuestions([]);
    }
  };

  // Add a new question
  const handleCreateQuestion = async (newQuestion) => {
    const designerId = localStorage.getItem('designerId');
    if (!designerId) {
      console.error('Designer ID not found in localStorage.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/designers/${designerId}/questions/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        const result = await response.json();
        setQuestions((prev) => [...prev, result]);
        closeModal();
      } else {
        console.error('Failed to create question:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <div>
      <nav>
        <div>
          <div className="title">Manage Questions</div>
          <ul>
            <li>
              <button onClick={openModal}>Create New Question</button>
            </li>
            <li>
              <button onClick={openRelatedModal}>Related Questions</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="content-container">
        <h1>Manage Questions</h1>
        <ul>
          {Array.isArray(questions) &&
            questions.map((q) => (
              <li key={q.id} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong>Question:</strong> {q.questionText}
                  </div>
                  <div>
                    <strong>Category:</strong>{' '}
                    <span style={{ fontStyle: 'italic', color: '#555' }}>
                      {getCategoryName(q.categoryId)}
                    </span>
                  </div>
                </div>
                <div>
                  <strong>Options:</strong>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {q.options?.map((option, index) => (
                      <li
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '8px',
                        }}
                      >
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: option === q.correctAnswer ? 'blue' : 'transparent',
                            marginRight: '8px',
                            border: '1px solid blue',
                          }}
                        ></span>
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
        </ul>

        <a href="/Designer" className="main-menu-link">
          Main Menu
        </a>
      </div>

      <CreateNewQuestion isOpen={isModalOpen} onClose={closeModal} onSubmit={handleCreateQuestion} />

      {/* Related Questions Modal */}
      {isRelatedModalOpen && (
        <div>
          <div className="modal-backdrop" onClick={closeRelatedModal}></div>
          <div className="modal-content">
            <button className="close-button" onClick={closeRelatedModal}>
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
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button onClick={handleFetchRelatedQuestions}>Fetch Related Questions</button>

            <div style={{ marginTop: '20px' }}>
              <strong>Results:</strong>
              <ul className="related-questions-list">
                {Array.isArray(relatedQuestions) &&
                  relatedQuestions.map((q) => (
                    <li key={q.id}>
                      <div>
                        <strong>Question:</strong> {q.questionText}
                      </div>
                      <div>
                        <strong>Options:</strong>
                        <ul>
                          {q.options?.map((option, index) => (
                            <li
                              key={index}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '8px',
                              }}
                            >
                              <span
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  backgroundColor: option === q.correctAnswer ? 'blue' : 'transparent',
                                  marginRight: '8px',
                                  border: '1px solid blue',
                                }}
                              ></span>
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQuestions;
