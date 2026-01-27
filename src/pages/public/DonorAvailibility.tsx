import { Link } from "react-router-dom"
import DonorDetailsModal from "../donor/DonorDetails";

interface PropTypes {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    selectedDonor: any;
    handleViewDetails: (donorData: any) => void;
}

const DonorAvailibility = ({isModalOpen, setIsModalOpen, selectedDonor, handleViewDetails }:PropTypes) => {
    return (
              <section className="bg-slate-50 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">উপলব্ধ রক্তদাতা (Available Donors)</h2>
                <p className="text-slate-500 mt-2 font-medium italic">আপনার প্রয়োজনীয় গ্রুপের দাতা খুঁজে নিন</p>
              </div>
              <Link to="/donor/search" className="text-red-600 font-bold hover:underline hidden md:block">
                সবাইকে দেখুন (View All) →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {["A+", "O+", "B+", "AB+"].map((bg, i) => (
                <div 
                  onClick={() => handleViewDetails({ 
                    name: "John Doe", 
                    blood_group: bg, 
                    address: "Dhaka, Bangladesh",
                    phone: "017XXXXXXXX",
                    is_verified: true,
                    is_available: true,
                    pic: "https://i.pravatar.cc/150?u=fake",
                    created_at: "2023-01-01"
                  })} 
                  key={i} 
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:ring-2 hover:ring-red-500 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl font-black">
                      {bg}
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Available
                    </span>
                  </div>
                  <p className="text-slate-800 font-bold">John Doe</p>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                    <span>📍</span> Dhaka, Bangladesh
                  </div>
                  <div className="block w-full"> 
                      <button
                        className="cursor-pointer w-full mt-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all"
                      >
                        বিবরণ দেখুন (View Details)
                      </button>
                  </div>
                </div>
              ))}
            </div>

            <DonorDetailsModal
              isOpen={isModalOpen} 
              donor={selectedDonor} 
              onClose={() => setIsModalOpen(false)} 
            />
          </div>
        </section>
  )
}

export default DonorAvailibility