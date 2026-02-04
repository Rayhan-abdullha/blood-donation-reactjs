import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  role?: "user" | "admin" | "donor" | null
}

export const ProtectedRoute = ({ children, role = null, }: Props) => {
  const { user, token } = useAuthStore();

    if (!token || !user) return <Navigate to="/auth/login" replace />;

    if (role && user.role !== role) return <Navigate to="/not-found" replace />;

    return children;
};

 // faching a issues like , i was profile page, i was already logged in , but issues is suddendly admin removed me from db, so if i want to go profile age, i did not go there, redirect notfound page