import { Link } from "react-router-dom";

export default function BuyMeCoffee() {
    return (
        <Link
            to="/support" 
            className="fixed bottom-6 right-6 z-[100] group"
            >
            {/* টুলটিপ (Hover করলে দেখাবে) */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
                Support Project ☕
            </span>

            {/* প্রধান বাটন */}
            <button className="relative w-14 h-14 bg-[#FFDD00] text-black rounded-2xl shadow-[0_8px_30px_rgb(255,221,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-300 overflow-hidden">
                {/* পালস ইফেক্ট (পেছনে গোল এনিমেশন) */}
                <span className="absolute inset-0 rounded-2xl bg-yellow-400 animate-ping opacity-20"></span>
                
                {/* কফি আইকন */}
                <span className="text-2xl relative z-10 group-hover:rotate-12 transition-transform duration-300">
                ☕
                </span>
            </button>
            </Link>
    )
}