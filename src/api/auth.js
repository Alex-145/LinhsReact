import axios from "axios";

const API_URL = "http://localhost:8080/users";

export const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/signin`, null, {
    params: { username, password },
  });
  return res.data; // token
};

export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data; // token
};
