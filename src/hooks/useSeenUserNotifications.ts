import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useSeenUserNotfications = (userId: number) => {
  return useMutation({
    mutationFn: async () =>
      (await api.patch(
        `notifications/${userId}`
      )).data,
  });
};
export default useSeenUserNotfications