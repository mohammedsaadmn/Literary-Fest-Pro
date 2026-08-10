import { useState, useEffect, useRef } from "react";
import { BASE_BID, calculateTeamAuctionStats } from "../../utils/auctionUtils";
import { Trophy, Users, Coins, Sparkles, AlertCircle, ChevronDown, ChevronUp, User, Tag, GraduationCap } from "lucide-react";
import "../../index.css";

const TEAM_ICONS = {
  1: "🦅", // Phoenix
  2: "🦅", // Falcons
  3: "🛡️", // Titans
  4: "👑", // Legends
};

function TeamCard({
  team = {},
  currentBid = 0,
  sellStudent,
  highestBidder,
  placeBid,
  maxStudents = 53,
  currentStudent,
}) {
  const {
    remainingBudget,
    spentPoints,
    squadCount,
    playersRemaining,
    minimumBudgetReserved,
    maximumAllowedBid,
    squadFull,
    seniorCount,
    juniorCount,
    subJuniorCount,
    categoryFull,
  } = calculateTeamAuctionStats(team, currentStudent, maxStudents, BASE_BID);

  const [isSquadOpen, setIsSquadOpen] = useState(false);
  const [newestSoldId, setNewestSoldId] = useState(null);
  const prevSquadLengthRef = useRef(team.studentsWon?.length || 0);

  // Auto-expand squad section & highlight newest sold student for 3 seconds when squad count increases
  useEffect(() => {
    const currentLength = team.studentsWon?.length || 0;
    if (currentLength > prevSquadLengthRef.current) {
      const lastStudent = team.studentsWon[currentLength - 1];
      if (lastStudent) {
        setIsSquadOpen(true);
        setNewestSoldId(lastStudent.studentId || lastStudent.name);
        const timer = setTimeout(() => {
          setNewestSoldId(null);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
    prevSquadLengthRef.current = currentLength;
  }, [team.studentsWon]);

  const isWinner = highestBidder !== null && highestBidder !== undefined && Number(highestBidder) === Number(team.id);
  const isAuctionActive = Boolean(currentStudent);

  const totalBudget = team.budget ?? 150000;
  const budgetPercent = Math.min(100, Math.max(0, (remainingBudget / totalBudget) * 100));
  const squadPercent = Math.min(100, Math.max(0, (squadCount / maxStudents) * 100));

  const canBidAmount = (increment) => {
    if (!isAuctionActive) return false;
    if (isWinner) return false;
    if (squadFull) return false;
    if (categoryFull) return false;
    if (currentBid + increment > maximumAllowedBid) return false;
    return true;
  };

  const teamColor = team.color || "#3b82f6";
  const icon = TEAM_ICONS[team.id] || "🏆";

  // Reverse squad list so newest purchased student appears at the top
  const rawSquad = team.studentsWon || [];
  const squadList = [...rawSquad].reverse();

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-300 border flex flex-col justify-between backdrop-blur-xl shadow-2xl ${
        isWinner
          ? "bg-slate-900/95 border-amber-400 shadow-amber-500/20 ring-2 ring-amber-400/50"
          : "bg-slate-900/90 border-slate-800 hover:border-slate-700"
      }`}
    >
      {/* Background Subtle Gradient Glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none -mr-12 -mt-12"
        style={{ backgroundColor: teamColor }}
      />

      <div>
        {/* Animated Leader Ribbon Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shadow-inner shrink-0">
              {icon}
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-wide uppercase flex items-center gap-2">
                {team.name ?? "Team"}
              </h2>
              <p className="text-xs font-semibold text-slate-400">
                Spent: <span className="text-slate-200">₹{spentPoints.toLocaleString("en-IN")}</span>
              </p>
            </div>
          </div>

          {isWinner && (
            <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-400/20 animate-pulse shrink-0">
              <Sparkles size={14} className="fill-slate-950" />
              <span>Highest Bidder</span>
            </div>
          )}
        </div>

        {/* Big Projector-Ready Budget Card */}
        <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 mb-5 shadow-inner">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Coins size={14} className="text-emerald-400" /> Remaining Budget
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {budgetPercent.toFixed(0)}% Left
            </span>
          </div>

          <div className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tight drop-shadow-md my-1">
            ₹{remainingBudget.toLocaleString("en-IN")}
          </div>

          {/* Budget Progress Bar */}
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mt-2 p-0.5 border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${budgetPercent}%` }}
            />
          </div>
        </div>

        {/* Member & Participant Progress */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 mb-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Users size={14} className="text-blue-400" /> Members ({squadCount} / {maxStudents})
            </span>
            <span className="text-cyan-300 font-extrabold">
              {playersRemaining} Slots Left
            </span>
          </div>

          {/* Member Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/40">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-500"
              style={{ width: `${squadPercent}%` }}
            />
          </div>

          {/* Category Quotas Breakdown */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400">Senior</p>
              <p className="text-sm font-black text-yellow-300 mt-0.5">{seniorCount} / 16</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400">Junior</p>
              <p className="text-sm font-black text-yellow-300 mt-0.5">{juniorCount} / 16</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400">Sub Jr</p>
              <p className="text-sm font-black text-yellow-300 mt-0.5">{subJuniorCount} / 21</p>
            </div>
          </div>
        </div>

        {/* Collapsible "Team Members" Live Roster Management */}
        <div className="mb-5 border-t border-slate-800/80 pt-4">
          <button
            onClick={() => setIsSquadOpen(!isSquadOpen)}
            className="w-full flex items-center justify-between bg-slate-950/70 hover:bg-slate-950 border border-slate-800/90 rounded-2xl px-4 py-3 text-xs font-extrabold text-slate-200 transition-all cursor-pointer shadow-inner group"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <Users size={14} />
              </div>
              <span className="uppercase tracking-wider text-white font-black">
                Team Members
              </span>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black px-2 py-0.5 rounded-full">
                {squadCount} Members
              </span>
            </div>

            <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold group-hover:text-slate-200">
              {isSquadOpen ? "Hide Members" : "View Members"}
              {isSquadOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {isSquadOpen && (
            <div className="mt-2.5 space-y-2">
              {/* Live Members Quick Summary Header */}
              <div className="grid grid-cols-3 gap-1.5 bg-slate-950/80 border border-slate-800/80 rounded-xl p-2 text-center text-[10px] font-extrabold text-slate-400 mb-2">
                <div>
                  <span className="block text-[9px] uppercase text-slate-500 font-bold">Total Members</span>
                  <span className="text-white text-xs font-black">{squadCount}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-slate-500 font-bold">Spent</span>
                  <span className="text-slate-200 text-xs font-black">₹{spentPoints.toLocaleString("en-IN")}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-slate-500 font-bold">Remaining</span>
                  <span className="text-emerald-400 text-xs font-black">₹{remainingBudget.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Scrollable Member List */}
              <div className="max-h-60 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                {squadList.length === 0 ? (
                  <div className="text-xs text-slate-500 font-medium py-6 px-4 text-center bg-slate-950/40 rounded-2xl border border-slate-800/60">
                    <User className="mx-auto text-slate-700 mb-1.5" size={24} />
                    <p className="font-semibold text-slate-400">No team members purchased yet</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">Purchased participants will appear here in real time</p>
                  </div>
                ) : (
                  squadList.map((student, idx) => {
                    const purchaseOrder = student.purchaseOrder ?? (rawSquad.length - idx);
                    const finalPrice = student.purchasePrice ?? student.amount ?? 500;
                    const isNewest =
                      (newestSoldId && (student.studentId === newestSoldId || student.name === newestSoldId)) ||
                      (student.soldAt && Date.now() - student.soldAt < 3000) ||
                      idx === 0 && (newestSoldId !== null);

                    const categoryColor =
                      student.category === "Senior"
                        ? "bg-amber-400/10 text-amber-400 border-amber-400/30"
                        : student.category === "Junior"
                        ? "bg-blue-400/10 text-blue-400 border-blue-400/30"
                        : "bg-purple-400/10 text-purple-400 border-purple-400/30";

                    return (
                      <div
                        key={student.studentId || `${student.name}-${purchaseOrder}`}
                        className={`rounded-2xl p-2.5 flex items-center justify-between border transition-all duration-500 ${
                          isNewest
                            ? "bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-400/60 shadow-xl shadow-emerald-500/25 animate-pulse"
                            : "bg-slate-950/70 border-slate-800/80 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Purchase Order Badge */}
                          <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 shrink-0">
                            #{purchaseOrder}
                          </span>

                          {/* Student Photo / Avatar Icon */}
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shrink-0 shadow-md border border-white/10 overflow-hidden">
                            {student.photo || student.image ? (
                              <img src={student.photo || student.image} alt={student.name} className="w-full h-full object-cover" />
                            ) : (
                              <User size={18} />
                            )}
                          </div>

                          {/* Student Name & Category Badge */}
                          <div className="truncate">
                            <p className="font-extrabold text-xs text-white truncate leading-tight">
                              {student.name}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border uppercase ${categoryColor}`}>
                                {student.category || "General"}
                              </span>
                              {student.batch && (
                                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border border-rose-400/30 bg-rose-400/10 text-rose-300 flex items-center gap-1">
                                  <GraduationCap size={10} /> {student.batch}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Final Purchase Price */}
                        <div className="text-right shrink-0 ml-2">
                          <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20 block">
                            ₹{finalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {squadFull && (
          <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-3 mb-4 text-center font-black text-red-200 text-sm flex items-center justify-center gap-2">
            <AlertCircle size={16} /> 🚫 Member Limit Reached ({maxStudents}/{maxStudents})
          </div>
        )}

        {categoryFull && currentStudent && (
          <div className="bg-orange-500/20 border border-orange-500/40 rounded-2xl p-3 mb-4 text-center font-bold text-orange-200 text-sm flex items-center justify-center gap-2">
            <AlertCircle size={16} /> 🚫 {currentStudent.category} quota completed
          </div>
        )}

        {maximumAllowedBid <= currentBid && !squadFull && (
          <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-3 mb-4 text-center font-extrabold text-red-200 text-xs leading-tight flex items-center justify-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>🚫 You must reserve enough budget to complete your team members.</span>
          </div>
        )}
      </div>

      {/* Interactive Bid & Action Controls */}
      <div className="space-y-3 pt-2">
        <div className="grid grid-cols-2 gap-2.5">
          {[500, 1000, 2000, 5000].map((increment) => {
            const afford = canBidAmount(increment);
            return (
              <button
                key={increment}
                disabled={!afford}
                onClick={() => {
                  if (afford) {
                    placeBid?.(team.id, increment);
                  }
                }}
                className={`py-3 px-2 rounded-xl font-black text-sm md:text-base transition-all duration-150 shadow-md flex items-center justify-center gap-1 active:scale-95 ${
                  afford
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white cursor-pointer hover:shadow-blue-500/25 hover:-translate-y-0.5"
                    : "bg-slate-800/60 text-slate-500 cursor-not-allowed border border-slate-800 opacity-50"
                }`}
              >
                + ₹{increment.toLocaleString("en-IN")}
              </button>
            );
          })}
        </div>

        {/* Sell / Winning Action Button */}
        <button
          disabled={!isWinner || squadFull || categoryFull}
          onClick={() => sellStudent?.(team.id)}
          className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-xl flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            isWinner
              ? "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 text-white hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/30 hover:scale-[1.02]"
              : "bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-800 opacity-50"
          }`}
        >
          <span className="flex items-center gap-2">
            <Trophy size={18} /> SELL TO {team.name ?? "TEAM"}
          </span>
          {isWinner && (
            <span className="text-[10px] text-yellow-300 font-extrabold tracking-widest">
              👑 CURRENT HIGHEST OFFER
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default TeamCard;

