// src/pages/Designer.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import LogoutButton from '../components/LogoutButton';
import './Designer.css';

const Designer = () => {
  const navigate = useNavigate();

  // Links to display in sidebar navigation
  const links = [
    { text: 'Manage Questions', href: '/manage_questions' },
    { text: 'Manage Categories', href: '/manage_categories' },
  ];

  const handleManageCategories = () => {
    navigate('/manage_categories');
  };

  return (
    <div className="player-page">
      {/* Optional global header */}
      {/* <Header title="Question Designer" /> */}

      <div className="main-container">
        {/* SIDEBAR */}
        <Navigation links={links} />

        {/* MAIN CONTENT AREA */}
        <main className="content-area">
          <h2 className="welcome-title">Welcome, Designer!</h2>
          <p className="welcome-subtitle">
            This is your dashboard for creating and organizing questions.
          </p>

          <div className="sections-container">
            {/* Card 1: Manage Questions */}
            <div className="card">
              <h3 className="section-title">Manage Questions</h3>
              <p>
                Create new quiz questions, edit existing ones, or remove obsolete questions.
                You can also define correct answers, difficulty levels, and more.
              </p>
              <p>
                <strong>Tip:</strong> Keep questions short and clear, and include multiple-choice options for the best player experience.
              </p>
            </div>

            {/* Card 2: Manage Categories */}
            <div className="card">
              <h3 className="section-title">Manage Categories</h3>
              <p>
                Organize your questions into categories such as <em>Science</em>, <em>Sports</em>,
                <em> History</em>, or custom groupings. This helps players navigate quizzes easily.
              </p>
              <p>
                <strong>Tip:</strong> Keep categories general enough to group related topics, but detailed enough to guide players.
              </p>
              {/* Example button that goes to Manage Categories */}
              <button className="follow-btn" onClick={handleManageCategories}>
                Go to Category Manager
              </button>
            </div>

            {/* Card 3: Designer Tips & Tools */}
            <div className="card">
              <h3 className="section-title">Designer Tools & Tips</h3>
              <p>
                Track performance, analyze statistics, and discover which questions are most or
                least answered correctly. These insights will help you refine your quizzes.
              </p>
              <p>
                <strong>Pro Tip:</strong> Regularly update older questions to keep the quiz fresh and engaging.
              </p>
            </div>
          </div>

          {/* Logout Button at the bottom */}
          <div style={{ marginTop: '2rem' }}>
            <LogoutButton />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Designer;
