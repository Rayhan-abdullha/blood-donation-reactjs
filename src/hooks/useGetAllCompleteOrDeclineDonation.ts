import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useGetAllCompleteOrDeclineDonation = () => {
    return useQuery({
    queryKey: ["admin", "bloods-requests", "responses", "marks"],
    queryFn: async () =>
      (await api.get(`/bloods-requests/responses/marks`)).data,
  });
}
export default useGetAllCompleteOrDeclineDonation