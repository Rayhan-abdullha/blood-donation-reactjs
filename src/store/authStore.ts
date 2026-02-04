import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axiosInstance";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "donor" | "admin";
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
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
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        set({ user, token });
      },

      // only update user info (role upgrade, profile change)
      setUpdateAuth: (user: User) => {
        localStorage.setItem("user", JSON.stringify(user));
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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.replace("/auth/login");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }), // persist only these
    }
  )
);
