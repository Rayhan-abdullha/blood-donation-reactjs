import Card from "../../components/Card";
import CountdownTimer from "./Timer";
import { motion, AnimatePresence } from "framer-motion";
import ShowDate from "../../components/ShowDate";
import LoadingSvg from "../../components/LoadingSvg";
import { 
  Phone, MapPin, ChevronDown, CheckCircle, Clock, 
  Droplet, Activity,
  Hospital as HospitalIcon,
  XCircle
} from "lucide-react";
import DetailBox from "./DetailBox";
function RequestCard({ req, expandedId, setExpandedId, handleAction, isPending, action }: any) {
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
                      disabled={isPending && action === "accepted"}
                      className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white py-4 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-200"
                    >
                      {isPending && action === "accepted" ? (<><LoadingSvg/> <span>অপেক্ষা করুন...</span></>) : "Accept"}
                    </button>
                    <button 
                      onClick={() => handleAction("declined", req.request_id, req.donor_id)} 
                      disabled={isPending && action === "declined"}
                      className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 py-4 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] transition-all"
                    >
                      {isPending && action === "declined" ? (<><LoadingSvg text="text-red-600"/><span>অপেক্ষা করুন...</span></>) : "Decline"}
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
export default RequestCard