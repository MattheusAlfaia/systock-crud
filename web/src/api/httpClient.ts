import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000, // Timeout padrão
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores (opcional)
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