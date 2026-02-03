import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";
const useVerifyDonor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) =>
      (await api.patch("/admin/donors-verify", data)).data,
    onSuccess: () => {
        queryClient.invalidateQueries({
        queryKey: ["admin", "donors-requests"],
        })
    },
    onError: () => toast.error("কিছু ভুল হয়েছে"),
  });
};

export default useVerifyDonor