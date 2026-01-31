import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useDonorResponseRequests = () => {
  return useQuery({
    queryKey: ["blood-requests", "donors"],
    queryFn: async () =>
      (await api.get("/bloods-requests/donors")).data,
    staleTime: 1000 * 60 * 2,
  });
};
export default useDonorResponseRequests