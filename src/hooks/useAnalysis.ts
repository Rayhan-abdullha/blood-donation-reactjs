
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useAnalysisCount = () => {
    return useQuery({
    queryKey: ["admin", "count"],
    queryFn: async () =>
      (await api.get(`/admin/counts`)).data,
  });
}
export default useAnalysisCount