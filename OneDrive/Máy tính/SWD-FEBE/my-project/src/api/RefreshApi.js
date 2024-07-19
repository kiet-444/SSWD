import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = `https://baitapdeploy-production.up.railway.app/`;
const navigate = useNavigate();
const refreshToken = async () => {
  const token = localStorage.getItem('refreshToken');
  const response = await axios.post('staffsRouter/refreshToken', { token });
  if (response?.data?.success) {
    const newAccessToken = response?.data?.accessToken;
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } else {
    throw new Error('Unable to refresh token');
  }
};

// Request interceptor
axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/auth/');
      }
    }
    return Promise.reject(error);
  }
);
