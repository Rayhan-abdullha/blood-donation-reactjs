import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useGetCurrentBloodRequests = () => {
    return useQuery({
    queryKey: ["bloods-requests", "currents"],
    queryFn: async () =>
      (await api.get(`/bloods-requests/currents`)).data,
  });
}
export default useGetCurrentBloodRequests