import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const donorRegister = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (data: any) => (await api.post("/donors/registers", data)).data,
    onSuccess: (_data, variables) => {
      toast.success("আপনার আবেদনটি সফলভাবে জমা হয়েছে। ভেরিফিকেশনের জন্য অপেক্ষা করুন।");
      localStorage.setItem("donor_registered", variables?.blood_group);
      navigate("/")
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.message || "নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      toast.error(errorMsg);
    },
  });
};

export default donorRegister