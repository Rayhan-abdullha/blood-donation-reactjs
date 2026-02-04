import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";

const useResetPassword = () =>
  useMutation({
    mutationFn: (data: {
      email: string;
      otp: string;
      newPassword: string;
    }) => api.post("/auth/reset-password", data),

    onSuccess: () => {
      toast.success("পাসওয়ার্ড পরিবর্তন হয়েছে");
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "রিসেট ব্যর্থ");
    },
  });

export default useResetPassword;
