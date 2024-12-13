// src/pages/Designer.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import LogoutButton from '../components/LogoutButton';
import './Designer.css';

const Designer = () => {
  const navigate = useNavigate(); 

  const links = [
    { text: 'Manage Questions', href: '/manage_questions' },
    { text: 'Manage Categories', href: '/manage_categories' }, // Ensure this link is correct
  ];

  const handleManageCategories = () => {
    navigate('/manage_categories'); 
  };

  return (
    <div className="designer-page">
      <Header title="Question Designer" />
      <div className="container">
        <Navigation links={links} />
        <div className="content">
          <h2>Question Designer Page</h2>
          <p>
            Here you can manage questions for the game and view player performance.
            Use the menu on the left to navigate to other sections of the site.
          </p>
          {/* Add the button to navigate to Manage Categories */}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Designer;
