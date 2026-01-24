const DonorCardSkeleton = () => (
  <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col md:flex-row justify-between items-center animate-pulse">
    <div className="flex items-center gap-6 w-full md:w-auto">
      <div className="w-20 h-20 bg-slate-100 rounded-3xl"></div>
      <div className="space-y-3 flex-1">
        <div className="h-5 bg-slate-100 rounded-full w-48"></div>
        <div className="flex gap-2">
          <div className="h-4 bg-slate-100 rounded-full w-20"></div>
          <div className="h-4 bg-slate-100 rounded-full w-24"></div>
        </div>
      </div>
    </div>
    <div className="h-12 bg-slate-100 rounded-2xl w-full md:w-32 mt-6 md:mt-0"></div>
  </div>
);

export default DonorCardSkeleton