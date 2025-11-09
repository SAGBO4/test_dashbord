import { apiClient } from './api';
import { authService } from './authService';

export const weatherService = {
  async getCurrentWeather(city, units = 'metric') {
    const token = authService.getToken();
    return apiClient.get(
      `/weather/current?city=${city}&units=${units}`,
      token
    );
  },

  async getForecast(city, days = 5, units = 'metric') {
    const token = authService.getToken();
    return apiClient.get(
      `/weather/forecast?city=${city}&days=${days}&units=${units}`,
      token
    );
  },
};