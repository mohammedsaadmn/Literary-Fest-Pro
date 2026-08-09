import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import {
  Trophy,
  Shield,
  Crown,
  Flame,
  Coins,
  Users,
  Zap,
  Radio,
  Sliders,
  Tv,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  ChevronRight,
  Star
} from "lucide-react";

const FRANCHISE_TEAMS = [
  {
    id: 1,
    name: "Phoenix",
    icon: "🦅",
    color: "from-red-600 to-rose-700",
    borderColor: "border-red-500/40 hover:border-red-500",
    textColor: "text-red-400",
    badgeBg: "bg-red-500/10 text-red-300 border-red-500/30",
    path: "/phoenix",
    desc: "Rising fierce with explosive bidding tactics and high-energy squad assembly.",
    tag: "Team #1",
  },
  {
    id: 2,
    name: "Falcons",
    icon: "🦅",
    color: "from-blue-600 to-cyan-700",
    borderColor: "border-blue-500/40 hover:border-blue-500",
    textColor: "text-blue-400",
    badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    path: "/falcons",
    desc: "Precision tactical bidding focused on high-value senior talent acquisition.",
    tag: "Team #2",
  },
  {
    id: 3,
    name: "Titans",
    icon: "🛡️",
    color: "from-emerald-600 to-teal-700",
    borderColor: "border-emerald-500/40 hover:border-emerald-500",
    textColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    path: "/titans",
    desc: "Defensive budget reservation strategy ensuring maximum squad depth.",
    tag: "Team #3",
  },
  {
    id: 4,
    name: "Legends",
    icon: "👑",
    color: "from-amber-500 to-yellow-600",
    borderColor: "border-amber-500/40 hover:border-amber-500",
    textColor: "text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-400/30",
    path: "/legends",
    desc: "Regal strategic bidding targeting top-tier champions across all categories.",
    tag: "Team #4",
  },
];

const AUCTION_FEATURES = [
  {
    icon: Zap,
    title: "Real-Time WebSocket Engine",
    desc: "Instantaneous bid synchronization across Operator, Display, and Captain consoles using Socket.IO.",
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  },
  {
    icon: Shield,
    title: "Smart Budget Protection",
    desc: "Automated mathematical algorithms ensuring every team reserves mandatory funds to complete full squad rosters.",
    color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    icon: Tv,
    title: "Audience Projector Stage",
    desc: "Dramatic full-screen auditorium view with dual-side confetti cannons and live franchise budget leaderboards.",
    color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  {
    icon: Layers,
    title: "Category Quota Rules",
    desc: "Automatic enforcement of Senior (16), Junior (16), and Sub-Junior (21) student quotas per team.",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  },
];

const STATS = [
  { value: "53", label: "Talent Pool", icon: Users, accent: "text-amber-400" },
  { value: "₹150,000", label: "Starting Purse / Team", icon: Coins, accent: "text-emerald-400" },
  { value: "4", label: "Franchise Houses", icon: Trophy, accent: "text-blue-400" },
  { value: "100%", label: "Real-Time Sync", icon: Radio, accent: "text-purple-400" },
];

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      
      {/* 1. Main Hero Section */}
      <Hero />

      {/* 2. Animated Stats Bar */}
      <section className="bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-xl py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-950/70 border border-slate-800 rounded-3xl p-5 md:p-6 text-center space-y-1 hover:border-slate-700 transition-all shadow-xl"
              >
                <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <Icon size={20} className={stat.accent} />
                </div>
                <div className={`text-2xl md:text-4xl font-black tracking-tight ${stat.accent}`}>
                  {stat.value}
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Franchise Teams Showcase Section */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-widest">
              <Trophy size={14} /> Competing Franchise Houses
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              The 4 Competing Teams
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-medium">
              Each house enters the live auction stage with ₹150,000 purse budget to build their 53-member championship roster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FRANCHISE_TEAMS.map((team, idx) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-slate-900/80 border ${team.borderColor} rounded-3xl p-6 flex flex-col justify-between backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${team.color} opacity-10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-20 transition-opacity`} />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{team.icon}</span>
                    <span className={`px-3 py-1 text-[10px] font-black rounded-full border uppercase tracking-wider ${team.badgeBg}`}>
                      {team.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-2xl font-black uppercase tracking-wide ${team.textColor}`}>
                      {team.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1.5 leading-relaxed">
                      {team.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 relative z-10">
                  <Link
                    to={team.path}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group-hover:text-amber-300"
                  >
                    <span>Captain Dashboard</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Core System Features Grid */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-widest">
              <Sparkles size={14} /> Production Auction Engine
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Built for High-Stakes Live Events
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-medium">
              Engineered with real-time WebSocket state management, strict budget reservation algorithms, and auditorium visual streams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUCTION_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-slate-700 transition-all shadow-2xl backdrop-blur-xl"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md ${feat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-wide uppercase">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1.5 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Category Quotas & Event Breakdown */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-widest">
              <Award size={14} /> Member Quotas & Categories
            </div>

            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Balanced Competition Across All Levels
            </h2>

            <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
              To ensure fairness and comprehensive representation, each franchise must fulfill strict category distribution quotas for their 53-member team.
            </p>

            <div className="space-y-3">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shadow-md shadow-amber-400/50" />
                  <div>
                    <h4 className="font-black text-sm text-white uppercase">Senior Category</h4>
                    <p className="text-xs text-slate-400">16 Participants Max per Team</p>
                  </div>
                </div>
                <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-3 py-1 rounded-xl border border-amber-400/20">
                  16 Quota
                </span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-400 shadow-md shadow-blue-400/50" />
                  <div>
                    <h4 className="font-black text-sm text-white uppercase">Junior Category</h4>
                    <p className="text-xs text-slate-400">16 Participants Max per Team</p>
                  </div>
                </div>
                <span className="text-xs font-black text-blue-400 bg-blue-400/10 px-3 py-1 rounded-xl border border-blue-400/20">
                  16 Quota
                </span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-purple-400 shadow-md shadow-purple-400/50" />
                  <div>
                    <h4 className="font-black text-sm text-white uppercase">Sub Junior Category</h4>
                    <p className="text-xs text-slate-400">21 Participants Max per Team</p>
                  </div>
                </div>
                <span className="text-xs font-black text-purple-400 bg-purple-400/10 px-3 py-1 rounded-xl border border-purple-400/20">
                  21 Quota
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Star size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wide">
                    Live Control Portals
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">Direct Access Views</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/control"
                className="p-4 rounded-2xl bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 hover:border-red-500/60 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Sliders size={20} className="text-red-400" />
                  <div>
                    <p className="font-extrabold text-sm text-white uppercase group-hover:text-amber-300">Operator Console</p>
                    <p className="text-xs text-slate-400">Master auction control dock</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/display"
                className="p-4 rounded-2xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 hover:border-purple-500/60 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Tv size={20} className="text-purple-400" />
                  <div>
                    <p className="font-extrabold text-sm text-white uppercase group-hover:text-amber-300">Stage Projector Screen</p>
                    <p className="text-xs text-slate-400">Live auditorium celebration view</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/results"
                className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-emerald-400" />
                  <div>
                    <p className="font-extrabold text-sm text-white uppercase group-hover:text-amber-300">Final Results & Members</p>
                    <p className="text-xs text-slate-400">Roster summary & leaderboard</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Bottom High-Impact CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left relative z-10">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Ready to Start the Auction?
            </h2>
            <p className="text-slate-900 font-extrabold text-sm md:text-base">
              Launch the Master Control Center or open your team's Captain bidding console.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/control"
              className="px-8 py-4 rounded-2xl bg-slate-950 text-white hover:bg-slate-900 font-black text-sm uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sliders size={18} className="text-amber-400" />
              <span>Launch Control Center</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
