import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
interface Props {
  title: string;
  menus: Array<{ link: string; name: string }>;
  user: string;
  isMainMenu?: boolean;
  searchBar?: boolean;
}

// আধুনিক সার্চ আইকন
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
export default function Navbar({ title, menus, user, isMainMenu = false, searchBar = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? "py-2" : "py-4"
    }`}>
      <div className={`mx-auto px-4 sm:px-3 max-w-6xl`}>
        <div className={`
          relative flex items-center justify-between transition-all duration-500
          ${scrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] rounded-2xl border border-white/20 py-2 px-5" 
            : "bg-transparent py-2 px-0"}
        `}>
          
          {/* --- LEFT: BRAND LOGO --- */}
          <div className="flex items-center gap-4">
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative overflow-hidden w-10 h-10 bg-gradient-to-tr from-red-600 to-rose-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-200 transition-all duration-500 group-hover:-rotate-6">
                <span className="text-xl z-10">🩸</span>
                <div className="absolute inset-0 bg-white/20 group-hover:translate-y-full transition-transform duration-500"></div>
              </div>
              <div className="flex flex-col">
                <span className={`font-black text-lg leading-tight tracking-tighter ${isMainMenu ? "text-white" : "text-red-600"} group-hover:text-red-600 transition-colors uppercase italic`}>
                  {title}
                </span>
                <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase leading-none">Save Lives</span>
              </div>
            </Link>
          </div>

          {/* --- CENTER: NAVIGATION (Desktop) --- */}
          <div className="hidden md:flex items-center space-x-1">
            {menus.map((item: { link: string; name: string }, id: number) => (
              <NavLink 
                key={id} 
                to={`/${item.link.toLowerCase()}`} 
                className={({ isActive }) => `
                  px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                  ${isActive 
                    ? "bg-red-500 text-white shadow-md shadow-red-100" 
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}
                `}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* --- RIGHT: SEARCH & PROFILE --- */}
          <div className="flex items-center gap-3">
            {searchBar && (
              <NavLink 
                to="/donor/search" 
                className="hidden sm:flex items-center justify-center w-10 h-10 bg-slate-900 text-white rounded-xl hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <SearchIcon className="w-5 h-5" />
              </NavLink>
            )}

            <Link to="/admin/profile" className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="hidden lg:block text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user}</p>
                <div className="flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[9px] text-slate-500 font-bold uppercase">Online</p>
                </div>
              </div>
              <div className="relative p-0.5 rounded-xl bg-gradient-to-tr from-red-500 to-rose-400">
                 <img src="https://i.pravatar.cc/150" className="w-9 h-9 rounded-[10px] border-2 border-white object-cover" alt="user" />
              </div>
            </Link>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <div className={`
        fixed inset-x-4 top-24 transition-all duration-500 md:hidden
        ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"}
      `}>
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/20">
          <div className="flex flex-col gap-4 text-center">
            {menus.map((item: { link: string; name: string }, id: number) => (
              <NavLink 
                key={id} to={`/${item.link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-sm font-black text-slate-700 uppercase tracking-[0.2em] py-3 hover:text-red-500 transition-colors"
              >
                {item.name}
              </NavLink>
            ))}
            {searchBar && (
               <NavLink to="/donor/search" className="bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest">
                  <SearchIcon className="w-5 h-5" /> Search Donors
               </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}