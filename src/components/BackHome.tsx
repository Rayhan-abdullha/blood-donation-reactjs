import { useNavigate } from "react-router-dom";

export default function BackHome({className}: {className?: string}) {
    const navigate = useNavigate();
    return (
    <button 
        onClick={() => navigate("/")}
        className={`${className} flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-slate-600 font-bold text-sm shadow-sm hover:bg-white hover:text-red-600 transition-all active:scale-95 group`}
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span>হোম পেজ (Home)</span>
      </button>
    )
}