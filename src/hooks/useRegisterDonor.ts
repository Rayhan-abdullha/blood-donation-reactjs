import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

const donorRegister = () => {
  return useMutation({
    mutationFn: async (data: any) => (await api.post("/donors/registers", data)).data,
    onSuccess: (_data) => {
      toast.success("আপনার আবেদনটি সফলভাবে জমা হয়েছে। ভেরিফিকেশনের জন্য অপেক্ষা করুন।");
    },
    onError: (error: any) => {
      console.log(error.response);
      const errorMsg = error?.response?.data?.message || "নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      toast.error(errorMsg);
    },
  });
};

export default donorRegister