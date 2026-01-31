import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useGetAllUsers = () => {
    return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () =>
      (await api.get(`/admin/users`)).data,
  });
}
export default useGetAllUsers