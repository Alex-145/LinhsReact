import axios from "axios";
import api from "./api";

const API_URL = "/users";

export async function login(username, password) {
  const response = await axios.post(
    `http://192.168.1.2:8080${API_URL}/signin`,
    new URLSearchParams({ username, password }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const token = response.data.token; // ✅ Extraemos solo el token del JSON
  if (!token) throw new Error("Credenciales inválidas");

  saveToken(token);
  return token;
}

export async function register(data) {
  const response = await api.post(`${API_URL}/signup`, data);
  const token = response.data.token;
  saveToken(token);
  return token;
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export async function getCurrentUser() {
  const token = getToken();
  const response = await api.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
