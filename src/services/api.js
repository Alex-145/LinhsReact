// src/services/api.js
import axios from "axios";
import { getToken, removeToken } from "./authService";

const api = axios.create({
  baseURL: "http://192.168.1.2:8080/",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirigir a login si el token es inválido
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
