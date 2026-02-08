import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axiosInstance";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "donor" | "admin";
  pic : string | null
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User | null, token: string | null) => void;
  setUpdateAuth: (user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      // login or initial auth set
      setAuth: (user, token) => {
        set({ user, token });
      },

      setUpdateAuth: (user: User) => {
        set({ user });
      },

      refreshUser: async () => {
        try {
          const res = await api.get("/auth/users/profile");
          const user = res?.data?.data;

          if (!user) {
            get().logout(); // user deleted → logout
          } else {
            // update user even if role is pending
            get().setUpdateAuth(user);
          }
        } catch (err: any) {
          // only logout if 401 / token invalid
          if (err.response?.status === 401) get().logout();
        }
      },

      // logout
      logout: async () => {
        toast.success("সফলভাবে লগআউট হয়েছে");
        await new Promise((resolve) => setTimeout(resolve, 700));
        set({ user: null, token: null });
        localStorage.removeItem("auth-storage");
        window.location.replace("/auth/login");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }), // persist only these
    }
  )
);
