import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (role) => {
    const endpoint =
      role === 'player'
        ? 'http://localhost:8080/api/login/player'
        : 'http://localhost:8080/api/login/designer';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        console.log('Backend response:', data);

        // Save IDs
        if (role === 'designer') {
          localStorage.setItem('designerId', data.designerId);
        } else {
          console.log("kirsss");
          localStorage.setItem('playerId', data.playerId);
        }

        // ***** Save the JWT token *****
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        // Navigate to the dashboard
        navigate(`/${role}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  const handleRegister = async (role) => {
    // (No change needed unless your registration endpoint also returns a token)
    const endpoint =
      role === 'player'
        ? 'http://localhost:8080/api/login/register/player'
        : 'http://localhost:8080/api/login/register/designer';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const data = await response.json();
        alert(data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login or Register</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setError('');
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="button" onClick={() => handleLogin('player')}>
          Login as Player
        </button>
        <button type="button" onClick={() => handleLogin('designer')}>
          Login as Designer
        </button>

        <button type="button" onClick={() => handleRegister('player')}>
          Register as Player
        </button>
        <button type="button" onClick={() => handleRegister('designer')}>
          Register as Designer
        </button>
      </form>
    </div>
  );
};

export default Login;
