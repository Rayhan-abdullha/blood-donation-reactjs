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
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('auth-storage'); // ক্লিনআপ
        // reload and replace to "/auth/login"
        window.location.replace("/auth/login");
        window.location.reload();
      },
    }),
    { name: 'auth-storage' } // এটি ডাটা লোকাল স্টোরেজে সেভ রাখবে
  )
);