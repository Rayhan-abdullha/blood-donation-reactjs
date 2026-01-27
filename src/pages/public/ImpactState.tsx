
function ImpactState() {
  return (
     <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
            { label: "নিবন্ধিত দাতা", value: "১২৫০+", icon: "👥" },
            { label: "সফল দান", value: "৮৫০+", icon: "✅" },
            { label: "বর্তমান অনুরোধ", value: "১৫", icon: "🕒" },
            { label: "জেলাভিত্তিক সেবা", value: "৬৪", icon: "📍" },
        ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 text-center">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-2xl font-black text-slate-800">{stat.value}</p>
            <p className="text-xs font-bold text-slate-400 uppercase">{stat.label}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default ImpactState