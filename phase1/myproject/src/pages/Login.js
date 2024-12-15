import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

const Login = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.dataset.theme = !darkMode ? 'dark' : '';
  };

  const handleLogin = async (role) => {
    const endpoint = role === 'player' ? 'http://localhost:3001/api/login/player' : 'http://localhost:3001/api/login/designer';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message
        navigate(`/${role}`); // Navigate to the appropriate page
      } else {
        const error = await response.json();
        setError(error.error); // Display error message
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again.');
    }
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

      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form submission
          setError(''); // Clear previous error
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div>
          <input type="checkbox" id="check" required />
          <label htmlFor="check">I'm not a robot</label>
        </div>

        {error && <p className="error-message">{error}</p>} {/* Display error */}

        <button type="button" onClick={() => handleLogin('player')}>
          Login as Player
        </button>
        <button type="button" onClick={() => handleLogin('designer')}>
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
