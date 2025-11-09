import { apiClient } from './api';
import { authService } from './authService';

export const gmailService = {
  async getStatus() {
    const token = authService.getToken();
    return apiClient.get('/gmail/status', token);
  },

  async getUnreadEmails(maxResults = 10) {
    const token = authService.getToken();
    return apiClient.get(`/gmail/unread?maxResults=${maxResults}`, token);
  },

  async getImportantEmails(maxResults = 10) {
    const token = authService.getToken();
    return apiClient.get(`/gmail/important?maxResults=${maxResults}`, token);
  },

  async getRecentEmails(maxResults = 10) {
    const token = authService.getToken();
    return apiClient.get(`/gmail/recent?maxResults=${maxResults}`, token);
  },
};