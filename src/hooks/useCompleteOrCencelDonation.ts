import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
const useCompleteOrCencelDonation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) =>
      (await api.post("/bloods-requests/responses/marks", data)).data,

    onSuccess: (_data, variables) => {
      // invalidate donor responses
      queryClient.invalidateQueries({
        queryKey: ["blood-requests", "responses", variables.request_id],
      });
    },
  });
  
}

export default useCompleteOrCencelDonation

