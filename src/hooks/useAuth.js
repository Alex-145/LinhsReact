// src/hooks/useAuth.js
import {
  login,
  saveToken,
  removeToken,
  getToken,
  getCurrentUser,
} from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [tokenChecked, setTokenChecked] = useState(false);

  // Verificación inicial del token al montar el hook
  useEffect(() => {
    const verifyAndLoadUser = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (err) {
          console.error("Error al verificar token:", err);
          handleInvalidToken();
        }
      }
      setTokenChecked(true);
    };

    verifyAndLoadUser();
  }, []);

  // Verificación periódica del token (opcional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (getToken()) {
        verifyTokenSilently();
      }
    }, 5 * 60 * 1000); // Verifica cada 5 minutos

    return () => clearInterval(interval);
  }, []);

  const verifyTokenSilently = async () => {
    try {
      await getCurrentUser();
    } catch (err) {
      console.error("Token inválido (verificación silenciosa):", err);
      handleInvalidToken();
    }
  };

  const handleInvalidToken = () => {
    removeToken();
    setUser(null);
    // No navegamos automáticamente para evitar loops
  };

  const loginUser = async (username, password) => {
    setLoading(true);
    setError("");
    try {
      const token = await login(username, password);
      saveToken(token);
      const userData = await getCurrentUser();
      setUser(userData);
      setTokenChecked(true);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    removeToken();
    setUser(null);
    setTokenChecked(true);
    navigate("/login");
  };

  // Función para verificación explícita (usar en componentes protegidos)
  const verifyToken = async () => {
    if (!getToken()) {
      return { valid: false, shouldRedirect: true };
    }

    try {
      await getCurrentUser();
      return { valid: true };
    } catch (err) {
      handleInvalidToken();
      return { valid: false, shouldRedirect: true };
    }
  };

  return {
    loginUser,
    logoutUser,
    verifyToken,
    isLoading: loading,
    isAuthenticated: !!user && tokenChecked,
    tokenChecked,
    error,
    token: getToken(),
    user,
  };
};
