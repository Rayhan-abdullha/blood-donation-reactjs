import {  Link, NavLink } from "react-router-dom";

const NavLinkMenu = ({ item, singleMinue = false }: {
    item: { name: string, link: string }, singleMinue?: boolean
}) => {
  return (
    !singleMinue ? <NavLink
        to={`/${item.link.toLowerCase()}`} 
        className={({ isActive }: { isActive: boolean }) => `
            px-4 py-[10px] rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
            ${isActive 
            ? "bg-red-500 text-white shadow-md shadow-red-100" 
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}
        `}
        >
        {item.name}
    </NavLink> : <Link
        to={`/${item.link.toLowerCase()}`} 
        className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300">
        {item.name}
    </Link>
)
}

export default NavLinkMenu