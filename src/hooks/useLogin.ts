import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuthStore } from "../store/authStore";


function useLoginAction() {
    const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate()

    return useMutation({
    mutationFn: async (data: any) => (await api.post("/auth/login", data)).data,
      onSuccess: async (data) => {
        const setLocalStore = {
          name: data?.data.data.name,
          email: data?.data.data.email,
          id: data?.data.data.id,
          role: data?.data.data.role,
          is_veryfied: data?.data.data.is_veryfied
      }
      setAuth(setLocalStore, data?.data.access_token);
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
      // toast.dismiss();
    }
  });
}
export default useLoginAction