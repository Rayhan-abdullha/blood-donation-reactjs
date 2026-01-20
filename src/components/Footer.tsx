import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl bg-white/10 p-2 rounded-xl">🩸</span>
              <span className="text-2xl font-black text-white tracking-tight">
                Blood<span className="text-red-500">Network</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              একটি জীবন বাঁচানো আপনার হাতের নাগালে। আমাদের লক্ষ্য হলো রক্তদাতা এবং গ্রহীতার মধ্যে দ্রুত ও সহজ যোগাযোগ তৈরি করা।
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              {['FB', 'LN', 'TW', 'IG'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all text-sm font-bold">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">প্রয়োজনীয় লিঙ্ক (Links)</h4>
            <ul className="space-y-4 font-medium text-sm">
              <li><Link to="/search" className="hover:text-red-500 transition-colors">রক্তদাতা খুঁজুন</Link></li>
              <li><Link to="/requests" className="hover:text-red-500 transition-colors">রক্তের আবেদন</Link></li>
              <li><Link to="/register-donor" className="hover:text-red-500 transition-colors">রক্তদাতা হিসেবে যোগ দিন</Link></li>
              <li><Link to="/about" className="hover:text-red-500 transition-colors">আমাদের সম্পর্কে</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">যোগাযোগ (Support)</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-red-500">📞</span> 
                <span>+৮৮০ ১২৩৪-৫৬৭৮৯০</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-500">✉️</span> 
                <span>help@bloodnetwork.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-500">📍</span> 
                <span>ঢাকা, বাংলাদেশ</span>
              </li>
            </ul>
          </div>

          {/* Emergency Alert Box */}
          <div className="bg-red-950/30 border border-red-900/50 p-6 rounded-3xl">
            <h4 className="text-red-500 font-black mb-2 uppercase tracking-tighter italic">Emergency?</h4>
            <p className="text-xs text-slate-400 mb-4 font-medium">
              জরুরি প্রয়োজনে সরাসরি আমাদের কন্ট্রোল রুমে কল করুন। আমরা ২৪/৭ আপনাদের পাশে আছি।
            </p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-bold transition-all shadow-lg shadow-red-900/20">
              Call Hotline
            </button>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-medium">
            © {currentYear} Blood Network. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;