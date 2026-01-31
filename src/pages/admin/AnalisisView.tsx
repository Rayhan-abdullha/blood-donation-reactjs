import { Activity, RefreshCcw } from "lucide-react";
import Card from "../../components/Card";

// Reuse your AnalyticsView logic here but added polish
function AnalyticsView() {
  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
      <Card className="lg:col-span-2 p-8 border-none shadow-sm">
        <h3 className="font-black text-slate-800 mb-8 flex items-center gap-2 text-lg">
          <Activity size={20} className="text-red-600"/> Request vs Fulfillment Trends
        </h3>
        <div className="h-64 w-full bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 italic">
          
          <p className="mt-4 font-bold text-xs uppercase tracking-widest">Chart Visualization Engine Loading...</p>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-8 border-none shadow-sm bg-slate-900 text-white">
          <h3 className="font-black mb-6 text-slate-400 text-xs uppercase tracking-widest">Avg. Match Time</h3>
          <p className="text-5xl font-[1000] text-red-500 tracking-tighter">14.2<span className="text-lg ml-2">min</span></p>
          <div className="mt-4 flex items-center gap-2 text-green-400 text-xs font-bold">
            <RefreshCcw size={12}/> 12% faster than last week
          </div>
        </Card>
        
        <Card className="p-8 border-none shadow-sm">
           <h3 className="font-black text-slate-800 mb-6 text-sm uppercase">Stock by Group</h3>
           <div className="space-y-4">
              {['A+', 'O+', 'B+', 'AB-'].map((g, i) => (
                <div key={g} className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-400 w-8">{g}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${90 - (i*20)}%` }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-800">{90 - (i*20)}%</span>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
}
export default AnalyticsView