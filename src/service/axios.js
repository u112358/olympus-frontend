import axios from 'axios';
import router from '../router'; // 确保你的项目中有正确的 router 配置

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

axiosInstance.interceptors.response.use(response => response, async error => {
  if (error.response && error.response.status === 403 && error.config && !error.config.__isRetryRequest) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken })
        localStorage.setItem('accessToken', res.data.access);
        error.config.headers['Authorization'] = `Bearer ${res.data.access}`;
        error.config.__isRetryRequest = true;
        return axiosInstance(error.config);
      } catch (refreshError) {
        if (refreshError.response && refreshError.response.status === 403) {
          router.push('/login');
        }
        return Promise.reject(refreshError);
      }
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;
