import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useGetAllDonorRequests = () => {
    return useQuery({
    queryKey: ["admin", "donors-requests"],
    queryFn: async () =>
      (await api.get(`/admin/donors-requests`)).data,
  });
}
export default useGetAllDonorRequests