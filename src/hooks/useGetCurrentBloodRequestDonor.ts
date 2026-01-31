import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useGetCurrentBloodRequestDonor = () => {
    return useQuery({
    queryKey: ["admin", "bloods-requests", "donors"],
    queryFn: async () =>
      (await api.get(`/admin/bloods-requests/donors`)).data,
  });
}
export default useGetCurrentBloodRequestDonor