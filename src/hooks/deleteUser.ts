import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";

function useDeleteUserAction() {
  return useMutation({
    mutationFn: async (userId: number | string) =>
      (await api.delete(`/users/${userId}`)).data,

    onSuccess: () => {
      toast.success("User deleted successfully 🗑️");
    },

    onError: (err: any) => {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to delete user.");
    },
  });
}

export default useDeleteUserAction;
