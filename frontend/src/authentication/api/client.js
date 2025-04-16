import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

const apiClient = axios.create({
  baseURL: isProduction
    ? 'https://tedfawke.com/auth'
    : 'http://localhost:8000/auth',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;