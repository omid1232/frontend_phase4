import React, { useState, useEffect } from 'react';
import CreateNewQuestion from '../components/CreateNewQuestion';
import './ManageQuestions.css';

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch all questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Add a new question
  const handleCreateQuestion = async (newQuestion) => {
    try {
      const response = await fetch('http://localhost:3001/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion),
      });

      const result = await response.json();
      setQuestions([...questions, result.question]);
      closeModal();
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav>
        <div>
          <div className="title">Manage Questions</div>
          <ul>
            <li><button onClick={openModal}>Create new question</button></li>
            <li><a href="#related">Related question</a></li>
          </ul>
        </div>
      </nav>

      {/* Main content area */}
      <div className="content-container">
        <h1>Manage Questions</h1>
        <ul>
          {questions.map((q) => (
            <li key={q.id}>{q.questionText}</li>
          ))}
        </ul>
        <a href="/Designer" className="main-menu-link">Main Menu</a>
      </div>

      {/* Modal Component */}
      <CreateNewQuestion isOpen={isModalOpen} onClose={closeModal} onSubmit={handleCreateQuestion} />
    </div>
  );
};

export default ManageQuestions;
