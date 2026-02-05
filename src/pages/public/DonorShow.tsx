import { Link } from "react-router-dom";
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
    <section className="bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
              উপলব্ধ রক্তদাতা (Available Donors)
            </h2>
            <p className="text-slate-500 mt-2 font-medium italic">
              আপনার প্রয়োজনীয় গ্রুপের দাতা খুঁজে নিন
            </p>
          </div>
          <Link to="/donor/search" className="text-red-600 font-bold hover:underline hidden md:block">
            সবাইকে দেখুন (View All) →
          </Link>
        </div>

        {/* Donors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // ডেটা লোড হওয়ার সময় ৪টি স্কেলিটন কার্ড দেখাবে
            Array(4).fill(0).map((_, i) => (
              <DonorSkeleton key={i} />
            ))
          ) : (
            donors?.map((donor, i) => (
              <div
                onClick={() => handleViewDetails(donor)}
                key={donor.id || i}
                className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:ring-2 hover:ring-red-500/20 transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Blood Group and Availability Status */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl font-black shadow-inner transform group-hover:scale-110 transition-transform">
                    {donor.blood_group}
                  </div>
                  
                  {donor.is_available ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-green-100">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span> 
                      Available
                    </span>
                  ) : (
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                      Unavailable
                    </span>
                  )}
                </div>

                {/* Name and Info */}
                <h3 className="capitalize text-slate-800 font-black text-lg truncate mb-1">
                  {donor.name}
                </h3>
                
                <div className="capitalize flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <span className="text-lg leading-none">📍</span> 
                  <span className="truncate">{donor.address}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    মোট দান: <span className="text-slate-900 font-black">{donor.donated_count || 0} বার</span>
                  </p>
                </div>

                {/* Action Button */}
                <button
                  className="w-full mt-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black text-slate-600 uppercase tracking-[0.1em] group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all shadow-sm active:scale-95"
                >
                  বিবরণ দেখুন (View Details)
                </button>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        <DonorDetailsModal
          isOpen={isModalOpen}
          donor={selectedDonor}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Mobile View All Link */}
        <div className="mt-10 md:hidden text-center">
            <Link to="/donor/search" className="inline-block px-8 py-3 bg-white border border-slate-200 rounded-2xl text-red-600 font-bold shadow-sm">
                সবাইকে দেখুন (View All)
            </Link>
        </div>
      </div>
    </section>
  );
};

export default DonorShow;