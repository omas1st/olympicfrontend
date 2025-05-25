import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [data, setData] = useState({ name:'', email:'', phone:'', country:'', password:'' });
  const { loginUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await API.post('/users/register', data);
    loginUser(res.data.token, res.data.status);
    nav('/verify-pin');
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {['name','email','phone','country','password'].map(f=>(
          <div key={f}>
            <label>{f.charAt(0).toUpperCase()+f.slice(1)}</label>
            <input
              type={f==='password'?'password':'text'}
              value={data[f]}
              onChange={e=>setData({...data,[f]:e.target.value})}
              required
            />
          </div>
        ))}
        <button type="submit">Register</button>
        <p>Already have account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
