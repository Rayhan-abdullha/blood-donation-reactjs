import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import these
import useGetUserNotfications from "../hooks/useGetUserNotifications";
import { useAuthStore } from "../store/authStore";
import useSeenUserNotfications from "../hooks/useSeenUserNotifications";

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  
  const id = user?.id ? parseInt(user.id) : 0;
  const { data: notifications, isLoading } = useGetUserNotfications(id);
  const { mutate } = useSeenUserNotfications(id);
    
  const handleNotification = () => {
    if (!isOpen) mutate();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative mt-1">
      {/* Bell Icon */}
      <button 
        onClick={handleNotification}
        className="relative p-1 text-slate-500 rounded-full transform hover:scale-110 transition-all cursor-pointer"
      >
        <span className="text-2xl">🔔</span>
        {notifications?.data?.length > 0 && (
          <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
            {notifications.data.length}
          </span>
        )}
      </button>

      {/* 1. Wrap with AnimatePresence to enable exit animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // 2. Define the Animation states
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            
            // Keep your existing Tailwind classes
            className="absolute top-full mt-3 z-50 left-1/2 -translate-x-1/2 w-[95vw] sm:left-auto sm:right-0 sm:translate-x-0 sm:w-[400px] bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 overflow-hidden origin-top-right"
          >
            <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
              <h3 className="font-black text-slate-800 uppercase tracking-tight">নোটিফিকেশন</h3>
              {notifications?.data?.length > 0 && (
                <button className="text-[10px] font-bold text-red-600 hover:underline uppercase">
                  সবগুলো মুছুন
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 space-y-4">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className="animate-pulse flex gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-slate-200 shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-slate-200 rounded w-3/4" />
                          <div className="h-2 bg-slate-100 rounded w-full" />
                        </div>
                     </div>
                   ))}
                </div>
              ) : notifications?.data?.length > 0 ? (
                notifications.data.map((n: any) => (
                  <motion.div 
                    layout // Smoothly reorders if items are deleted
                    key={n.id} 
                    className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-all ${!n.is_read ? 'bg-red-50/30' : ''}`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${!n.is_read ? 'bg-red-600' : 'bg-slate-300'}`} />
                      <div>
                        <p className={`text-sm ${!n.is_read ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
                          {n.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-slate-400 mt-2 font-medium tracking-wide">{n.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center text-slate-400">
                  <span className="text-4xl mb-2">📭</span>
                  <p className="text-sm font-medium">কোনো নোটিফিকেশন নেই</p>
                </div>
              )}
            </div>

            <button className="w-full py-4 text-center text-xs font-bold text-slate-400 hover:text-red-600 transition-colors uppercase tracking-widest bg-slate-50/50">
              সব নোটিফিকেশন দেখুন
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;