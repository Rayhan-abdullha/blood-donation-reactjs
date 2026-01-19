import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface Props {
  title: string;
  menus: Array<{ link: string; name: string }>;
  user: string;
}

export default function Navbar({ title, menus, user }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Responsive Link Logic
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-bold transition-all duration-200 uppercase tracking-wider ${
      isActive
        ? "text-red-500 border-b-2 border-red-500 pb-1"
        : "text-slate-600 hover:text-red-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 shadow-sm font-sans">
      {/* --- UPPER BAR (Brand & User) --- */}
      <div className="bg-white border-b border-slate-100 px-6 py-3 flex justify-between items-center">
        <h1 className="font-black text-2xl flex items-center gap-2 text-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-red-300 text-white w-8 h-8 flex items-center justify-center rounded-lg not-italic text-base">🩸</span>
            {title}
          </Link>
        </h1>

        {/* Desktop User Info */}
        <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-1.5 rounded-2xl border border-slate-100">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Authenticated</p>
            <p className="text-sm font-bold text-slate-700 leading-none">{user}</p>
          </div>
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-9 h-9 rounded-xl border-2 border-white shadow-sm"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* --- LOWER BAR (Navigation Menus) --- */}
      <div className={`
        bg-white/80 backdrop-blur-md px-6 border-b border-slate-200 
        transition-all duration-300 ease-in-out
        ${isOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 md:max-h-16 py-0 md:py-3 opacity-0 md:opacity-100 overflow-hidden"}
      `}>
        <div className="flex flex-col md:flex-row gap-6 md:items-center max-w-6xl mx-auto">
          {menus.map((item, id) => (
            <NavLink 
              key={id} 
              to={`/${item.link.toLowerCase()}`} 
              className={linkClass}
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {item.name}
            </NavLink>
          ))}
          
          {/* Mobile User Info (Only visible in mobile menu) */}
          <div className="md:hidden pt-4 border-t border-slate-100 flex items-center gap-3">
            <img src="https://i.pravatar.cc/100" className="w-10 h-10 rounded-full" />
            <span className="font-bold text-slate-700">{user}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}