import { useState } from "react";
import { 
  Phone, MapPin, ChevronDown, CheckCircle, Clock, 
  Droplet, Activity,
  Hospital as HospitalIcon,
  XCircle,
  Users
} from "lucide-react";
import Card from "../../components/Card";
import { useAuthStore } from "../../store/authStore";
import DonorCardSkeleton from "../search/DonorSkeleton";
import CountdownTimer from "./Timer";
import { motion, AnimatePresence } from "framer-motion";
import { useAcceptOrDeclineResponse } from "../../hooks/useRequestAcceptDecline";
import useDonorResponseRequests from "../../hooks/useDonorResponseRequests";
import toast from "react-hot-toast";
import ShowDate from "../../components/ShowDate";
import LoadingSvg from "../../components/LoadingSvg";

export default function DonorDashboard() {
  const { user } = useAuthStore();
  const { data, isLoading } = useDonorResponseRequests();
  const requests = data?.data || [];
  const { mutate, isPending } = useAcceptOrDeclineResponse();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const handleAction = (status: "accepted" | "declined", requestId: number, donorId: number) => {

    mutate({ requestId, status, donorId }, {
      onSuccess: () => {
        toast.success(status === "accepted" ? "গ্রহণ করেছ ধন্যবাদ" : "রিকুয়েস্ট গ্রহণ করনি");
      },
      onError: (data: any) => toast.error(data.response?.data?.error || "কিছু ভুল হয়েছে"),
    });
  };

  const toggleExpand = (id: number) => setExpandedId(expandedId === id ? null : id);
  return (
    <div className="max-w-5xl mx-auto mt-20 px-4 pb-12 font-sans">
      
      {/* Hero Welcome */}
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
                  <p className="text-2xl font-black text-slate-800">05 <span className="text-xs">Times</span></p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestCard({ req, expandedId, setExpandedId, handleAction, isPending }: any) {
  const isSent = req.status === "sent";
  const isAccepted = req.status === "accepted";
  const isDeclined = req.status === "declined";
  const isDone = req.status === "donated";
  const isTimeout = req.status === "timeout";
  const expired = new Date(req.expires_at) < new Date();
  
  // LIVE logic: Sent (needs action) or Accepted (in progress)
  const isLive = isSent || isAccepted; 
  const isExpanded = expandedId === req.id;

  return (
    <Card className={`group border-none rounded-[2.5rem] overflow-hidden transition-all duration-500 relative mb-4
        ${isLive 
          ? 'bg-white shadow-xl -translate-y-1 border-l-4 border-l-red-500' 
          : 'bg-slate-50/50 opacity-80 shadow-sm border-l-4 border-l-slate-300' 
        } hover:shadow-2xl`}>
      
      {/* Real-time Live Indicator */}
      {isLive && (
        <div className="absolute top-6 right-8 flex items-center gap-2 z-10 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-slate-50">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAccepted ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isAccepted ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
          </span>
          <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isAccepted ? 'text-emerald-600' : 'text-red-600'}`}>
            {isAccepted ? 'Active Mission' : 'Live Request'}
          </span>
        </div>
      )}

      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Blood Icon with Real-time Pulse for Sent status */}
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem] flex flex-col items-center justify-center border transition-all duration-500
              ${isSent ? 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-200 animate-pulse' : 
                isAccepted ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-100' :
                'bg-slate-100 border-slate-200 text-slate-400'}`}>
              <Droplet size={14} fill="currentColor" />
              <span className="text-2xl md:text-3xl font-[1000] tracking-tighter leading-none mt-1">{req.blood_type}</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {/* Inline Premium Badge */}
                <div className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5
                  ${req.urgency === "urgent" ? "bg-red-50 border-red-100 text-red-600" : "bg-blue-50 border-blue-100 text-blue-600" }`}>
                  <div className={`w-1 h-1 rounded-full ${req.urgency === "urgent" ? "bg-red-500 animate-pulse" : "bg-blue-500"}`} />
                  {req.urgency === "urgent" ? "জরুরী" : "সাধারণ" }
                </div>

                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
                  ${isSent || isAccepted && 'bg-amber-50 border-amber-100 text-amber-600'} 
                    ${req.status === "donated" ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 
                    'bg-slate-200 border-slate-300 text-slate-500'}`}>
                  Status: {req.status}
                </span>
              </div>
              
              {
                isDone && req.confirmed_at ?
                <ShowDate date={req.confirmed_at} />
              : <CountdownTimer expiresAt={req.expires_at} />
              }
              <div className="space-y-1 mt-4">
                <h4 className="capitalize text-lg font-black text-slate-800 leading-tight flex items-center gap-2">
                  <HospitalIcon size={16} className="text-red-500" /> {req.hospital}
                </h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin size={12} /> {req.location}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-8">
            <div className="text-left md:text-right">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Quantity</p>
              <p className="text-2xl font-[1000] text-slate-900 tracking-tighter">
                {String(req.quantity).padStart(2, '0')} <span className="text-xs font-black text-slate-400 uppercase">Bags</span>
              </p>
            </div>
            <button 
              onClick={() => setExpandedId(req.id)}
              className={`cursor-pointer w-14 h-14 rounded-2xl flex items-center justify-center transition-all
                ${isExpanded ? 'bg-slate-900 text-white shadow-xl rotate-180' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <ChevronDown size={20}/>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-50/30 border-t border-slate-100"
          >
            <div className="p-8 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailBox icon={<MapPin size={16}/>} label="Full Address" value={req.location} color="blue" />
                  <DetailBox icon={<Phone size={16}/>} label="Patient Contact" value={req.phone} isLink color="green" />
               </div>

               <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-inner">
                {/* --- CONDITIONAL LOGIC FOR ACTION VS MARK MESSAGES --- */}
                
                {isSent && !expired ? (
                  /* ONLY SHOW BUTTONS IF STATUS IS 'SENT' */
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => handleAction("accepted", req.request_id, req.donor_id)} 
                      disabled={isPending}
                      className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white py-4 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-200"
                    >
                      {isPending ? (<><LoadingSvg/> <span>অপেক্ষা করুন...</span></>) : "Accept"}
                    </button>
                    <button 
                      onClick={() => handleAction("declined", req.request_id, req.donor_id)} 
                      disabled={isPending}
                      className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 py-4 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] transition-all"
                    >
                      {isPending ? (<><LoadingSvg text="text-red-600"/><span>অপেক্ষা করুন...</span></>) : "Decline"}
                    </button>
                  </div>
                ) : (
                  /* SHOW MARK MESSAGES FOR ALL OTHER STATUSES */
                  <div className="flex flex-col items-center py-6 text-center space-y-4">
                    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-700
                      ${isDone ? 'bg-emerald-50 text-emerald-600' : 
                        isAccepted ? 'bg-blue-50 text-blue-600' :
                        isDeclined ? 'bg-red-50 text-red-500' : 
                        'bg-slate-100 text-slate-400'}`}>
                      {isDone ? <CheckCircle size={40} /> : 
                       isAccepted ? <Activity size={40} className="animate-pulse" /> :
                       isTimeout || expired ? <Clock size={40} /> : 
                       <XCircle size={40} />}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="font-[1000] text-slate-900 text-lg uppercase tracking-tight">
                        {isDone ? "রক্তদান সম্পন্ন হয়েছে" : 
                         isAccepted ? "আপনি রিকুয়েস্ট গ্রহণ করেছেন" :
                         isDeclined ? "আপনি অনুরোধটি বাতিল করেছেন" :
                         isTimeout || expired ? "সময় শেষ হয়ে গেছে" : "অনুরোধটি নিষ্ক্রিয়"}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                        {isAccepted ? "Proceed to the hospital immediately" : "Log recorded in secure database"}
                      </p>
                    </div>
                  </div>
                )}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
function DetailBox({ icon, label, value, isLink, color = "slate" }: any) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-600 bg-green-50",
    amber: "text-amber-600 bg-amber-50",
    red: "text-red-500 bg-red-50",
    slate: "text-slate-400 bg-slate-50"
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group hover:border-slate-300 transition-all">
      <div className="flex items-center gap-2 mb-2 text-slate-400">
        <span className={`p-1.5 rounded-lg ${colorMap[color]}`}>{icon}</span>
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      {isLink ? (
        <a href={`tel:${value}`} className="text-sm font-black text-blue-600 hover:underline">{value || "N/A"}</a>
      ) : (
        <p className={`text-sm font-black capitalize ${color === 'amber' ? 'text-amber-600' : 'text-slate-700'}`}>{value}</p>
      )}
    </div>
  );
}