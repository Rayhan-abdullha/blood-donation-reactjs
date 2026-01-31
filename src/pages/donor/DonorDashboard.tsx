import { useState } from "react";
import { 
  Phone, MapPin, ChevronDown, ChevronUp, CheckCircle, Clock, 
  Droplet, Activity,
  Hospital as HospitalIcon,
  Calendar,
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
      }
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
  const expired = new Date(req.expires_at) < new Date();
  const isAccepted = req.status === "accepted";
  const isDeclined = req.status === "declined";
  
  // LIVE means it's either just sent to you OR you already accepted it
  const isLive = isSent || isAccepted; 
  const isExpanded = expandedId === req.id;

  return (
    <Card className={`group border-none rounded-[2.5rem] overflow-hidden transition-all duration-500 relative mb-4
        ${isLive 
          ? 'bg-white shadow-xl -translate-y-1 border-l-4 border-l-red-500' 
          : 'bg-slate-50/50 opacity-70 shadow-sm border-l-4 border-l-slate-300' 
        } hover:shadow-2xl hover:-translate-y-2`}>
      
      {/* Real-time Status Indicator */}
      {isLive && (
        <div className="absolute top-6 right-8 flex items-center gap-2 z-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAccepted ? 'bg-green-400' : 'bg-red-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAccepted ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </span>
          <span className={`text-[10px] font-black uppercase tracking-widest ${isAccepted ? 'text-green-600' : 'text-red-600'}`}>
            {isAccepted ? 'Accepted' : 'Live Request'}
          </span>
        </div>
      )}

      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem] flex flex-col items-center justify-center border transition-all duration-500
              ${isLive ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
              <Droplet size={14} fill="currentColor" />
              <span className="text-2xl md:text-3xl font-[1000] tracking-tighter leading-none mt-1">{req.blood_type}</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border
                  ${req.urgency === "urgent" ? "bg-red-50 border-red-100 text-red-600" : "bg-amber-50 border-amber-100 text-amber-600" }`}>
                  {req.urgency === "urgent" ? "জরুরি" : "সাধারণ" }
                </span>

                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border
                  ${isSent ? 'bg-blue-50 border-blue-100 text-blue-600 animate-pulse' : 
                    isAccepted ? 'bg-green-50 border-green-100 text-green-600' : 
                    'bg-slate-200 text-slate-500'}`}>
                  {isSent ? "১ টা রক্তের আবেদন করা হয়েছে" : isAccepted ? "তুমি রিকুয়েস্ট গ্রহন করেছ" : "অনুরোধটি নিষ্ক্রিয়"}
                </span>
              </div>
              
              <CountdownTimer expiresAt={req.expires_at} />
              
              <div className="space-y-1 mt-4">
                <h4 className="capitalize text-md font-black text-slate-700 leading-tight flex items-center gap-2">
                  <HospitalIcon size={14} className="text-blue-500" /> {req.hospital}
                </h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar size={12} /> {new Date(req.created_at).toLocaleDateString("bn-BD")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-8">
            <div className="text-left md:text-right">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Units</p>
              <p className="text-2xl font-[1000] text-slate-800 tracking-tighter">
                {String(req.quantity).padStart(2, '0')} <span className="text-xs font-black text-slate-400">ব্যাগ</span>
              </p>
            </div>
            <button 
              onClick={() => setExpandedId(req.id)}
              className={`cursor-pointer px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                ${isExpanded ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
            >
              <span className="flex items-center gap-2">
                {isExpanded ? 'Hide' : 'Details'}
                {isExpanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
              </span>
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
            className="bg-slate-50/50 border-t border-slate-100"
          >
            <div className="p-8 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailBox icon={<MapPin size={16}/>} label="Location" value={req.location} color="blue" />
                  <DetailBox icon={<Phone size={16}/>} label="Contact" value={req.phone} isLink color="green" />
               </div>

               <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                {isAccepted ? (
                  <div className="flex flex-col items-center py-4 space-y-3">
                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                      <CheckCircle size={28}/>
                    </div>
                    <p className="font-black text-slate-800">আপনি এই অনুরোধটি গ্রহণ করেছেন</p>
                  </div>
                ) : isDeclined || expired ? (
                  <div className="flex flex-col items-center py-4 space-y-3">
                    <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
                      <XCircle size={28}/>
                    </div>
                    <p className="font-black text-slate-800">আপনি এই অনুরোধটি বাতিল করেছেন</p>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => handleAction("accepted", req.request_id, req.donor_id)} 
                      disabled={isPending}
                      className="flex-1 bg-slate-900 hover:bg-green-600 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isPending ? "প্রসেসিং..." : "গ্রহণ করুন"}
                    </button>
                    <button 
                      onClick={() => handleAction("declined", req.request_id, req.donor_id)} 
                      disabled={isPending}
                      className="flex-1 bg-white border border-slate-200 text-slate-400 hover:text-red-500 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all"
                    >
                      বাতিল করুন
                    </button>
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