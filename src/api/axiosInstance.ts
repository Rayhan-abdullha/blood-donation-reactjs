
const production = "https://blood-donation-go-api.onrender.com/api/v1";
// const development = "http://localhost:4000/api/v1";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: production,
  
});

// ===== Request interceptor =====
api.interceptors.request.use((config) => {

  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ===== Response interceptor =====
api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
      // ❌ token invalid / expired
      useAuthStore.getState().logout();

      // optional redirect
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
