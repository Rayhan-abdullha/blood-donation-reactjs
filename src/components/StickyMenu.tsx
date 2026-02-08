import { Activity, Heart, Home, Search, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const StickyMenu = () => {
  return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f172a] backdrop-blur-xl border-t border-slate-100 px-8 py-4 flex justify-between items-center z-[50] rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <Link to="/" className="flex flex-col items-center gap-1 text-slate-400">
          <Home size={22} />
          <span className="text-[9px] font-black uppercase">Home</span>
        </Link>
        <Link to={"/donor/search"} className="flex flex-col items-center gap-1 text-slate-400">
          <Search size={22} />
          <span className="text-[9px] font-black uppercase">Search</span>
        </Link>
        <div className="relative -mt-12">
            <div className="w-14 h-14 bg-red-600 rounded-2xl shadow-lg shadow-red-200 flex items-center justify-center text-white border-4 border-white">
                <Heart size={24} fill="currentColor" />
            </div>
        </div>
        <Link to={"/blood/public-requests"} className="flex flex-col items-center gap-1 text-slate-400">
          <Activity size={22} />
          <span className="text-[9px] font-black uppercase">Feed</span>
        </Link>
        <Link to={"/home/profile"} className="flex flex-col items-center gap-1 text-slate-400">
          <User size={22} />
          <span className="text-[9px] font-black uppercase">Profile</span>
        </Link>
      </nav>
  )
}

export default StickyMenu