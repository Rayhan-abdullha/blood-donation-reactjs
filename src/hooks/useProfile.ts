
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const getUserProfile = () => {
    return useQuery({
    queryKey: ["auth", "users", "profile"],
      queryFn: async () => (await api.get("/auth/users/profile")).data,
  });
}
export default getUserProfile