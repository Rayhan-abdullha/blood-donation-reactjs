// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  adminOnly?: boolean; // অ্যাডমিন চেক করার জন্য নতুন প্রপ
}

export const ProtectedRoute = ({ children, adminOnly = false }: Props) => {
  const { token, user } = useAuthStore();
  // ১. লগইন না থাকলে অথ পেজে পাঠান
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // ২. যদি শুধুমাত্র অ্যাডমিনদের জন্য হয় কিন্তু ইউজার অ্যাডমিন না হয়
  if (adminOnly && user?.role === "user") {
    return <Navigate to="/" replace />; // হোমে পাঠিয়ে দিন
  }

  return children;
};