import { motion, AnimatePresence } from "framer-motion"; // Added framer-motion for smooth transition

const Splash = ({ showSplash }: { showSplash: boolean }) => {
  return (
          <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-slate-900 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="relative"
            >
              {/* Pulsing Logo Effect */}
              <div className="absolute inset-0 bg-red-600 blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-red-600 rounded-[2rem] flex items-center justify-center shadow-2xl">
                <span className="text-5xl">🩸</span>
              </div>
            </motion.div>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-white text-2xl font-black tracking-tighter"
            >
              রক্ত<span className="text-red-600"> বীর</span>
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
  )
}

export default Splash