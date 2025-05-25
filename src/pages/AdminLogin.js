import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../contexts/AuthContext';
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate                = useNavigate();
  const { loginAdmin }          = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/admin/login', { email, password });
      loginAdmin(res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="adminlogin-page">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />
        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
}

export default AdminLogin;
