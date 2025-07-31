import axios from 'axios';
import { API_BASE_URL } from '../constants/app';
import TokenManager from './tokenManager';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include JWT token if available
axiosClient.interceptors.request.use(
  async (config) => {
    // Initialize TokenManager if not already done
    await TokenManager.initialize();
    
    // Get valid access token (will refresh if needed)
    const token = await TokenManager.getValidAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for global error handling
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If we get 401 and haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const newToken = await TokenManager.forceRefresh();
        
        if (newToken) {
          // Retry the original request with new token
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
      }
      
      // If refresh failed, logout user
      await TokenManager.logout();
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
