import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useGetUserNotfications = (userId: number) => {
    return useQuery({
    queryKey: ["notifications", "users", userId],
    queryFn: async () =>
      (await api.get(`/notifications/${userId}`)).data,
  });
}
export default useGetUserNotfications