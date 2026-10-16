
import { Sparkles, Radio } from "lucide-react";
import farasztoLogo from "../../assets/faraszto-logo.png";

function AuctionHeader() {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <Radio size={20} className="animate-pulse text-red-400" />
        </div>

        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <img
              src={farasztoLogo}
              alt="FARASZTO"
              className="h-10 w-auto max-w-[220px] object-contain"
            />

            <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 font-bold px-2 py-1 rounded">
              LIVE STAGE AUCTION
            </span>
          </div>

          <p className="text-xs text-slate-400 font-medium mt-1">
            Real-Time Bidding &amp; Member Allocation System
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs font-extrabold text-slate-400">
        <span className="px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
          <Sparkles size={14} />
          Official FARASZTO
        </span>
      </div>
    </div>
  );
}

export default AuctionHeader;
