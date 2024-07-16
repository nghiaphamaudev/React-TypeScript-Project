import axios from 'axios';

function getToken(): string | null {
  return localStorage.getItem('accessToken');
}

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = getToken()
      ? `Bearer ${getToken()}`
      : undefined;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
