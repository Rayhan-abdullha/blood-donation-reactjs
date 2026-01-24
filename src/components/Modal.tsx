import type { SubmitionTypes } from "../pages/support/Support";

type PropTypes = {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<SubmitionTypes>>;
};

const Modal: React.FC<PropTypes> = function ({ status, setStatus }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setStatus(null)}></div>
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full relative z-10 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in duration-300">
            
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg ${
              status === "success" ? "bg-green-100 text-green-600 shadow-green-100" : "bg-red-100 text-red-600 shadow-red-100"
            }`}>
              {status === "success" ? "✅" : "❌"}
            </div>

            <h2 className="text-2xl font-black text-slate-800 mb-2">
              {status === "success" ? "ধন্যবাদ!" : "ওহ না!"}
            </h2>
            
            <p className="text-slate-500 font-medium mb-8">
              {status === "success" 
                ? "আপনার ডোনেশন তথ্যটি আমরা পেয়েছি। ভেরিফিকেশন শেষ হলে আপনাকে জানানো হবে।" 
                : "আপনার প্রদানকৃত তথ্যগুলো সঠিক নয়। অনুগ্রহ করে আবার চেক করুন।"}
            </p>

            <button 
              onClick={() => setStatus(null)}
              className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg ${
                status === "success" 
                ? "bg-green-600 text-white hover:bg-green-700 shadow-green-200" 
                : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200"
              }`}
            >
              {status === "success" ? "ঠিক আছে" : "আবার চেষ্টা করুন"}
            </button>
          </div>
        </div>
    )
}
export default Modal
