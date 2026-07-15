import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh logic later if needed
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // You can handle global errors here like 401 Unauthorized
    return Promise.reject(error.response?.data || { message: 'An unexpected error occurred' });
  }
);

export default api;
