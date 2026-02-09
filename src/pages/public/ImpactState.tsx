import useAnalysisCount from "../../hooks/useAnalysis";

function ImpactState() {
  const { data, isLoading } = useAnalysisCount();

  const statsConfig = [
    { 
        label: "নিবন্ধিত দাতা", 
        value: data?.data?.total_verified_donors || 0, 
        icon: "👥" 
    },
    { 
        label: "সফল দান", 
        value: data?.data?.total_succcessfull_donation || 0, 
        icon: "✅" 
    },
    { 
        label: "বর্তমান অনুরোধ", 
        value: data?.data?.total_live_requests || 0, 
        icon: "🕒" 
    },
    { 
        label: "মোট ব্যবহারকারী", 
        value: data?.data?.total_users || 0, 
        icon: "📍" 
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 -mt-40 sm:-mt-24 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading
          ? // Skeleton Loader
            Array(4).fill(0).map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 text-center animate-pulse"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-full mx-auto mb-3"></div>
                <div className="h-6 w-12 bg-slate-100 rounded-lg mx-auto mb-2"></div>
                <div className="h-3 w-20 bg-slate-50 rounded-lg mx-auto"></div>
              </div>
            ))
          : // Actual Data Card
            statsConfig?.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 text-center hover:translate-y-[-5px] transition-transform duration-300"
              >
                <div className="text-2xl mb-2 filter drop-shadow-sm">{stat.icon}</div>
                <p className="text-3xl font-black text-slate-800 tracking-tight">
                  {stat.value.toLocaleString('bn-BD')} {/* বাংলা সংখ্যা ব্যবহারের জন্য */}
                </p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default ImpactState;