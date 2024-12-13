import React, { useState } from 'react';
import CreateNewQuestion from '../components/CreateNewQuestion';
import './ManageQuestions.css';

const ManageQuestions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        <h1>Welcome to the Manage Questions Page</h1>
        <p>
          Here you can create and manage questions for your quiz or assessment. Click the "Create new question"
          button above to get started, or view related questions.
        </p>
        <a href="/Designer" className="main-menu-link">Main Menu</a>
      </div>

      {/* Modal Component */}
      <CreateNewQuestion isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ManageQuestions;
