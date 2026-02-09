import { useEffect, useState } from "react";
import {  Clock,  Activity,
  Users
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import DonorCardSkeleton from "../search/DonorSkeleton";

import { useAcceptOrDeclineResponse } from "../../hooks/useRequestAcceptDecline";
import useDonorResponseRequests from "../../hooks/useDonorResponseRequests";
import toast from "react-hot-toast";
import RequestCard from "./RequestBox";

export default function DonorDashboard() {
  const { user } = useAuthStore();
  const { data, isLoading } = useDonorResponseRequests();
  const requests = data?.data || [];
  const { mutate, isPending, variables, } = useAcceptOrDeclineResponse();
  const action = variables?.status
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const handleAction = (status: "accepted" | "declined", requestId: number, donorId: number) => {

    mutate({ requestId, status, donorId }, {
      onSuccess: () => {
        toast.success(status === "accepted" ? "গ্রহণ করেছ ধন্যবাদ" : "রিকুয়েস্ট গ্রহণ করনি");
      },
      onError: (data: any) => toast.error(data.response?.data?.error || "কিছু ভুল হয়েছে"),
    });
  };
  useEffect(() => {
    document.title = "রক্ত বীর | আমার রক্তদান";
  }, []);
  const toggleExpand = (id: number) => setExpandedId(expandedId === id ? null : id);
  return (
    <div className="max-w-5xl mx-auto mt-20 px-4 pb-12 font-sans">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 mb-10 text-white shadow-2xl shadow-slate-200">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-[1000] mb-3 tracking-tight">স্বাগতম, {user?.name}! 👋</h1>
          <p className="text-slate-400 text-base font-medium max-w-lg leading-relaxed">
            আপনার রক্তদান আমাদের সমাজের শক্তি। আজই একজনকে সাহায্য করুন।
          </p>
        </div>
        <div className="absolute top-[-30%] right-[-5%] w-80 h-80 bg-red-600/10 rounded-full blur-[100px]"></div>
      </div>
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 px-2">
            <span className="p-2 bg-red-50 rounded-xl text-red-500"><Activity size={20}/></span> 
            নতুন অনুরোধ ({requests.length})
          </h3>
          
          {isLoading ? (
            [1, 2, 3].map((n) => <DonorCardSkeleton key={n}/>)
          ) : requests.length > 0 ? (
            requests.map((req: any) => (
              /* FIX: Added explicit return (or used parenthesis) */
              <RequestCard
                key={req.id} 
                req={req} 
                expandedId={expandedId} 
                setExpandedId={toggleExpand} 
                handleAction={handleAction} 
                isPending={isPending} 
                action={action}
              />
            ))
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <Clock size={40} className="text-slate-200 mx-auto mb-4"/>
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[11px]">No active requests found</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Users size={14} className="text-slate-400" /> Donor Stats
            </h5>
            <div className="space-y-4">
               <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Donated</p>
                  <p className="text-2xl font-black text-slate-800">0 <span className="text-xs"> Times</span></p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
