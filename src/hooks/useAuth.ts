import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export const useAuthActions = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate()
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
      toast.success("ভেরিফিকেশন সফল হয়েছে!");
    },
    onError: () => toast.error("ভুল ওটিপি কোড!"),
  });

  // ৩. লগইন
  const loginUser = useMutation({
    mutationFn: async (data: any) => (await api.post("/auth/login", data)).data,
    onSuccess: async (data) => {
      setAuth(data?.data.data, data?.data.access_token);
      toast.success("লগইন সফল হয়েছে!", {
        duration: 1000,
      });
     await new Promise((resolve) => setTimeout(resolve, 500));
      toast.dismiss(); // 🔥 remove all toasts
      setTimeout(() => navigate("/"), 300);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "লগইন ব্যর্থ হয়েছে!", {
        duration: 1000,
      });
      toast.dismiss();
    }
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
      console.log(error.response);
      const errorMsg = error?.response?.data?.message || "নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      toast.error(errorMsg);
    },
  });
  return { registerUser, verifyOtp, loginUser, donorRegister };
};