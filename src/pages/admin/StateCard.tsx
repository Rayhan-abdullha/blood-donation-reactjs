import Card from "../../components/Card";
  const colors: any = {
    red: "text-red-600 bg-red-50",
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    slate: "text-slate-800 bg-slate-100",
  };
function StatCard({ label, val, trend, color }: any) {
  return (
    <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${colors[color]}`}>{trend}</span>
      </div>
      <p className="text-3xl font-[1000] text-slate-900 tracking-tighter">{val}</p>
    </Card>
  );
}
export default StatCard