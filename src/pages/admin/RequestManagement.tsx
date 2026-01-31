import { MoreHorizontal, RefreshCcw } from "lucide-react";
import Badge from "../../components/Badge";
import { MOCK_REQUESTS } from "./AdminDashboard";

function RequestManagementView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Blood Requests Feed</h3>
        <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-red-600 transition-colors">
          <RefreshCcw size={14}/> Sync Data
        </button>
      </div>

      <div className="grid gap-4">
        {MOCK_REQUESTS.map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-red-200 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner">
                {req.group || "A+"}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-slate-800">{req.patient}</h4>
                  <Badge text={req.urgency} color={req.urgency === "Emergency" ? "red" : "blue"} />
                </div>
                <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                  🏥 {req.hospital} • <span className="text-xs font-medium">ID: #REQ-{req.id}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Assigned Donor</p>
                <p className="text-sm font-bold text-slate-700">{req.donor || "Searching..."}</p>
              </div>
              <div className="flex items-center gap-3 border-l pl-10 border-slate-100">
                <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest
                  ${req.status === 'Accepted' ? 'bg-green-100 text-green-600' : 
                    req.status === 'Declined' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                  {req.status}
                </div>
                <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all">
                  <MoreHorizontal size={18}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RequestManagementView