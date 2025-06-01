import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const { loginUser, loginAdmin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await API.post('/users/login', {
        email, 
        password
      });

      // Admin login
      if (res.data.isAdmin) {
        loginAdmin(res.data.token);
        navigate('/admin/dashboard');
        return;
      }

      // Regular user
      const { token, status } = res.data;

      if (status === 'completed') {
        window.location.href = 'https://sites.google.com/view/olympic-vip/home';
        return;
      }

      loginUser(token, status);
      navigate('/verify-pin');
    } catch (err) {
      let errorMessage = 'Login failed. Please check your credentials';
      
      // Handle specific error cases
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = err.response.data.message || 'Invalid credentials';
        } else {
          errorMessage = err.response.data.message || 'Login failed. Please try again.';
        }
      }
      
      setError(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Login</button>
      </form>
      
      <p className="register-link">New user? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
