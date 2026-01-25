import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1', // আপনার Golang সার্ভারের URL
});

// রিকোয়েস্ট পাঠানোর আগে অটোমেটিক টোকেন যোগ করবে
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;