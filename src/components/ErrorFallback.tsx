import type { FallbackProps } from "react-error-boundary";
export function GlobalErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full text-center bg-white p-12 rounded-[3rem] shadow-2xl border border-red-100">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner">
          ⚠️
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-4">কিছু একটা ভুল হয়েছে!</h1>
        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
          দুঃখিত, অ্যাপ্লিকেশনটি লোড করার সময় একটি সমস্যা হয়েছে। আমাদের টিমকে জানানো হয়েছে।
        </p>
        
        {/* Technical Error (Hidden for normal users, but useful for debugging) */}
        <div className="bg-slate-50 p-4 rounded-2xl mb-8 text-left overflow-auto max-h-32 border border-slate-100">
          <code className="text-[10px] text-red-500 font-mono">{error instanceof Error ? error.message : String(error)}</code>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={resetErrorBoundary}
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-red-200 hover:bg-red-700 transition-all"
          >
            আবার চেষ্টা করুন (Try Again)
          </button>
          <a 
            href="/" 
            className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            হোম পেজে ফিরে যান
          </a>
        </div>
      </div>
    </div>
  )
}