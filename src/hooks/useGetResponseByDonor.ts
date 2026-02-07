import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const uesGetResponseByDonor = (reqId: number) => {
    return useQuery({
    queryKey: ["blood-requests", "responses", reqId],
    queryFn: async () =>
      (await api.get(`/bloods-requests/responses/${reqId}`)).data,
  });
}
export default uesGetResponseByDonor