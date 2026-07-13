import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/auth',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
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
