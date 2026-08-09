import { Sparkles, Radio } from "lucide-react";

function AuctionHeader() {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 shadow-inner">
          <Radio size={20} className="animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
            <span>ArtSalvia 2K26</span>
            <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 font-bold px-2.5 py-0.5 rounded-full tracking-wider animate-pulse">
              ● LIVE STAGE AUCTION
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Real-Time Bidding & Member Allocation System</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs font-extrabold text-slate-400">
        <span className="px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1.5 text-amber-400">
          <Sparkles size={14} /> Official LiteraryFest Pro
        </span>
      </div>
    </div>
  );
}

export default AuctionHeader;