import { motion } from "framer-motion";
import { 
  Droplets, MapPin, Hospital, Clock, Phone, 
  Facebook, MessageCircle,
  Inbox // Added for Empty UI
} from "lucide-react";
import useGetCurrentBloodRequests from "../../hooks/useGetCurrentBloodRequests";
// import DonorCardSkeleton from "../search/DonorSkeleton"; // Reusing your skeleton
import type { BloodRequest } from "../../types";
import CountdownTimer from "../donor/Timer";

// ... Type definition remains same

export default function PublicRequestsFeed() {
  const { data, isLoading } = useGetCurrentBloodRequests();
  const requests = data?.data || [];

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now.getTime() - past.getTime();
    const diffInHrs = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHrs < 1) return "এইমাত্র";
    if (diffInHrs < 24) return `${diffInHrs} ঘণ্টা আগে`;
    return `${Math.floor(diffInHrs / 24)} দিন আগে`;
  };

  const handleShare = (platform: string, requestId: number, bloodType: string) => {
    const url = `https://yourbloodapp.com/request/${requestId}`;
    const text = `জরুরী ${bloodType} রক্ত প্রয়োজন!`;
    const links: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`,
    };
    window.open(links[platform], "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="h-16 md:h-20" />
      <div className="max-w-2xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-10 text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">ব্লাড রিকোয়েস্ট ফিড</h1>
          <p className="text-slate-500 text-sm font-medium italic">রক্তের সন্ধানে থাকা মানুষের পাশে দাঁড়ান</p>
        </div>

        <div className="space-y-8">
          {isLoading ? (
            // 1. Skeleton Loading State
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white p-6 rounded-[2.5rem] border border-slate-100">
                   <div className="flex gap-4 mb-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-full" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-slate-200 rounded" />
                        <div className="h-3 w-20 bg-slate-100 rounded" />
                      </div>
                   </div>
                   <div className="h-64 w-full bg-slate-100 rounded-[1.5rem] mb-4" />
                   <div className="h-4 w-full bg-slate-50 rounded mb-2" />
                   <div className="h-4 w-2/3 bg-slate-50 rounded" />
                </div>
              ))}
            </div>
          ) : requests.length > 0 ? (
            // 2. Dynamic Data Feed
            requests?.map((req: BloodRequest) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                key={req.id}
                className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500"
              >
                {/* Header Section */}
                <div className="p-6 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 font-black border border-red-100">
                      {req.blood_type[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">{req.name || "Anonymous"}</h4>
                      <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                        <Clock size={10} /> {getTimeAgo(req.created_at)}
                      </p>
                    </div>
                  </div>
                  <CountdownTimer expiresAt={req.expires_at}/>
                </div>

                {/* Cover Image/Card Body */}
                <div className="relative h-64 mx-4 overflow-hidden rounded-[1.8rem] bg-slate-900">
                  <img 
                    src="https://i.ibb.co.com/21s2sNdH/Gemini-Generated-Image-65ad4k65ad4k65ad.png" 
                    alt="Hospital View"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
                  />
                  <div className="absolute top-4 left-4">
                    <div className={`px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 border border-white/20 backdrop-blur-md 
                      ${req.urgency === 'urgent' ? 'bg-red-600 text-white' : 'bg-white text-slate-900'}`}>
                      <span className={`w-2 h-2 rounded-full ${req.urgency === 'urgent' ? 'bg-white animate-pulse' : 'bg-green-500'}`} />
                      <span className="text-[10px] font-black uppercase tracking-tighter">{req.urgency === 'urgent' ? 'জরুরী (Urgent)' : 'সাধারন'}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white p-1 rounded-2xl shadow-2xl">
                    <div className="bg-red-600 text-white px-5 py-2 rounded-xl flex items-center gap-2">
                       <Droplets size={16} fill="white" />
                       <span className="text-2xl font-[1000]">{req.blood_type}</span>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-3 mb-5">
                    <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <Hospital size={14} className="text-red-500" />
                      <span className="text-[11px] font-black">{req.hospital}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <MapPin size={14} className="text-blue-500" />
                      <span className="text-[11px] font-black">{req.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-600 bg-red-50/50 px-3 py-1.5 rounded-xl border border-red-100">
                      <span className="text-[11px] font-[1000] uppercase">{req.quantity} ব্যাগ প্রয়োজন</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-semibold italic">"{req.description}"</p>
                </div>

                {/* Actions Section */}
                <div className="px-6 pb-8 pt-2 flex items-center gap-2">
                    <button onClick={() => handleShare('facebook', req.id, req.blood_type)} className="p-4 bg-slate-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <Facebook size={18} />
                    </button>
                    <button onClick={() => handleShare('whatsapp', req.id, req.blood_type)} className="p-4 bg-slate-50 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-sm">
                      <MessageCircle size={18} />
                    </button>
                    <a href={`tel:${req.phone}`} className="flex-1 flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-red-600 transition-all active:scale-95">
                      <Phone size={16} fill="white" /> কল করুন
                    </a>
                </div>
              </motion.div>
            ))
          ) : (
            // 3. Empty UI State
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Inbox size={40} className="text-slate-200" />
              </div>
              <h3 className="text-slate-800 font-black text-xl mb-2">কোন রিকোয়েস্ট নেই</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">বর্তমানে রক্ত চেয়ে কোন পোস্ট করা হয়নি। নতুন রিকোয়েস্ট আসলে এখানে দেখা যাবে।</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}