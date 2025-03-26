import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

const apiClient = axios.create({
  baseURL: isProduction
    ? 'https://tedfawke.com/api'
    : 'http://localhost:8000/api',
  timeout: 10000,
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