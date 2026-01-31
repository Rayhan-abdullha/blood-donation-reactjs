import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
export const useProfileActions = () => {

//   const createBloodRequest = useMutation({
//     mutationFn: async (data: any) => (await api.post("/bloods/requests", data)).data,
//     onSuccess: () => toast.success("রক্তের আবেদন সফল হয়েছে!"),
//       onError: (err: any) => {
//           console.log(err)
//         toast.error(err?.response?.data?.message || "আবেদন ব্যর্থ হয়েছে")
//     },
//   });

  // find all blood requests by user ID
  const getUserProfile = useQuery({
    queryKey: ["auth", "users", "profile"],
    queryFn: async () => {
      const res = await api.get("/auth/users/profile");
      return res.data;
    },
  });
  // const getDonorProfile = useQuery({
  //   queryKey: ["auth", "donors", "profile"],
  //   queryFn: async () => {
  //   const res = await api.get("/auth/donors/profile");
  //     return res.data;
  //   },
  // })
  
  return { getUserProfile };
};