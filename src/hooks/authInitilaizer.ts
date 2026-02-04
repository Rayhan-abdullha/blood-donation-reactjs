import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";

export const AuthInitializer = () => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const { token, refreshUser } = useAuthStore.getState();
    if (!token) return;

    refreshUser();
  }, []);

  return null;
};
