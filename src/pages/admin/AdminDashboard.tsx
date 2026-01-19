import { useState } from "react";
import Card from "../../components/Card";
import Badge from "../../components/Badge";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("verify");

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col p-6 sticky top-0 h-screen">
        <h2 className="text-xl font-black flex items-center gap-2 mb-10 italic">
          <span className="bg-red-600 p-1.5 rounded-lg not-italic">🩸</span> ADMIN PANEL
        </h2>
        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab("verify")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'verify' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}>
            <span>🔍</span> Verify Donors
          </button>
          <button onClick={() => setActiveTab("requests")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'requests' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}>
            <span>📑</span> Manage Requests
          </button>
          <button onClick={() => setActiveTab("analytics")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}>
            <span>📊</span> Analytics
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5">
            <span>🛡️</span> Security Logs
          </button>
        </nav>
        <div className="pt-6 border-t border-white/10">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">System Health</p>
          <div className="mt-2 flex items-center gap-2 text-green-400 text-sm italic">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Server: Optimal
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-4 md:p-8">
        
        {/* Header Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Donors", val: "4,210", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Pending Verification", val: "18", color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Active Requests", val: "42", color: "text-red-600", bg: "bg-red-50" },
            { label: "Today's Fulfillment", val: "92%", color: "text-green-600", bg: "bg-green-50" },
          ].map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">{s.label}</p>
              <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* STEP 1: VERIFY DONORS SECTION */}
        {activeTab === "verify" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">নতুন রেজিস্ট্রেশন যাচাইকরণ (New Registrations)</h3>
              <input type="text" placeholder="Search donors..." className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-100" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
                  <tr>
                    <th className="px-6 py-4">Donor Name</th>
                    <th className="px-6 py-4">Blood Group</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Documents</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3].map((_, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">Abdur Rahman</td>
                      <td className="px-6 py-4 font-black text-red-600">O+</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">Dhaka, BD</td>
                      <td className="px-6 py-4"><button className="text-blue-600 font-bold text-xs hover:underline">View NID/Card</button></td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-green-100 hover:bg-green-700">Approve</button>
                        <button className="bg-white border border-slate-200 text-slate-400 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-500">Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
{/* STEP 2: MANAGE REQUESTS SECTION */}
{activeTab === "requests" && (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    
    {/* Filter & Search Bar */}
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
      <input 
        type="text" 
        placeholder="হাসপাতাল বা গ্রুপ দিয়ে খুঁজুন (Search by Hospital/Group)..." 
        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-red-500"
      />
      <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none">
        <option>All Groups</option>
        <option>Emergency Only</option>
        <option>Pending Only</option>
      </select>
    </div>

    {/* Requests Table */}
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">পেশেন্ট (Patient)</th>
              <th className="px-6 py-4 text-center">গ্রুপ (Group)</th>
              <th className="px-6 py-4">হাসপাতাল ও লোকেশন</th>
              <th className="px-6 py-4">জরুরি অবস্থা</th>
              <th className="px-6 py-4">স্ট্যাটাস (Status)</th>
              <th className="px-6 py-4 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { id: 1, name: "Sabbir Ahmed", bg: "O+", hosp: "DMCH, Dhaka", urgency: "Emergency", status: "Active" },
              { id: 2, name: "Rahima Begum", bg: "AB-", hosp: "Apollo, CTG", urgency: "Normal", status: "Fulfilled" },
              { id: 3, name: "Tanvir Hossain", bg: "B+", hosp: "Square, Dhaka", urgency: "Emergency", status: "Pending" }
            ].map((req) => (
              <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-700">{req.name}</td>
                <td className="px-6 py-4">
                  <div className="mx-auto w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-black">
                    {req.bg}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-slate-700">{req.hosp}</p>
                  <p className="text-[10px] text-slate-400">ID: #REQ-00{req.id}</p>
                </td>
                <td className="px-6 py-4">
                  <Badge 
                    text={req.urgency} 
                    color={req.urgency === "Emergency" ? "red" : "blue"} 
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <span className={req.status === "Fulfilled" ? "text-green-600" : "text-amber-600"}>
                    ● {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400" title="View Details">👁️</button>
                  <button className="p-2 hover:bg-red-50 rounded-lg text-red-400" title="Delete Spam">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
        {/* STEP 3: ANALYTICS PREVIEW */}
        {activeTab === "analytics" && (
          <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-500">
            <Card className="p-6">
              <h3 className="font-bold mb-6">Blood Group Distribution</h3>
              <div className="space-y-4">
                {["A+", "O+", "B+", "AB+"].map((group, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>{group}</span>
                      <span>{80 - (i * 15)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: `${80 - (i * 15)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center text-center">
              <h3 className="font-bold mb-2">Average Response Time</h3>
              <p className="text-5xl font-black text-slate-800">14<span className="text-xl">min</span></p>
              <p className="text-green-500 text-sm font-bold mt-2">↓ 12% from last month</p>
              <div className="mt-6 w-full h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 italic">
                 
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}