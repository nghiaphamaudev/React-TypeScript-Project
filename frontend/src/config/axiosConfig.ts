import axios from 'axios';

function getToken(): string | null {
  return localStorage.getItem('accessToken');
}

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: { Authorization: `Bearer ${getToken()}` },
});

export default axiosInstance;
