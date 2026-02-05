import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useGetAllDonors = () => {
    return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () =>
      (await api.get(`/all-donors`)).data,
  });
}
export default useGetAllDonors