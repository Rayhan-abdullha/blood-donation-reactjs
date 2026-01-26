import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import BuyMeCoffee from "./BuyMeCoffee";
import NavLinkMenu from "./NavLink";
import Logout from "../pages/auth/Logout";
import { useAuthStore } from "../store/authStore";

interface Props {
  title: string;
  othersMenu?: Array<{ link: string; name: string }>;
  isMainMenu?: boolean;
  searchBar?: boolean;
}

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const dashboardMenu = [
  { link: "donor", name: "ড্যাশবোর্ড" },
  { link: "user", name: "ড্যাশবোর্ড" },
  { link: "admin", name: "ড্যাশবোর্ড" },
];

const mainMenu = [
  { link: "home", name: "হোম" },
  { link: "about", name: "আমাদের সম্পর্কে" },
];

export default function Navbar({ title, othersMenu = [], isMainMenu = false, searchBar = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, token } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allMenus = [...mainMenu, ...othersMenu];

  return (
    <nav className={`${!isMainMenu && !scrolled ? "bg-slate-100" : "bg-transparent"} py-2 fixed top-0 w-full z-50 transition-all duration-500`}>
      <div className="mx-auto px-4 sm:px-3 max-w-6xl">
        <div className={`relative flex items-center justify-between transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl py-2 px-5" : "py-2 px-0"}`}>
          
          {/* --- LEFT: BRAND --- */}
          <Link to="/" className="group flex items-center gap-3">
            {/* --- BRAND LOGO --- */}
            <div className="relative group flex items-center justify-center">
              {/* Hover outer glow ring */}
              <div className="absolute inset-0 bg-red-200 rounded-2xl scale-0 group-hover:scale-125 transition-transform duration-500 opacity-40 blur-sm"></div>

              <div className="relative w-11 h-11 bg-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(220,38,38,0.18)] flex items-center justify-center border border-slate-100 group-hover:border-red-200 transition-all duration-300">
                
                {/* Inner gradient box */}
                <div className="w-8 h-8 bg-gradient-to-tr from-red-600 to-rose-500 rounded-xl flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform duration-500">
                  
                  {/* Heart SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-white drop-shadow"
                    fill="currentColor"
                  >
                    <path d="M12 21s-6.7-4.35-9.33-7.4C.87 11.3 1.4 7.9 4.2 6.4c2-1.1 4.3-.5 5.8 1.1 1.5-1.6 3.8-2.2 5.8-1.1 2.8 1.5 3.3 4.9 1.53 7.2C18.7 16.65 12 21 12 21z" />
                  </svg>

                </div>
              </div>
            </div>
            <div className="flex flex-col mt-1">
              <span className="font-black text-lg text-red-600 uppercase italic leading-none">{title}</span>
              <span className={`${scrolled ? "text-red-500" : "text-slate-400"} text-[10px] font-bold tracking-[0.2em] uppercase`}>Save Lives</span>
            </div>
          </Link>

          {/* --- CENTER: DESKTOP MENU --- */}
          <div className="hidden md:flex items-center space-x-3">
            {allMenus.map((item, id) => (
              <NavLinkMenu key={id} item={item} />
            ))}
            {dashboardMenu.map((item, id) => (
              user?.role === item.link && <NavLinkMenu key={id} item={item} />
            ))}
            {!token && <NavLinkMenu singleMinue={true} item={{ name: "সাইন ইন", link: "auth/login" }} />}
          </div>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="flex items-center gap-3">
            {token && <div className="hidden md:block"><Logout /></div>}
            {searchBar && (
              <NavLink to="/donor/search" className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all">
                <SearchIcon className="w-5 h-5" />
              </NavLink>
            )}

            {token && (
              <Link to="/home/profile" className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200 ">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">{user?.name}</p>
                  <p className="text-[9px] text-green-500 font-bold uppercase">Online</p>
                </div>
                  <div className="relative group flex items-center justify-center">
                <div className="absolute inset-0 bg-red-200 rounded-2xl scale-0 group-hover:scale-125 transition-transform duration-500 opacity-40 blur-sm"></div>
                    <img src="https://i.pravatar.cc/150" className="w-9 h-9 rounded-xl border-2 border-white object-cover" alt="user" />
                  </div>
              </Link>
            )}

            {/* Mobile Toggle Button */}
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`relative md:hidden w-11 h-11 flex flex-col items-center justify-center rounded-2xl transition-all duration-500 active:scale-90 shadow-lg group overflow-hidden ${
                isOpen 
                ? "bg-slate-900 shadow-slate-200" 
                : "bg-gradient-to-br from-red-600 to-rose-500 shadow-red-200"
              }`}
            >
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Animated Bars */}
              <div className="flex flex-col gap-1.5 z-10">
                <span className={`h-0.5 bg-white rounded-full transition-all duration-500 transform origin-center ${
                  isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
                }`}></span>
                
                <span className={`h-0.5 bg-white rounded-full transition-all duration-500 ${
                  isOpen ? "w-0 opacity-0 -translate-x-2" : "w-4 ml-auto"
                }`}></span>
                
                <span className={`h-0.5 bg-white rounded-full transition-all duration-500 transform origin-center ${
                  isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"
                }`}></span>
              </div>

              {/* Background Pulse (Only when closed) */}
              {!isOpen && (
                <span className="absolute inset-0 rounded-2xl bg-red-500/20 animate-ping pointer-events-none"></span>
              )}
            </button>
            
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU (DESIGN FIXED) --- */}
      <div className={`fixed inset-x-4 top-24 transition-all duration-500 md:hidden z-50 ${isOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-10 opacity-0 scale-95 pointer-events-none"}`}>
        <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/60">
          
          <div className="flex flex-col gap-1">
            
            {/* User Profile Card (Premium Look) */}
            {token && (
              <div className="flex items-center justify-between p-4 bg-slate-50/80 rounded-3xl mb-3 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150" className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm" alt="user" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="text-left">
                    <p className="font-black text-slate-800 text-sm uppercase tracking-tight">{user?.name}</p>
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{user?.role} Account</p>
                  </div>
                </div>
                <Link to="/home/profile" onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-slate-400 shadow-sm">
                   <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                </Link>
              </div>
            )}

            {/* Navigation Links Group */}
            <div className="space-y-1">
              {allMenus.map((item, id) => (
                <NavLink 
                  key={id} to={`/${item.link.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)}
                  className={({isActive}) => `flex items-center px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${isActive ? 'bg-red-600 text-white shadow-lg shadow-red-100' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                  {item.name}
                </NavLink>
              ))}
              
              {token && dashboardMenu.map((item, id) => (
                user?.role === item.link && (
                  <NavLink key={id} to={`/${item.link}`} onClick={() => setIsOpen(false)} className="flex items-center px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:bg-slate-200">
                    {item.name}
                  </NavLink>
                )
              ))}
            </div>

            {/* Action Buttons Section */}
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
               {!token ? (
                  <NavLink to="/auth/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">
                    সাইন ইন করুন
                  </NavLink>
               ) : (
                  <div className="flex flex-col gap-2">
                    <Logout />
                  </div>
               )}

               <Link to="/support" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-[#FFDD00] text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-yellow-50">
                 ☕ Buy me a coffee
               </Link>
            </div>
          </div>
        </div>
      </div>
      <BuyMeCoffee />
    </nav>
  );
}