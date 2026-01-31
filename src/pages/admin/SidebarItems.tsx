function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm
      ${active ? 'bg-red-600 text-white shadow-xl shadow-red-900/20 translate-x-2' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
    >
      {icon} {label}
    </button>
  );
}

export default SidebarItem