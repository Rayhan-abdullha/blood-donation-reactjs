// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  role?: "user" | "admin" | "donor" | null
}

export const ProtectedRoute = ({ children, role = null, }: Props) => {
  const { token, user } = useAuthStore();

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="*" />;
  }

  return children;
};