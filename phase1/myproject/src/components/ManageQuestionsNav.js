import React from 'react';
import './ManageQuestions.css'; 

const ManageQuestionsNav = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="logo"> Manage Questions</div>
        <ul className="menu">
          {/* Clicking these links updates the URL hash, triggering the modal or other content */}
          <li><a href="#new_questions">Create new question</a></li>
          <li><a href="#related">Related question</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default ManageQuestionsNav;
