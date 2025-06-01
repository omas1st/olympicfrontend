import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [data, setData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    country: '', 
    password: '' 
  });
  
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  
  const { loginUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});
    setFormError('');
    
    try {
      const res = await API.post('/users/register', data);
      loginUser(res.data.token, res.data.status);
      nav('/verify-pin');
    } catch (err) {
      if (err.response?.data?.errors) {
        // Field-specific errors
        const newErrors = {};
        err.response.data.errors.forEach(error => {
          newErrors[error.path] = error.msg;
        });
        setErrors(newErrors);
      } else {
        // General error
        setFormError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        
        {formError && <div className="error-message">{formError}</div>}
        
        {['name','email','phone','country','password'].map(field => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              value={data[field]}
              onChange={e => setData({...data, [field]: e.target.value})}
              className={errors[field] ? 'error-input' : ''}
              required
              // Allow any characters for phone number
              {...(field === 'phone' ? { pattern: ".*", title: "Any characters allowed" } : {})}
            />
            {errors[field] && <div className="field-error">{errors[field]}</div>}
          </div>
        ))}
        
        <button type="submit">Register</button>
        <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
