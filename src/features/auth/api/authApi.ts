import axiosClient from '../../../shared/services/axiosClient';
import TokenManager from '../../../shared/services/tokenManager';
import { SignupData } from '../types';

export const loginApi = async (email: string, password: string) => {
  const response = await axiosClient.post('/auth/doctor/login', { email, password });
  
  // If login is successful, save tokens
  if (response.data && response.data.token) {
    await TokenManager.saveTokens({
      accessToken: response.data.token,
      refreshToken: response.data.refreshToken || response.data.token, // fallback if no separate refresh token
      role: response.data.role || 'doctor',
      email: response.data.email || email,
    });
  }
  
  return response.data;
};

export const signupApi = async (userData: SignupData) => {
  const response = await axiosClient.post('/auth/signup', userData);
  
  // If signup is successful and returns tokens, save them
  if (response.data && response.data.token) {
    await TokenManager.saveTokens({
      accessToken: response.data.token,
      refreshToken: response.data.refreshToken || response.data.token,
      role: response.data.role || 'doctor',
      email: response.data.email || userData.email,
    });
  }
  
  return response.data;
};

export const logoutApi = async () => {
  await TokenManager.logout();
};

export const refreshTokenApi = async () => {
  return await TokenManager.forceRefresh();
}; 