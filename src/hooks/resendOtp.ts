import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";

export default function useResendOtp(){

  return useMutation({
    mutationFn: async (data: any) => (await api.post("/auth/resend-otp", data)).data,
    onSuccess: () => {
      toast.success("OTP পুনরায় পাঠানো হয়েছে!");
    },
    onError: () => toast.error("OtP পুনরায় পাঠানো ব্যর্থ হয়েছে!"),
  });
};