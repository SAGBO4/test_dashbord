import { apiClient } from './api';
import { authService } from './authService';

export const calendarService = {
  async getUpcomingEvents(maxResults = 10) {
    const token = authService.getToken();
    return apiClient.get(`/calendar/upcoming?max=${maxResults}`, token);
  },

  async getTodayEvents() {
    const token = authService.getToken();
    return apiClient.get('/calendar/today', token);
  },

  async getBirthdays(daysRange = 7) {
    const token = authService.getToken();
    return apiClient.get(`/calendar/birthdays?days=${daysRange}`, token);
  },

  async getStatus() {
    const token = authService.getToken();
    try {
      // Try to get upcoming events to check if calendar is connected
      await this.getUpcomingEvents(1);
      return { connected: true };
    } catch (err) {
      return { connected: false };
    }
  },
};
