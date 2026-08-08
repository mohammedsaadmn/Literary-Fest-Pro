import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white py-24 lg:py-32">
      {/* Background Glow Accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
          LiteraryFest Pro 2026 Edition
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
        >
          Elevate Your Festival Experience with{" "}
          <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Live Talent Auctions
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          The premiere platform designed for inter-collegiate literary festivals. Manage real-time bidding drafts, track house points budgets, judge scoring, and display live leaderboard results seamlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/auction"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-lg shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            🔥 Enter Live Auction Stage
          </Link>
          <Link
            to="/events"
            className="px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-lg border border-slate-700 hover:border-slate-600 hover:scale-105 active:scale-95 transition-all"
          >
            Explore Events & Schedule
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
