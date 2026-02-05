const DonorSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm animate-pulse">
      {/* Top Section: Blood Group & Status */}
      <div className="flex justify-between items-start mb-4">
        {/* Blood Group Circle Placeholder */}
        <div className="w-14 h-14 bg-slate-100 rounded-2xl"></div>
        
        {/* Availability Badge Placeholder */}
        <div className="w-20 h-6 bg-slate-100 rounded-full"></div>
      </div>

      {/* Name Placeholder */}
      <div className="h-5 w-3/4 bg-slate-100 rounded-lg mb-3"></div>
      
      {/* Address Placeholder */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-slate-100 rounded-full"></div>
        <div className="h-3 w-1/2 bg-slate-50 rounded-lg"></div>
      </div>
      
      {/* Donation Count Placeholder */}
      <div className="pt-4 border-t border-slate-50">
        <div className="h-3 w-1/3 bg-slate-50 rounded-lg"></div>
      </div>

      {/* Button Placeholder */}
      <div className="w-full mt-6 h-12 bg-slate-100 rounded-2xl"></div>
    </div>
  );
};

export default DonorSkeleton;