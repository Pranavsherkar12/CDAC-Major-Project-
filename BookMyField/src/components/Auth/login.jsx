import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import apiClient from '../../apiClient'; 
import './login.css';
import { Footer } from '../../Home';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Validation functions
  const validateUsername = (username) => {
    return username.length >= 3; 
  };

  const validatePassword = (password) => {
    return password.length >= 8; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for username validation
    if (!validateUsername(username)) {
      setErrorMessage('Username must be at least 3 characters long.');
      toast.error('Invalid username.');
      return;
    }

    // Check for password validation
    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long.');
      toast.error('Invalid password.');
      return;
    }

    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const { token, role } = response.data; 
        localStorage.setItem('authToken', token); 
        localStorage.setItem('userRole', role); 

        setErrorMessage('');
        onLogin(); // Update the login state

        // Redirect to appropriate dashboard
        if (role === 'ADMIN') {
          navigate('/admin-dashboard'); 
        } else {
          navigate('/user-home'); 
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); 
        toast.error(error.response.data.message); 
      } else {
        setErrorMessage('Invalid username or password.');
        toast.error('Invalid username or password.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <button type="submit">Login</button>
        </form>
      </div>

      < Footer />
    </div>
  );
}

export default Login;
