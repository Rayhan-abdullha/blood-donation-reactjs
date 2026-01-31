import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useMyBloodRequests = () => {
  return useQuery({
    queryKey: ["blood-requests", "me"],
    queryFn: async () =>
      (await api.get("/bloods-requests/me")).data,
    staleTime: 1000 * 60 * 5,
  });
};

export default useMyBloodRequests;