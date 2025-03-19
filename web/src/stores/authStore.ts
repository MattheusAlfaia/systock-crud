import { ref } from 'vue';
import { defineStore } from 'pinia';
import httpClient from '@/plugins/httpClient';

httpClient.defaults.withCredentials = true;
httpClient.defaults.withXSRFToken = true;

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const isAuthenticated = ref<boolean>(!!token.value);
  const user = ref<any>(localStorage.getItem('user'));

  const getCsrfToken = async () => {
    const response = await httpClient.get('/sanctum/csrf-cookie');
    return response.data;
  }

  const login = async (credentials: { email: string; password: string }) => {
    try {
      await getCsrfToken();
      const response = await httpClient.post('/api/login', credentials);
      isAuthenticated.value = true;
      user.value = response.data.user;
      token.value = response.data.access_token;
      localStorage.setItem('token', token.value || '');
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('token');
    await httpClient.post('/api/logout');
  };

  return {
    token,
    isAuthenticated,
    user,
    login,
    logout,
  };
});