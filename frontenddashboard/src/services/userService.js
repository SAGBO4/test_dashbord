import { apiClient } from './api';
import { authService } from './authService';

export const userService = {
  async getProfile() {
    const token = authService.getToken();
    return apiClient.get('/auth/me', token);
  },

  async updateProfile(data) {
    const token = authService.getToken();
    return apiClient.put('/auth/profile', data, token);
  },

  async deleteAccount() {
    const token = authService.getToken();
    return apiClient.delete('/auth/account', token);
  },
};