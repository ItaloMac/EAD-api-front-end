import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export const Api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para adicionar o token em todas as requisições
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

