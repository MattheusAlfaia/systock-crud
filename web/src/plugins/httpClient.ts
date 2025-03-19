import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VUE_APP_API_URL || 'http://localhost:8000',
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "X-Requested-with": "XMLHttpRequest",
  },
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

httpClient.interceptors.request.use((config) => {
  // Adicionar token de autenticação, por exemplo
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratar erros globais
    if (error.response.status === 401) {
      // Redirecionar para login, por exemplo
    }
    return Promise.reject(error);
  },
);

export default httpClient;