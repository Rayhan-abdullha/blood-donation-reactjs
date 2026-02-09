import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, ArrowRight } from "lucide-react";
import DonorDetailsModal from "../donor/DonorDetails";
import DonorSkeleton from "./DonorShowSkeleton";

interface PropTypes {
  donors: any[];
  isLoading: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  selectedDonor: any;
  handleViewDetails: (donorData: any) => void;
}
const DonorShow = ({ 
  donors, 
  isLoading, 
  isModalOpen, 
  setIsModalOpen, 
  selectedDonor, 
  handleViewDetails 
}: PropTypes) => {
  return (
    <section className="bg-[#FDFDFD] py-12 md:pt-24 px-6 mb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Premium Header (Maintained) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <span className="text-red-600 text-[10px] font-[1000] uppercase tracking-[0.3em] mb-2 block">Honor Circle</span>
            <h2 className="text-3xl md:text-4xl font-[1000] text-slate-900 tracking-tight leading-none">
              সম্মানিত দাতা <span className="text-slate-200 font-light">/ Prestige Donors</span>
            </h2>
            <p className="text-slate-400 text-xs font-bold mt-3 uppercase tracking-widest">মানবতার সেবায় নিবেদিত আমাদের বিশেষ সম্প্রদায়</p>
          </div>
          <Link to="/donor/search" className="group hidden md:flex items-center gap-3 bg-white border border-slate-100 px-6 py-3 rounded-2xl transition-all shadow-sm">
            <span className="text-[10px] font-black text-slate-500 group-hover:text-red-600 uppercase tracking-widest transition-colors">সবাইকে দেখুন</span>
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
               <ArrowRight size={14} />
            </div>
          </Link>
        </div>

        {/* The Grid: Snap Scroll on Mobile, 4-Col Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-4 gap-6 md:gap-8 overflow-x-auto pb-10 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => <DonorSkeleton key={i} />)
          ) : (
            donors?.slice(0, 8).map((donor, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleViewDetails(donor)}
                key={donor.id || i}
                className="min-w-[85vw] sm:min-w-[300px] md:min-w-full snap-center group relative bg-white p-3 rounded-[2.8rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(220,38,38,0.1)] transition-all duration-700 cursor-pointer"
              >
                {/* The "Nested" Inner Card Design restored */}
                <div className="bg-[#f4f4f4] rounded-[2.3rem] p-6 group-hover:bg-white transition-all duration-500 border border-transparent group-hover:border-red-50">
                  
                  <div className="flex justify-between items-start mb-10">
                    <div className="relative">
                        <div className="w-14 h-14 bg-white text-red-600 rounded-2xl flex items-center justify-center text-2xl font-black shadow-sm border border-slate-100 group-hover:bg-red-600 group-hover:text-white transition-all duration-700">
                           {donor.blood_group}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white p-0.5 rounded-full">
                            <div className={`w-full h-full rounded-full ${donor.is_available ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
    </div>
                    </div>
                    
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        donor.is_available 
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                      {donor.is_available ? 'Available' : 'Busy'}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-8">
                    <h3 className="text-slate-900 font-[1000] text-lg tracking-tight capitalize group-hover:text-red-600 transition-colors">
                      {donor.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MapPin size={12} className="text-slate-300" />
                      <span className="text-[10px] font-black truncate uppercase tracking-widest">{donor.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-slate-200/40">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">Donations</span>
                        <span className="text-xs font-black text-slate-700">{donor.donated_count || 0} Times</span>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                       <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      
      {/* Modal remains same */}
      <DonorDetailsModal
        isOpen={isModalOpen}
        donor={selectedDonor}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
export default DonorShow;