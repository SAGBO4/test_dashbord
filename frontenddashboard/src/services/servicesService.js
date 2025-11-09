import { apiClient } from './api';
import { authService } from './authService';

export const servicesService = {
  async getAllServices() {
    const token = authService.getToken();
    return apiClient.get('/services', token);
  },

  async getServiceWidgets(serviceId) {
    const token = authService.getToken();
    return apiClient.get(`/widgets/service/${serviceId}`, token);
  },

  async activateService(serviceId) {
    const token = authService.getToken();
    return apiClient.post('/user-services', { serviceId }, token);
  },

  async deactivateService(serviceId) {
    const token = authService.getToken();
    return apiClient.delete(`/user-services/${serviceId}`, token);
  },

  async getUserServices() {
    const token = authService.getToken();
    return apiClient.get('/user-services', token);
  },
};