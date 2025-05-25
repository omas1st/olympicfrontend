import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

import Register from './pages/Register';
import Login from './pages/Login';
import VerifyPin from './pages/VerifyPin';
import SelectPlan from './pages/SelectPlan';
import CompleteIDCard from './pages/CompleteIDCard';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin'; // ✅ ADD THIS LINE

function App() {
  const { token, adminToken } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User routes */}
      <Route
        path="/verify-pin"
        element={token ? <VerifyPin /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/select-plan"
        element={token ? <SelectPlan /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/complete-idcard"
        element={token ? <CompleteIDCard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLogin />} /> {/* ✅ Updated this line */}
      <Route
        path="/admin/dashboard"
        element={adminToken ? <AdminDashboard /> : <Navigate to="/admin" replace />}
      />

      <Route path="*" element={<h2>404: Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
