import { useState, useEffect, useMemo } from 'react';
import { Phone, MapPin, Search, Navigation } from 'lucide-react';
import MapSection from './Map';
import LoadingSpinner from '../../components/Loadder';
import DonorCardSkeleton from './DonorSkeleton';
import useGetAllDonors from '../../hooks/useGetAlldonors';

const DonorSearch = () => {
  // --- States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<null | { latitude: number; longitude: number }>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredDonors, setFilteredDonors] = useState<any[]>([]);
  const [maxDistance, setMaxDistance] = useState(500);

  // --- API Data ---
  const { data: donorResponse, isLoading: apiLoading } = useGetAllDonors();
  const donorsList = useMemo(() => donorResponse?.data || [], [donorResponse]);

  // --- Helper: Calculate Days Ago ---
  const calculateDaysAgo = (dateString: string | null) => {
    if (!dateString) return 0;
    const lastDate = new Date(dateString);
    const today = new Date();
    const diffInMs = today.getTime() - lastDate.getTime();
    return Math.max(0, Math.floor(diffInMs / (1000 * 60 * 60 * 24)));
  };

  // --- Helper: Distance Formula ---
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // --- Action: Get User Geolocation ---
  const getUserLocation = () => {
    setLocationLoading(true);
    if (!navigator.geolocation) {
      alert("আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।");
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLocationLoading(false);
      },
      () => {
        setLocationLoading(false);
        alert("লোকেশন পারমিশন না দিলে দূরত্ব হিসেব করা সম্ভব নয়।");
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  // --- Logic: Filtering & Sorting ---
  useEffect(() => {
    if (apiLoading) return;

    setIsFiltering(true);
    const timer = setTimeout(() => {
      let result = [...donorsList];

      // 1. Search Query (Name, Blood Group, or Email)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        result = result.filter(d =>
          d.name?.toLowerCase().includes(q) ||
          d.blood_group?.toLowerCase().includes(q) ||
          d.email?.toLowerCase().includes(q)
        );
      }

      // 2. Map Distances and handle NULL coordinates
      result = result.map(d => {
        if (userLocation && d.latitude && d.longitude) {
          const dist = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            parseFloat(d.latitude),
            parseFloat(d.longitude)
          );
          return { ...d, distance: parseFloat(dist.toFixed(1)) };
        }
        return { ...d, distance: null };
      });

      // 3. Radius Filter (Only if user has location)
      if (userLocation) {
        result = result.filter(d => d.distance === null || d.distance <= maxDistance);
      }

      // 4. Sort: Priority to nearest, then null locations
      result.sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });

      setFilteredDonors(result);
      setIsFiltering(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, userLocation, maxDistance, donorsList, apiLoading]);

  return (
    <div className="min-h-screen py-12 px-4 mt-18 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">
            নিকটস্থ রক্তদাতা <span className="text-red-600 underline underline-offset-8">খুঁজুন</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- SEARCH FILTERS --- */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white sticky top-24 z-20">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Search size={20} className="text-red-600" /> ফিল্টার
              </h3>
              
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
                  disabled={locationLoading}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Navigation size={18} /> {locationLoading ? "আপডেট হচ্ছে..." : "লোকেশন আপডেট করুন"}
                </button>
              </div>
            </div>
          </div>

          {/* --- RESULTS SECTION --- */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* MAP VIEW */}
            <div className="w-full">
              {locationLoading || apiLoading ? (
                <div className="h-[400px] bg-white rounded-[2.5rem] border border-slate-100 flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : userLocation ? (
                <div className="overflow-hidden rounded-[2.5rem] shadow-xl border-4 border-white">
                  {/* Pass only donors with valid coordinates to the Map */}
                  <MapSection 
                    userLocation={userLocation} 
                    donors={filteredDonors.filter(d => d.latitude && d.longitude)} 
                  />
                </div>
              ) : (
                <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 text-blue-600 font-bold text-center">
                  ম্যাপ দেখতে আপনার লোকেশন আপডেট করুন।
                </div>
              )}
            </div>

            {/* DONOR LIST */}
            <div className="space-y-4">
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest px-4">
                {isFiltering ? "আপডেট হচ্ছে..." : `${filteredDonors.length} জন রক্তদাতা পাওয়া গেছে`}
              </p>

              {isFiltering ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <DonorCardSkeleton key={i} />)}
                </div>
              ) : filteredDonors.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                  <span className="text-6xl block mb-4">🔭</span>
                  <p className="text-slate-400 font-bold">দুঃখিত, কোনো দাতা খুঁজে পাওয়া যায়নি।</p>
                </div>
              ) : (
                  filteredDonors.map((donor) => (
                    <div 
                      key={donor.id} 
                      className="relative bg-white p-5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(244,63,94,0.1)] transition-all duration-500 border border-slate-100 hover:border-red-100 group animate-in fade-in slide-in-from-bottom-4"
                    >
                      <div className="flex flex-col lg:flex-row items-center gap-6">
                        
                        {/* 1. BLOOD GROUP BADGE (The Hero Element) */}
                        <div className="relative flex-shrink-0">
                          <div className="w-24 h-24 bg-gradient-to-br from-red-50 to-white text-red-600 rounded-[2rem] flex flex-col items-center justify-center border border-red-50 shadow-inner group-hover:scale-105 transition-transform duration-500">
                            <span className="text-3xl font-black leading-none">{donor.blood_group}</span>
                            <span className="text-[8px] uppercase font-black tracking-[0.2em] mt-1 opacity-60">Group</span>
                          </div>
                          {/* Verification Badge */}
                          {donor.is_verified && (
                            <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white shadow-sm" title="Verified Donor">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                          )}
                        </div>

                        {/* 2. MAIN INFO AREA */}
                        <div className="flex-1 space-y-3 text-center lg:text-left w-full">
                          <div>
                            <h4 className="capitalize text-2xl font-black text-slate-800 tracking-tight group-hover:text-red-600 transition-colors">
                              {donor.name}
                            </h4>
                            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-2">
                              <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${donor.is_available ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${donor.is_available ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
                                {donor.is_available ? 'Available' : 'Unavailable'}
                              </span>
                              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                                <MapPin size={12} className="text-red-500" />
                                {donor.distance !== null ? `${donor.distance} KM Away` : "Unknown Dist."}
                              </span>
                            </div>
                          </div>

                          {/* Address & Email snippet */}
                          <p className="text-slate-400 text-xs font-medium flex items-center justify-center lg:justify-start gap-1">
                            <span className="capitalize truncate max-w-[200px] italic">"{donor.address || 'Address not provided'}"</span>
                          </p>
                        </div>

                        {/* 3. STATS & ACTION BUTTONS */}
                        <div className="flex items-center gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6">
                          
                          {/* Donation Stats */}
                          <div className="flex flex-1 lg:flex-none gap-3">
                            <div className="bg-slate-50/50 rounded-2xl p-3 text-center min-w-[75px] border border-slate-50">
                              <p className="text-xs font-bold text-slate-400 uppercase text-[8px] mb-1">Last Gift</p>
                              <p className="text-xl font-black text-slate-800 leading-none">
                                {calculateDaysAgo(donor.last_donated)}
                              </p>
                              <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">Days</p>
                            </div>
                            
                            <div className="bg-slate-50/50 rounded-2xl p-3 text-center min-w-[75px] border border-slate-50">
                              <p className="text-xs font-bold text-slate-400 uppercase text-[8px] mb-1">Total</p>
                              <p className="text-xl font-black text-slate-800 leading-none">{donor.donated_count || 0}</p>
                              <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">Times</p>
                            </div>
                          </div>

                          {/* Call Action */}
                          <a 
                            href={`tel:${donor.phone}`} 
                            className="bg-slate-900 hover:bg-red-600 text-white p-5 rounded-2xl shadow-lg shadow-slate-200 transition-all duration-300 active:scale-95 group/btn"
                          >
                            <Phone size={24} className="group-hover/btn:rotate-12 transition-transform" />
                          </a>
                        </div>

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