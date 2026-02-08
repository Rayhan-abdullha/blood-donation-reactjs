
function DetailBox({ icon, label, value, isLink, color = "slate" }: any) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-600 bg-green-50",
    amber: "text-amber-600 bg-amber-50",
    red: "text-red-500 bg-red-50",
    slate: "text-slate-400 bg-slate-50"
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group hover:border-slate-300 transition-all">
      <div className="flex items-center gap-2 mb-2 text-slate-400">
        <span className={`p-1.5 rounded-lg ${colorMap[color]}`}>{icon}</span>
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      {isLink ? (
        <a href={`tel:${value}`} className="text-sm font-black text-blue-600 hover:underline">{value || "N/A"}</a>
      ) : (
        <p className={`text-sm font-black capitalize ${color === 'amber' ? 'text-amber-600' : 'text-slate-700'}`}>{value}</p>
      )}
    </div>
  );
}
export default DetailBox