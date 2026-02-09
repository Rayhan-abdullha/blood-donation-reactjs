import { motion } from "framer-motion";

import useGetCurrentBloodRequests from "../../hooks/useGetCurrentBloodRequests";
import type { BloodRequest } from "../../types";

import EmptyState from "./EmptyFeed";
import RequestCard from "./RequestCard";
import SkeletonFeed from "./SkeletonFeed";
import { Activity } from "lucide-react";
import { useEffect } from "react";

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

    useEffect(() => {
    document.title = "রক্ত বীর | সব রক্তের আবেদন";
  }, []);
  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-24">
      {/* Premium Gradient Background */}
      <div className="fixed inset-0 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:20px_20px] opacity-50 -z-10" />
      
      <div className="h-16 md:h-20" />
      
      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Animated Header */}
        <div className="mb-12 flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="w-12 h-12 bg-red-600 rounded-2xl rotate-12 flex items-center justify-center mb-4 shadow-xl shadow-red-200"
          >
            <Activity className="text-white" size={24} />
          </motion.div>
          <h1 className="text-4xl font-[1000] text-slate-900 tracking-tight mb-2">লাইভ রিকোয়েস্ট</h1>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
             <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">
               {requests.length} টি সক্রিয় রিকোয়েস্ট
             </span>
          </div>
        </div>

        <div className="space-y-12">
          {isLoading ? (
            <SkeletonFeed />
          ) : requests.length > 0 ? (
            requests.map((req: BloodRequest) => (
              <RequestCard key={req.id} req={req} getTimeAgo={getTimeAgo} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}


