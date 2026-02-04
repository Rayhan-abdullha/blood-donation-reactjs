import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";

export default function useVerifyAction(){

  return useMutation({
    mutationFn: async (data: any) => (await api.post("/auth/verify", data)).data,
    onSuccess: () => {
      toast.success("ভেরিফিকেশন সফল হয়েছে!");
    },
    onError: () => toast.error("ভুল ওটিপি কোড!"),
  });
};