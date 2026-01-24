import { useState, useEffect } from 'react';
import MapSection from './Map';
import LoadingSpinner from '../../components/Loadder';
import DonorCardSkeleton from './DonorSkeleton';
const DonorSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<null | {latitude: number, longitude: number}>(null);
  const [loading, setLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false); // ফিল্টারিং লোডার
  const [allDonors, setAllDonors] = useState<any[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<any[]>([]);
  const [maxDistance, setMaxDistance] = useState(500);

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    const sampleDonors = [
      { id: 1, name: "Rahim Khan", bloodGroup: "O+", latitude: 23.8103, longitude: 90.4125, phone: "01711-123456" },
      { id: 2, name: "Karim Hossain", bloodGroup: "A+", latitude: 23.6850, longitude: 90.3563, phone: "01819-987654" },
      { id: 3, name: "Sadia Akter", bloodGroup: "B-", latitude: 23.8700, longitude: 90.4000, phone: "01912-345678" },
      { id: 4, name: "Faruk Ahmed", bloodGroup: "AB+", latitude: 24.0000, longitude: 90.3000, phone: "01678-901234" },
      { id: 5, name: "Nusrat Jahan", bloodGroup: "O-", latitude: 23.7500, longitude: 90.3800, phone: "01755-667788" },
    ];
    setAllDonors(sampleDonors);
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLoading(false);
      },
      () => setLoading(false)
    );
  };

  useEffect(() => {
    if (!userLocation) return;
    
    setIsFiltering(true); // ফিল্টারিং শুরু

    const timer = setTimeout(() => {
      let result = [...allDonors];

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        result = result.filter(d => 
          d.name.toLowerCase().includes(q) || d.bloodGroup.toLowerCase().includes(q)
        );
      }

      result = result.map(d => {
        const dist = getDistance(userLocation.latitude, userLocation.longitude, d.latitude, d.longitude);
        return { ...d, distance: dist.toFixed(1) };
      }).filter(d => Number(d.distance) <= maxDistance);

      setFilteredDonors(result);
      setIsFiltering(false); // ফিল্টারিং শেষ
    }, 400); // একটি ছোট ডিলে যাতে স্কেলিটন এনিমেশনটি বোঝা যায়

    return () => clearTimeout(timer);
  }, [searchQuery, userLocation, maxDistance, allDonors]);

  return (
    <div className="min-h-screen py-12 px-4 font-sans mt-18 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">
            নিকটস্থ রক্তদাতা <span className="text-red-600 underline underline-offset-8">খুঁজুন</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* সার্চ ফিল্টার কার্ড */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white sticky top-24 z-20">
              <h3 className="text-xl font-bold text-slate-800 mb-6">🔍 সার্চ ফিল্টার</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">নাম বা রক্তের গ্রুপ</label>
                  <input
                    type="text"
                    placeholder="উদা: O+ বা রহিম"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full mt-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">দূরত্ব (ব্যাসার্ধ)</label>
                    <span className="text-red-600 font-black text-lg">{maxDistance} কিমি</span>
                  </div>
                  <input
                    type="range" min="1" max="1000" step="10"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                <button 
                  onClick={getUserLocation}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
                >
                  📍 লোকেশন আপডেট করুন
                </button>
              </div>
            </div>
          </div>

          {/* ম্যাপ এবং ডোনার লিস্ট */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* ম্যাপ সেকশন */}
            <div className="w-full transition-all duration-500">
              {loading ? (
                <div className="h-[400px] bg-white rounded-[2.5rem] border border-slate-100 flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : userLocation ? (
                <div className="relative group">
                  <h3 className="text-xl font-bold text-slate-800 ml-4 mb-4">📍 লাইভ ম্যাপ ভিউ</h3>
                  <div className="overflow-hidden rounded-[2.5rem] shadow-xl border-4 border-white">
                    <MapSection userLocation={userLocation} donors={filteredDonors} />
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 text-blue-600 font-bold text-center animate-pulse">
                  ম্যাপ দেখতে আপনার লোকেশন পারমিশন দিন।
                </div>
              )}
            </div>

            {/* ডোনার লিস্ট */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-4">
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                  {isFiltering ? "আপডেট হচ্ছে..." : `${filteredDonors.length} জন রক্তদাতা`}
                </p>
              </div>

              {isFiltering ? (
                // ফিল্টারিং করার সময় ৩টি স্কেলিটন দেখাবে
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <DonorCardSkeleton key={i} />)}
                </div>
              ) : filteredDonors.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                  <span className="text-6xl block mb-4">🔭</span>
                  <p className="text-slate-400 font-bold">এই এলাকায় কোনো রক্তদাতা পাওয়া যায়নি।</p>
                </div>
              ) : (
                filteredDonors.map((donor) => (
                  <div key={donor.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-red-100 flex flex-col md:flex-row justify-between items-center group animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center text-2xl font-black shadow-inner group-hover:scale-110 transition-transform">
                        {donor.bloodGroup}
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-slate-800">{donor.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> সক্রিয়
                          </span>
                          <span className="text-slate-400 text-xs font-bold tracking-tight">📍 {donor.distance} কিমি দূরে</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 w-full md:w-auto">
                      <a href={`tel:${donor.phone}`} className="block w-full px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-red-600 transition-all text-center shadow-lg shadow-slate-100">
                        কল করুন
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorSearch;