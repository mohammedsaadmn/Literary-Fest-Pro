import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Trophy, Sparkles, Award } from "lucide-react";

function WinnerModal({ show, winner }) {
  useEffect(() => {
    if (show && winner) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#ec4899"],
        });
      } catch { /* ignore */ }
    }
  }, [show, winner]);

  if (!show || !winner) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-10 w-full max-w-md text-center shadow-2xl border-2 border-amber-400/80 relative overflow-hidden transform scale-100 transition-all duration-300 animate-in zoom-in-95">
        
        {/* Glow backdrop behind modal */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center mx-auto text-slate-950 shadow-xl shadow-amber-400/30 animate-bounce">
            <Trophy size={40} className="fill-slate-950" />
          </div>

          <div>
            <span className="px-3.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles size={14} /> STUDENT SOLD!
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
              {winner.student?.name}
            </h2>
            <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider mt-1 flex items-center justify-center gap-2">
              <Award size={14} className="text-amber-400" />
              <span>{winner.student?.category || "General"}</span>
              {winner.student?.place && <span>• {winner.student?.place}</span>}
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 my-3 space-y-1 shadow-inner">
            <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Winning Franchise</p>
            <h3
              className="text-3xl font-black tracking-wide uppercase drop-shadow-md"
              style={{ color: winner.team?.color || "#f59e0b" }}
            >
              {winner.team?.name}
            </h3>
          </div>

          <div>
            <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Final Price</p>
            <h1 className="text-5xl sm:text-6xl font-black text-emerald-400 tracking-tight drop-shadow-lg mt-0.5">
              ₹{winner.amount?.toLocaleString("en-IN")}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WinnerModal;