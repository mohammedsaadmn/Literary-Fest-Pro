import { useNavigate } from "react-router-dom";
import { Sliders, Tv, Shield, Crown, Flame, ExternalLink, Sparkles, Activity } from "lucide-react";

function ControlCenter() {
  const navigate = useNavigate();

  const panels = [
    {
      id: "operator",
      title: "Operator Panel",
      iconEmoji: "🎮",
      iconComponent: Sliders,
      description: "Manage the complete auction.",
      buttonText: "Open Operator",
      path: "/auction",
      badge: "Master Control",
      badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
      accentGradient: "from-red-600/30 to-orange-600/20",
      borderHover: "hover:border-red-500/50 hover:shadow-red-500/10",
      btnClass: "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-600/30",
    },
    {
      id: "display",
      title: "Audience Display",
      iconEmoji: "📺",
      iconComponent: Tv,
      description: "Display the live auction on the projector.",
      buttonText: "Open Display",
      path: "/display",
      badge: "Stage View",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      accentGradient: "from-purple-600/30 to-indigo-600/20",
      borderHover: "hover:border-purple-500/50 hover:shadow-purple-500/10",
      btnClass: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30",
    },
    {
      id: "phoenix",
      title: "Phoenix Captain",
      iconEmoji: "🦅",
      iconComponent: Flame,
      description: "Captain bidding dashboard.",
      buttonText: "Open Phoenix",
      path: "/phoenix",
      badge: "Team #1",
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
      accentGradient: "from-red-500/30 to-rose-600/20",
      borderHover: "hover:border-red-500/50 hover:shadow-red-500/10",
      btnClass: "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30",
    },
    {
      id: "falcons",
      title: "Falcons Captain",
      iconEmoji: "🦅",
      iconComponent: Shield,
      description: "Captain bidding dashboard.",
      buttonText: "Open Falcons",
      path: "/falcons",
      badge: "Team #2",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      accentGradient: "from-blue-600/30 to-cyan-600/20",
      borderHover: "hover:border-blue-500/50 hover:shadow-blue-500/10",
      btnClass: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-600/30",
    },
    {
      id: "titans",
      title: "Titans Captain",
      iconEmoji: "🛡",
      iconComponent: Shield,
      description: "Captain bidding dashboard.",
      buttonText: "Open Titans",
      path: "/titans",
      badge: "Team #3",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      accentGradient: "from-emerald-600/30 to-teal-600/20",
      borderHover: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      btnClass: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30",
    },
    {
      id: "legends",
      title: "Legends Captain",
      iconEmoji: "👑",
      iconComponent: Crown,
      description: "Captain bidding dashboard.",
      buttonText: "Open Legends",
      path: "/legends",
      badge: "Team #4",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      accentGradient: "from-amber-600/30 to-yellow-600/20",
      borderHover: "hover:border-amber-500/50 hover:shadow-amber-500/10",
      btnClass: "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black shadow-lg shadow-amber-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 md:p-12 relative overflow-hidden flex flex-col justify-between selection:bg-yellow-400 selection:text-slate-950">
      
      {/* Background Decorative Glow Circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-10 relative z-10">
        
        {/* Admin Header */}
        <header className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-amber-400 shadow-xl mb-2">
            <Sparkles size={14} /> LiteraryFest Auction Admin Control Center
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase drop-shadow-md">
            ArtSalvia - Live Auction
          </h1>

          <p className="text-slate-400 text-base md:text-lg font-medium">
            Choose which panel you want to open.
          </p>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Activity size={14} className="text-emerald-400" /> Real-time Synchronization
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" /> Socket.IO Active
            </span>
          </div>
        </header>

        {/* 6 Large Glassmorphism Cards Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {panels.map((panel) => {
            const Icon = panel.iconComponent;
            return (
              <div
                key={panel.id}
                className={`bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${panel.borderHover} shadow-2xl relative overflow-hidden group`}
              >
                {/* Subtle Card Glow Effect */}
                <div
                  className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${panel.accentGradient} rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
                />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300 relative">
                      <span>{panel.iconEmoji}</span>
                      <Icon size={14} className="absolute bottom-1 right-1 text-slate-400 opacity-60" />
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-extrabold rounded-full border uppercase tracking-wider ${panel.badgeColor}`}
                    >
                      {panel.badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-white tracking-wide flex items-center gap-2 group-hover:text-amber-300 transition-colors">
                      {panel.title}
                    </h2>
                    <p className="text-slate-400 text-sm font-medium mt-1 leading-relaxed">
                      {panel.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 relative z-10">
                  <button
                    onClick={() => navigate(panel.path)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 ${panel.btnClass}`}
                  >
                    <span>{panel.buttonText}</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </main>

      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 font-medium py-6 mt-8 relative z-10 border-t border-slate-900">
        ArtSalvia Live Auction Management System • Powered by Socket.IO Real-Time Engine
      </footer>

    </div>
  );
}

export default ControlCenter;
