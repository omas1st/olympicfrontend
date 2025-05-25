import React, { useState, useEffect } from 'react';
import API from '../api';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    API.get('/admin/users').then(res => setUsers(res.data));
  }, []);

  const search = async () => {
    const res = query
      ? await API.get(`/admin/search?email=${query}`)
      : await API.get('/admin/users');
    setUsers(res.data);
  };

  const approve = async (id, step) => {
    await API.post('/admin/approve', { userId: id, step });
    const res = await API.get('/admin/users');
    setUsers(res.data);
  };

  const setPin = async id => {
    const pin = prompt('Enter 5-digit PIN for user:');
    if (pin) {
      await API.post('/admin/set-pin', { userId: id, pin });
      await approve(id, 'pin');
    }
  };

  return (
    <div className="admindash-page">
      <h2>Admin Dashboard</h2>
      <input
        placeholder="Search by email"
        value={query}
        onChange={e=>setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Plan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u=>(
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.status}</td>
              <td>{u.plan || '-'}</td>
              <td>
                <button onClick={()=>setPin(u._id)}>Set PIN</button>
                <button onClick={()=>approve(u._id, 'plan')}>Approve Plan</button>
                <button onClick={()=>approve(u._id, 'idcard')}>Approve ID</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
