import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// This interceptor runs before every request
// It reads the token from localStorage and adds it to the header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;