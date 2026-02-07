import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
const useAdminCompleteDonation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) =>
      (await api.patch(`/admin/donors-requests/responses/marks-complete`, data)).data,
    onSuccess: () => {
          queryClient.invalidateQueries({
          queryKey: ["admin", "bloods-requests", "responses", "marks"],
      })
    }
  })
};

export default useAdminCompleteDonation