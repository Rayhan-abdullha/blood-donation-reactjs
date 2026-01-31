import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const HeroSection = () => {
  const { user } = useAuthStore()
  
  return (
    <section className="relative bg-slate-900 pt-20 pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/10 skew-x-12 translate-x-20"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10 mt-10">
            <span className="inline-block bg-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-6 border border-red-500/30">
              🩸 রক্তদান মহৎ দান (Blood Donation is Noble)
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              রক্ত দিন, জীবন বাঁচান <br />
              <span className="text-red-500">Donate Blood, Save Lives</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
              রক্তদাতা এবং রোগীদের মধ্যে তাৎক্ষণিক সংযোগ স্থাপন করাই আমাদের লক্ষ্য। আপনার একটি ছোট উদ্যোগ কারো জীবনে বড় হাসি ফোটাতে পারে।
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user?.role !== "donor" && <Link to="/donor/be-donor">
                <button className="cursor-pointer px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-600/20 transition-all active:scale-95">
                  রক্তদাতা হন (Become a Donor)
                </button>
              </Link>
              }
              <Link to="/blood/request">
            <button className={`cursor-pointer px-8 py-4 ${user?.role === "donor" ? "bg-red-500 hover:bg-red-600 text-white" : "bg-white/10 hover:bg-white/20 text-white border border-white/20"}  rounded-2xl font-bold text-lg backdrop-blur-md transition-all`}>
                  রক্তের জন্য আবেদন (Request Blood)
                </button>
              </Link>
            </div>
          </div>
        </section>
  )
}

export default HeroSection