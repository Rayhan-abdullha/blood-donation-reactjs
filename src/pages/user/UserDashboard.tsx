import useMyBloodRequests from "../../hooks/useMyBloodRequests";
import BloodRequestSkeleton from "../blood-requests/SkeletonBloodRequest";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import RequestWithResponses from "../blood-requests/RequestComplete";
import { HeartPulse, Plus } from "lucide-react";
import { useEffect } from "react";


export default function UserDashboard() {
  const { data, isLoading } = useMyBloodRequests();
  const { user } = useAuthStore();
  useEffect(() => {
    document.title = "রক্ত বীর | আমার রিকুয়েস্ট"
  }, []);
  return (
    <div className="max-w-5xl mx-auto mt-24 px-4 pb-16 font-sans">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 mb-8 text-white shadow-2xl shadow-slate-200">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-[1000] mb-3 tracking-tight">স্বাগতম, {user?.name}! 👋</h1>
          <p className="text-slate-400 text-base font-medium max-w-lg leading-relaxed">
            আপনার রক্তের আবেদন এবং দাতাদের তালিকা পরিচালনা করুন
          </p>
        </div>
        <div className="absolute top-[-30%] right-[-5%] w-80 h-80 bg-red-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">আপনার কার্যক্রম</h2>
        <Link to={"/blood/request"} className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-600 text-white px-7 py-3.5 rounded-[1.3rem] font-black text-[11px] uppercase tracking-[0.15em] transition-all active:scale-95 shadow-xl shadow-slate-200">
          <Plus size={18} strokeWidth={3} /> নতুন আবেদন
        </Link>
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 gap-8">
        {isLoading ? (
          <BloodRequestSkeleton />
        ) : data?.data?.length > 0 ? (
          data?.data?.map((r: any) => (
            <RequestWithResponses key={r.id} request={r}  />
          ))
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] py-24 text-center">
            <HeartPulse size={54} className="mx-auto text-slate-100 mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">সক্রিয় কোনো আবেদন নেই</p>
          </div>
        )}
      </div>
    </div>
  );
}

