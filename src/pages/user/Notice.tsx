import { AlertCircle } from 'lucide-react'
const Notice = () => {
  return (
    <div className="bg-amber-50 rounded-[2rem] border border-amber-100 p-6 flex gap-4">
        <div className="w-10 h-10 shrink-0 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
        <AlertCircle size={20} />
        </div>
        <div className="space-y-1">
        <h4 className="font-black text-slate-800 text-sm">সতর্কতা</h4>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
            রক্তের গ্রুপ পরিবর্তন করলে সেটি এডমিন দ্বারা যাচাই করার প্রয়োজন হতে পারে।
        </p>
        </div>
    </div>
  )
}

export default Notice