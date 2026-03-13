import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize error format
    if (error.response?.data?.detail) {
      return Promise.reject(error.response.data.detail);
    }
    return Promise.reject({
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
);

export default api;
