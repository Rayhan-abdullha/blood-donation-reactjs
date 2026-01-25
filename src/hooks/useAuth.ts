import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import api from "../api/axiosInstance";

export const useAuthActions = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  // ১. রেজিস্ট্রেশন
  const registerUser = useMutation({
    mutationFn: async (data: any) => (await api.post("/auth/register", data)).data,
    onSuccess: () => toast.success("OTP পাঠানো হয়েছে! ইমেইল চেক করুন।"),
    onError: (err: any) => toast.error(err.response?.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।"),
  });

  // ২. ওটিপি ভেরিফিকেশন
  const verifyOtp = useMutation({
    mutationFn: async (data: any) => (await api.post("/auth/verify", data)).data,
    onSuccess: () => {
      // setAuth(data.user, data.token);
      toast.success("ভেরিফিকেশন সফল হয়েছে!");
      // redirect to login
    },
    onError: () => toast.error("ভুল ওটিপি কোড!"),
  });

  // ৩. লগইন
  const loginUser = useMutation({
    mutationFn: async (data: any) => (await api.post("/auth/login", data)).data,
    onSuccess: (data) => {
      toast.success("লগইন সফল হয়েছে!");
      setAuth(data.data, data.access_token);
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "লগইন তথ্য সঠিক নয়।"),
  });

  return { registerUser, verifyOtp, loginUser };
};