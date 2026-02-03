import { Calendar, CheckCircle } from "lucide-react"

const ShowDate = ({date}: {date: string}) => {
  return (
        <div className="mt-4 pt-4 border-t border-slate-100/60">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
        {/* Success Ring Icon */}
        <div className="flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full shadow-lg shadow-emerald-200">
            <CheckCircle size={12} className="text-white" />
        </div>

        <div className="flex flex-col">
            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-[0.2em] leading-none mb-1">
            Donation Confirmed
            </span>
            <div className="flex items-center gap-1.5 text-slate-500">
            <Calendar size={10} className="text-slate-400" />
            <p className="text-[10px] font-black uppercase tracking-wider">
                {new Date(date).toLocaleDateString("bn-BD", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
                })}
            </p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ShowDate