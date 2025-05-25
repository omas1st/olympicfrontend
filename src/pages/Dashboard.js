import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  return (
    <div className="dashboard-page">
      <h2>Welcome to VIP Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
