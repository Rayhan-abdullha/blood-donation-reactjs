// import { useQuery } from "@tanstack/react-query";
import LoadingSvg from "../../components/LoadingSvg";
// import api from "../../api/axiosInstance";

export default function PublicRequests() {
  // const { data: requests, isLoading } = useQuery({
  //   queryKey: ["public-blood-requests"],
  //   queryFn: async () => {
  //     const res = await api.get("/blood-requests");
  //     return res.data;
  //   }
  // });

  if (false) return <div className="h-screen flex items-center justify-center"><LoadingSvg /></div>;

  return (
    <div className="min-h-screen bg-slate-50/50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-red-600 font-black text-xs uppercase tracking-[0.3em] bg-red-50 px-4 py-2 rounded-full">
              Live Feed
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              জরুরি রক্তের <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">আবেদনসমূহ</span>
            </h1>
            <p className="text-slate-500 font-medium italic">সরাসরি রক্তদাতার সাথে যোগাযোগ করুন এবং জীবন বাঁচান।</p>
          </div>
          
          <div className="flex gap-3">
             <div className="px-6 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-slate-700">{0} টি সক্রিয় আবেদন</span>
             </div>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[...Array(10)].map((_, id: number) => (
            <div key={id} className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              
              {/* Card Top: Urgency & Blood Group */}
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${true ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-slate-100 text-slate-500'}`}>
                    {true && <span className="flex h-2 w-2 rounded-full bg-white animate-ping"></span>}
                    {true? 'Emergency' : 'Normal'}
                         {/* {req.urgency === 'urgent' && <span className="flex h-2 w-2 rounded-full bg-white animate-ping"></span>} */}
                    {/* {req.urgency === 'urgent' ? 'Emergency' : 'Normal'} */}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold ml-1 uppercase">Post Date: {new Date().toLocaleDateString()}</p>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-red-600 to-rose-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg transform group-hover:rotate-6 transition-transform">
                    <span className="text-xs font-bold leading-none">Group</span>
                    <span className="text-2xl font-black leading-none mt-1">{"A+"}</span>
                  </div>
                </div>
              </div>

              {/* Card Body: Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100/50 group-hover:bg-white transition-colors">
                  <span className="text-xl">🏥</span>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Hospital</p>
                    {/* <p className="font-bold text-slate-800 leading-tight">{req.hospital}</p> */}
                    <p className="font-bold text-slate-800 leading-tight">{"Charfassion Hospital"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100/50 group-hover:bg-white transition-colors">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Location</p>
                    <p className="font-bold text-slate-800 leading-tight">{"Charfassion"}</p>
                    {/* <p className="font-bold text-slate-800 leading-tight">{req.location}</p> */}
                  </div>
                </div>
              </div>

              {/* Description Snippet */}
              {true && (
                <div className="mb-8 px-2">
                  <p className="text-sm text-slate-500 line-clamp-2 italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error rem sed unde ullam fugiat, ipsa modi ipsum necessitatibus rerum itaque libero explicabo. Quisquam nam inventore blanditiis temporibus dicta asperiores voluptate.
                  </p>
                </div>
              )}

              {/* Card Footer: Quantity & Action */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div>
                  <p className="text-xs font-bold text-slate-400">প্রয়োজন: <span className="text-slate-900 font-black">{2} ব্যাগ</span></p>
                </div>
                <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-red-600 transition-all shadow-xl shadow-slate-200 active:scale-95 group-hover:px-10">
                  বিবরণ দেখুন 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {true&& (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <span className="text-6xl mb-6 block opacity-20">📭</span>
            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">কোনো আবেদন নেই</h3>
          </div>
        )}
      </div>
    </div>
  );
}