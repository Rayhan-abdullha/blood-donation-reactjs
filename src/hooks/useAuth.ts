import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import api from "../api/axiosInstance";
import axios from "axios";

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

  // Donor Registration Mutation
  const donorRegister = useMutation({
    mutationFn: async (data: any) => (await api.post("/donors/registers", data)).data,
    onSuccess: (_data) => {
      toast.success("আপনার আবেদনটি সফলভাবে জমা হয়েছে। ভেরিফিকেশনের জন্য অপেক্ষা করুন।");
      // প্রয়োজন হলে ইউজারের ডাটা রিফ্রেশ করতে পারেন
      // queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      console.log(error);
      const errorMsg = error?.response?.data?.message || "নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      toast.error(errorMsg);
    },
  });
  // Create Blood Request (যদি প্রয়োজন হয়)
  const createBloodRequest = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post("/api/blood-request/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => toast.success("রক্তের আবেদন সফল হয়েছে!"),
    onError: (err: any) => toast.error(err?.response?.data?.message || "আবেদন ব্যর্থ হয়েছে"),
  });

  return { registerUser, verifyOtp, loginUser, donorRegister, createBloodRequest };
};