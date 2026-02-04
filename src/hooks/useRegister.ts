import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";


function useRegisterAction() {
    return useMutation({
    mutationFn: async (data: any) => (await api.post("/auth/register", data)).data,
    onSuccess: () => toast.success("OTP পাঠানো হয়েছে! ইমেইল চেক করুন।"),
      onError: (err: any) => {
        console.log(err)
      toast.error(err.response?.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।")
    }
  });

}
export default useRegisterAction