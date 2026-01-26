import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";
export const useBloodActions = () => {

  const createBloodRequest = useMutation({
    mutationFn: async (data: any) => (await api.post("/bloods/requests", data)).data,
    onSuccess: () => toast.success("রক্তের আবেদন সফল হয়েছে!"),
      onError: (err: any) => {
          console.log(err)
        toast.error(err?.response?.data?.message || "আবেদন ব্যর্থ হয়েছে")
    },
  });

  return { createBloodRequest };
};