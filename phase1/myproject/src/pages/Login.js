import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

const Login = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.dataset.theme = !darkMode ? 'dark' : '';
  };

  const goToPlayerPage = () => {
    navigate('/player'); // Navigate to the Player page
  };

  const goToDesignerPage = () => {
    navigate('/designer'); // Navigate to the Designer page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="toggle-container">
        <input
          type="checkbox"
          id="dark-mode-toggle"
          checked={darkMode}
          onChange={handleToggleDarkMode}
        />
        <label htmlFor="dark-mode-toggle" className="toggle-label">
          <span className="toggle-slider"></span>
        </label>
      </div>

      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <div>
          <input type="checkbox" id="check" required />
          <label htmlFor="check">I'm not a robot</label>
        </div>

        <button type="button" onClick={goToPlayerPage}>
          Login as Player
        </button>
        <button type="button" onClick={goToDesignerPage}>
          Login as Designer
        </button>
      </form>
      <a href="#" className="signup-link">
        Don't have an account? Register here
      </a>
    </div>
  );
};

export default Login;
