import { Users, CheckCircle2, Activity, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import useAnalysisCount from "../../hooks/useAnalysis";

function ImpactState() {
  const { data, isLoading } = useAnalysisCount();

  const statsConfig = [
    { 
        label: "নিবন্ধিত দাতা", 
        value: data?.data?.total_verified_donors || 0, 
        icon: <Users size={20} />,
        color: "from-blue-600 to-cyan-500",
        shadow: "shadow-blue-100"
    },
    { 
        label: "সফল দান", 
        value: data?.data?.total_succcessfull_donation || 0, 
        icon: <CheckCircle2 size={20} />,
        color: "from-emerald-600 to-teal-500",
        shadow: "shadow-emerald-100"
    },
    { 
        label: "লাইভ রিকোয়েস্ট", 
        value: data?.data?.total_live_requests || 0, 
        icon: <Activity size={20} />,
        color: "from-red-600 to-rose-500",
        shadow: "shadow-red-100"
    },
    { 
        label: "মোট ইউজার", 
        value: data?.data?.total_users || 0, 
        icon: <MapPin size={20} />,
        color: "from-amber-600 to-orange-500",
        shadow: "shadow-amber-100"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-32 sm:-mt-24 relative z-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {isLoading
          ? Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-32 sm:h-48 bg-white/80 backdrop-blur-md rounded-[2rem] animate-pulse border border-white" />
            ))
          : statsConfig?.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group cursor-default"
              >
                {/* Premium Glow Effect on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-[2rem] transition-opacity duration-500`} />
                
                <div className="bg-white/90 backdrop-blur-xl p-5 sm:p-8 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col items-center text-center">
                  
                  {/* Floating Icon Container */}
                  <div className={`mb-4 p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg ${stat.shadow} transform group-hover:rotate-6 transition-transform duration-300`}>
                    {stat.icon}
                  </div>

                  <div className="relative">
                    {/* Gradient Text for Numbers */}
                    <h3 className={`text-2xl sm:text-4xl font-[1000] tracking-tighter bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value.toLocaleString('bn-BD')}
                    </h3>
                    
                    {/* Label with increased letter spacing */}
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                      {stat.label}
                    </p>
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={14} className="text-slate-300" />
                  </div>
                </div>
              </motion.div>
            ))}
      </div>
    </div>
  );
}

export default ImpactState;