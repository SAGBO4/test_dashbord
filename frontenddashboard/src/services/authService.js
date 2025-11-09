import { apiClient } from './api';

export const authService = {
  // login
  async login(email, password) {
    const data = await apiClient.post('/auth/login', { email, password });
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // register
  async register(email, username, password, passwordConfirmation) {
    const data = await apiClient.post('/auth/register', {
      email,
      username,
      password,
      passwordConfirmation,
    });
    
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // get token
  getToken() {
    return localStorage.getItem('token');
  },

  // check if logged in
  isAuthenticated() {
    return !!this.getToken();
  },

  // google OAuth
  loginWithGoogle() {
    window.location.href = 'http://localhost:3000/auth/google';
  },
};
