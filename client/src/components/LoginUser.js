import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './LoginUser.css';

// Mock data for user login
const mockUserData = {
  email: 'user@example.com',
  password: 'password123',
  token: 'mock_user_token',
  role: 'user'
};

const LoginUser = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  const { login } = useAuth(); // Use Auth context

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Simulate login with mock data
    if (formData.email === mockUserData.email && formData.password === mockUserData.password) {
      login(mockUserData); // Set user in context and local storage
      setSuccess('Logged in successfully!');
      navigate('/myorders'); // Redirect to the My Orders page
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Log In</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default LoginUser;
