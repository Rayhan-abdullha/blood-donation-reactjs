import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";
// TODO
const useForgotPassword = () =>
  useMutation({
    mutationFn: (data: { email: string }) =>
      api.post("/auth/forgot-password", data),

    onSuccess: () => {
      toast.success("ওটিপি পাঠানো হয়েছে");
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "সমস্যা হয়েছে");
    },
  });

export default useForgotPassword;
