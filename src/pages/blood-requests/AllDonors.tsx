// AllRequests.tsx
import { useQuery } from "@tanstack/react-query";
// import api from "../../api/axiosInstance";

export default function AllAvailableDonors() {
  const { data: requests } = useQuery({
    queryKey: ["all-blood-requests"],
    queryFn: async () => {
      // const res = await api.get("/blood-requests");
      // return res.data;
      return [];
    }
  });

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="mb-10">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">আপনার A+ রক্ত দেয়ার জন্য এরা প্রস্তুত</h2>
        <div className="h-1 w-12 bg-red-600 mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests?.map((req: any) => (
          <div key={req.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${req.urgency === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                {req.urgency === 'urgent' ? 'Emergency' : 'Normal'}
              </div>
              <div className="text-2xl font-black text-red-600 bg-red-50 w-12 h-12 flex items-center justify-center rounded-2xl">
                {req.blood_type}
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 italic">
                🏥 {req.hospital}
              </h3>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                📍 {req.location}
              </p>
              <p className="text-xs text-slate-400">
                🩸 {req.quantity} ব্যাগ প্রয়োজন
              </p>
            </div>

            <button className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-red-600 transition-all shadow-lg shadow-slate-200">
              রক্ত দান করতে চাই
            </button>
          </div>
        ))}
      </div>
      {true && (
  <div className="mt-12 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl relative z-20">
          <div className="flex justify-between">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="p-2 bg-red-50 rounded-lg text-red-600">🔍</span>
              ৩ - জন রক্তদাতা পাওয়া গেছে
            </h3>
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            
          </h3>
    </div>

    {true ? (
      <div className="grid grid-cols-1 gap-4">
        {[1,2,3].map((_, id) => (
          <div key={id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-red-200 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600 border-2 border-white shadow-sm">
                {"A+"}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{"Rayhan Hossain"}</h4>
                <p className="text-xs text-slate-500">{"Dhaka, Bangladesh"}</p>
              </div>
            </div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 transition-colors">
              যোগাযোগ করুন
            </button>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-10">
        <div className="text-5xl mb-4 text-slate-300 italic font-black">!</div>
        <p className="text-slate-600 font-bold">দুঃখিত, এই মুহূর্তে কোনো দাতা পাওয়া যায়নি।</p>
        <p className="text-xs text-slate-400 mt-1">আপনার আবেদনটি সিস্টেমে জমা রাখা হয়েছে।</p>
      </div>
    )}
  </div>
)}
    </div>
  );
}