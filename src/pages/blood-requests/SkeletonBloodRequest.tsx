const BloodRequestSkeleton = () => (
  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
    <div className="bg-slate-100 px-6 py-4 h-14" />
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-100 rounded-2xl" />
        ))}
      </div>
      <div className="space-y-4">
        <div className="h-12 bg-slate-100 rounded-xl" />
        <div className="h-12 bg-slate-100 rounded-xl" />
      </div>
    </div>
    <div className="px-6 py-4 bg-slate-100 h-16" />
  </div>
);
export default BloodRequestSkeleton