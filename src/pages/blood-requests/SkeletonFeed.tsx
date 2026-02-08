
function SkeletonFeed() {
  return (
    <div className="space-y-12">
      {[1, 2].map((i) => (
        <div 
          key={i} 
          className="bg-white border border-slate-50 rounded-[3rem] shadow-sm p-8 space-y-6 animate-pulse"
        >
          {/* Header Skeleton */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-slate-100 rounded-lg" />
                <div className="h-3 w-20 bg-slate-50 rounded-lg" />
              </div>
            </div>
            <div className="h-8 w-24 bg-slate-100 rounded-xl" />
          </div>

          {/* Inner Stats Box Skeleton */}
          <div className="bg-slate-50/50 rounded-[2.5rem] p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-white rounded-3xl border border-slate-100" />
              <div className="h-20 bg-white rounded-3xl border border-slate-100" />
            </div>
            <div className="space-y-3 px-2">
              <div className="h-4 w-3/4 bg-slate-100 rounded" />
              <div className="h-4 w-1/2 bg-slate-100 rounded" />
            </div>
          </div>

          {/* Action Footer Skeleton */}
          <div className="flex gap-3 pt-2">
            <div className="h-14 flex-1 bg-slate-100 rounded-3xl" />
            <div className="h-14 w-14 bg-slate-100 rounded-3xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default SkeletonFeed