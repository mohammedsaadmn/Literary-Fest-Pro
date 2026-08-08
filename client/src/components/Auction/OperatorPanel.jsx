import { Sliders, Trophy, SkipForward, RotateCcw, XCircle, Play, StopCircle, Crown } from "lucide-react";

function OperatorPanel({
  currentBid = 0,
  resetBid,
  nextStudent,
  currentStudentIndex,
  totalStudents,
  roundEnded,
  continueBidding,
  endRound,
  unsoldStudent,
  highestBidder,
  highestTeamName,
  sellStudent,
}) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h2 className="text-lg font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Sliders size={20} className="text-amber-400" /> Operator Control Dock
        </h2>
        <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
          Master Trigger
        </span>
      </div>

      {/* Current Offer Status */}
      <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
        <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-widest">Active Offer</p>
        <p className="text-3xl font-black text-yellow-400 tracking-tight my-0.5">
          ₹{currentBid.toLocaleString("en-IN")}
        </p>
        {highestTeamName ? (
          <p className="text-xs text-blue-400 font-extrabold flex items-center gap-1 mt-1">
            <Crown size={14} className="text-amber-400" /> Leading: <span className="text-white">{highestTeamName}</span>
          </p>
        ) : (
          <p className="text-xs text-slate-500 font-medium mt-1">No bids placed yet</p>
        )}
      </div>

      {/* Action Triggers */}
      <div className="space-y-2.5">
        {highestBidder && (
          <button
            onClick={() => sellStudent?.(highestBidder)}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-all cursor-pointer active:scale-95"
          >
            <Trophy size={18} />
            <span>Sell to {highestTeamName}</span>
          </button>
        )}

        <button
          onClick={nextStudent}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-all cursor-pointer active:scale-95"
        >
          <SkipForward size={18} />
          <span>Next Student</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={resetBid}
            className="w-full bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 font-bold py-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw size={15} />
            <span>Reset Bid</span>
          </button>

          <button
            onClick={unsoldStudent}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold py-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95"
          >
            <XCircle size={15} />
            <span>Mark Unsold</span>
          </button>
        </div>

        <div className="pt-2 border-t border-slate-800">
          <p className="text-[10px] text-slate-500 text-center font-bold uppercase tracking-wider mb-2">
            Student {currentStudentIndex + 1} of {totalStudents}
          </p>

          <button
            onClick={roundEnded ? continueBidding : endRound}
            className={`w-full font-extrabold py-3 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
              roundEnded
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
            }`}
          >
            {roundEnded ? (
              <>
                <Play size={16} /> <span>Resume Bidding</span>
              </>
            ) : (
              <>
                <StopCircle size={16} /> <span>End Round</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OperatorPanel;