import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Trophy, Sliders, Tv, ArrowRight, Activity, Flame, Shield } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-20 lg:py-28 border-b border-slate-800/80">
      {/* Background Animated Glow Accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-gold-spotlight" />

      <div className="relative max-w-7xl mx-auto px-6 text-center z-10 space-y-8">
        
        {/* Animated Event Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-amber-400/30 text-amber-300 text-xs md:text-sm font-black uppercase tracking-widest shadow-2xl backdrop-blur-xl"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <Sparkles size={16} className="text-amber-400" />
          <span>ART SALVIA 2K26 • OFFICIAL LIVE AUCTION</span>
        </motion.div>

        {/* Hero Main Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-black tracking-tight leading-tight max-w-5xl mx-auto uppercase drop-shadow-lg"
        >
          Elevate Literary Fest Talent With{" "}
          <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-md">
            Real-Time Live Bidding
          </span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed"
        >
          The premier inter-collegiate talent auction platform. Powering 4 franchise house teams, budget protection algorithms, captain bidding consoles, and stage projector display streams.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 pt-2"
        >
          <Link
            to="/control"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm md:text-base uppercase tracking-wider shadow-2xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sliders size={18} />
            <span>Launch Admin Control Center</span>
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/display"
            className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-black text-sm md:text-base uppercase tracking-wider border border-slate-700 hover:border-amber-400/40 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 cursor-pointer"
          >
            <Tv size={18} className="text-purple-400" />
            <span>Open Stage Audience Screen</span>
          </Link>
        </motion.div>

        {/* Live System Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-6 pt-4 text-xs font-bold text-slate-400"
        >
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Activity size={14} /> Socket.IO Active
          </span>
          <span className="flex items-center gap-1.5 text-blue-400">
            <Shield size={14} /> Smart Budget Guard
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <Flame size={14} /> 4 Franchise Teams
          </span>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
