import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
const useCreateBloodRequest = () => {
  return useMutation({
    mutationFn: async (data: any) =>
      (await api.post("/bloods-requests", data)).data,
  });
};

export default useCreateBloodRequest