// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const { loginUser, loginAdmin } = useContext(AuthContext);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email, password
      });

      // Admin
      if (res.data.isAdmin) {
        loginAdmin(res.data.token);
        navigate('/admin/dashboard');
        return;
      }

      // Regular user
      const { token, status } = res.data;

      if (status === 'completed') {
        // Fully approved — redirect straight to VIP page
        window.location.href = 'https://sites.google.com/view/olympic-vip/home';
        return;
      }

      // Otherwise, store token and go through registration flow
      loginUser(token, status);
      navigate('/verify-pin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>New user? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
