import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
// admin
const useGetAllBloodRequests = () => {
    return useQuery({
    queryKey: ["admin", "bloods-requests"],
    queryFn: async () =>
      (await api.get(`/admin/bloods-requests`)).data,
  });
}
export default useGetAllBloodRequests