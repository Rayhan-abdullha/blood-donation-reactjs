import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: any | null;
  token: string | null;
  setAuth: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        set({ user, token });
      },
      logout: async () => {
        toast.success("সফলভাবে লগআউট হয়েছে");
        await new Promise(resolve => setTimeout(resolve, 700));
        set({ user: null, token: null });
        setTimeout(() => {
          localStorage.removeItem('auth-storage'); // ক্লিনআপ
          window.location.replace("/auth/login");
          window.location.reload();
        }, 200);
      },
    }),
    { name: 'auth-storage' } // এটি ডাটা লোকাল স্টোরেজে সেভ রাখবে
  )
);