import { apiClient } from './api';
import { authService } from './authService';

export const googleDriveService = {
  async getRecentFiles(pageSize = 10) {
    const token = authService.getToken();
    const response = await apiClient.get(`/google-drive/recent-files?pageSize=${pageSize}`, token);
    
    if (response.success && Array.isArray(response.files)) {
      return response.files;
    }
    
    return [];
  },

  async getFilesByType(mimeType) {
    const token = authService.getToken();
    const response = await apiClient.get(`/google-drive/files-by-type?mimeType=${encodeURIComponent(mimeType)}`, token);
    
    if (response.success && Array.isArray(response.files)) {
      return response.files;
    }
    
    return [];
  },

  async getStatus() {
    const token = authService.getToken();
    try {
      const response = await apiClient.get('/google-drive/status', token);
      return response;
    } catch (err) {
      return { connected: false };
    }
  },
};