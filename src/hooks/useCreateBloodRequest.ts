import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
const useCreateBloodRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) =>
      (await api.post("/bloods-requests", data)).data,
    onSuccess: () => {
        queryClient.invalidateQueries({
        queryKey: ["blood-requests", "me"],
      });
    },
  });
};

export default useCreateBloodRequest