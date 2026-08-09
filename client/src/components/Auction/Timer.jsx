import { Clock, AlertTriangle } from "lucide-react";

function Timer({ timeLeft, running }) {
  const isLowTime = running && timeLeft <= 5;

  return (
    <div
      className={`sticky top-4 z-40 rounded-3xl p-5 md:p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 border ${
        isLowTime
          ? "bg-red-950/90 border-red-500/90 shadow-red-500/20 ring-2 ring-red-500/50"
          : "bg-slate-900/90 border-slate-800"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
          <Clock size={16} className={isLowTime ? "text-red-400 animate-spin" : "text-emerald-400"} />
          Auction Countdown Timer
        </h2>
        {isLowTime && (
          <span className="px-2.5 py-0.5 bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-black rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
            <AlertTriangle size={12} /> Time Low
          </span>
        )}
      </div>

      {!running ? (
        <div className="text-center py-2">
          <p className="text-amber-400 font-extrabold text-sm flex items-center justify-center gap-2">
            <span>🟢</span> Waiting for Bids / Timer Paused
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-1">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Time Remaining</p>
            <p className="text-xs text-slate-500 font-medium">Resets on new valid bid</p>
          </div>
          <h1
            className={`text-4xl md:text-5xl font-black tracking-tight ${
              isLowTime ? "text-red-400 animate-pulse scale-105" : "text-emerald-400"
            }`}
          >
            00:{String(timeLeft).padStart(2, "0")}
          </h1>
        </div>
      )}
    </div>
  );
}

export default Timer;