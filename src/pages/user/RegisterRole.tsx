import { ExternalLink, Shield } from 'lucide-react'

const RegisterRole = () => {
  return (
        <div className="space-y-6">
    {/* Role Card */}
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <Shield size={120} />
        </div>
        
        <div className="relative z-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Registered Role</p>
        <h3 className="text-3xl font-black text-red-500 uppercase mb-6 tracking-tighter">Donor</h3>
        
        <div className="space-y-3">
            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-2xl flex items-center justify-between group/btn transition-all">
            <span className="text-xs font-black uppercase tracking-widest">Donation History</span>
            <ExternalLink size={16} className="text-slate-400 group-hover/btn:text-white" />
            </button>
            <button className="w-full bg-red-600 hover:bg-red-500 p-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20">
            <span className="text-xs font-black uppercase tracking-widest">Find Requests</span>
            </button>
        </div>
        </div>
    </div>
    </div>
  )
}

export default RegisterRole