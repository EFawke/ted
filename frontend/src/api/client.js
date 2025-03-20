// Frontend: src/api/client.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Your backend API base URL
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add JWT to every request automatically
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;