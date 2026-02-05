import { Eye, Filter, Search, Trash2 } from "lucide-react";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import { formatDateShort } from "../../utils/getDate";
import DonorCardSkeleton from "../search/DonorSkeleton";
import useDeleteUserAction from "../../hooks/deleteUser";
import LoadingSvg from "../../components/LoadingSvg";

function UserManagementView() {
  const { data, isLoading } = useGetAllUsers()
  const { mutate: deleteUser, isPending, variables } = useDeleteUserAction();
  const handleDelete = (userId: number) => {
    deleteUser(userId);
  };
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">User Management</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input placeholder="Email, Name or ID..." className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-64 outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500" />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600"><Filter size={18}/></button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.1em]">
            <tr>
              <th className="px-8 py-5">User Details</th>
              <th className="px-6 py-5">Role</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Joined Date</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {
              isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 text-sm">
                    <DonorCardSkeleton/>
                    <DonorCardSkeleton/>
                    <DonorCardSkeleton/>
                    <DonorCardSkeleton/>
                    <DonorCardSkeleton/>
                    <DonorCardSkeleton/>
                  </td>
                </tr>
              ) : data?.data?.map((user: any) => (
              <tr key={user?.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">{user?.name[0]}</div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{user?.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{user?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                   <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${user?.role === 'Donor' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {user?.role}
                   </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <div className={`w-1.5 h-1.5 rounded-full ${user?.is_verified === 'Verified' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    {user?.is_verified ? 'Verified' : 'Not Verified'}
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-slate-500 font-medium">{formatDateShort(user?.created_at)}</td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Eye size={18}/></button>
                      <button onClick={() => handleDelete(user.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">{
                      (isPending && variables=== user.id) ? <LoadingSvg text="text-red-600"/> : <Trash2 size={18}/>}</button>
                  </div>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default UserManagementView