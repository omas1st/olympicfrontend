// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // now points to https://olympicplatform.vercel.app/api
});

// Attach JWT: prefer adminToken for admin routes, otherwise use user token
API.interceptors.request.use(config => {
  const url = config.url || '';
  const isAdminRoute = url.startsWith('/admin/');
  const token = isAdminRoute
    ? localStorage.getItem('adminToken')
    : localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
