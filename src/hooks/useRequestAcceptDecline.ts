import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export const useAcceptOrDeclineResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, status, donorId }: { requestId: number; status: string, donorId: number }) =>
      (await api.patch(
        `bloods-requests/responses/${requestId}`,
        { status, donor_id: donorId },
      )).data,

    onSuccess: () => {
      toast.success("Action successful");
      queryClient.invalidateQueries({
        queryKey: ["blood-requests", "donors"],
      });
    },
  });
};
