import useAuctionSync from "../../hooks/useAuctionSync";
import { User, Trophy, MapPin, Coins, Users, Sparkles, Shield, GraduationCap } from "lucide-react";
import teams from "../../data/teams.json";
import { BASE_BID, calculateTeamAuctionStats } from "../../utils/auctionUtils";

const TEAM_ICONS = {
  1: "🦅", // Phoenix
  2: "🦅", // Falcons
  3: "🛡️", // Titans
  4: "👑", // Legends
};

export default function CaptainView({ teamId = 1 }) {
  const {
    auction,
    teamData,
    currentStudentIndex,
    currentStudent,
    timer,
    auctionRound,
    totalStudents,
    auctionCompleted,
    isConnected,
    placeBid: emitPlaceBid,
  } = useAuctionSync(teamId);

  const myTeam =
  teamData.find((t) => Number(t.id) === Number(teamId)) ||
  teams.find((t) => Number(t.id) === Number(teamId)) ||
  teams[0];

const maxStudents = 53;

const {
  remainingBudget,
  spentPoints,
  squadCount,
  maximumAllowedBid,
  squadFull,
  seniorCount,
  juniorCount,
  subJuniorCount,
  categoryFull,
} = calculateTeamAuctionStats(
  myTeam,
  currentStudent,
  maxStudents,
  BASE_BID
);

const totalBudget = myTeam?.budget ?? 150000;

const budgetPercent = Math.min(
  100,
  Math.max(0, (remainingBudget / totalBudget) * 100)
);



const isHighestBidder =
  auction.highestBidder !== null &&
  auction.highestBidder !== undefined &&
  Number(auction.highestBidder) === Number(myTeam.id);

const canBid =
  !auctionCompleted &&
  Boolean(currentStudent) &&
  !squadFull &&
  !categoryFull &&
  !isHighestBidder;

const handlePlaceBid = (amount) => {
  if (!canBid || isHighestBidder || auctionCompleted) return;

  const newBid = auction.currentBid + amount;

  if (newBid > maximumAllowedBid) return;

  emitPlaceBid(amount);
};

const rawSquad = myTeam.studentsWon || [];
const squadList = [...rawSquad].reverse();

  return (
    
    <div className="min-h-screen bg-slate-950 text-white p-3 sm:p-6 pb-12 selection:bg-amber-400 selection:text-slate-950">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Live Active Student Sticky Banner */}
        {currentStudent ? (
          <div className="sticky top-2 z-40 bg-slate-900/95 border border-slate-800 rounded-3xl p-3.5 sm:p-5 shadow-2xl backdrop-blur-xl flex flex-row items-center justify-between gap-3 sm:gap-4 transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center border-2 border-amber-400 shadow-xl shrink-0">
                <User size={24} className="text-white sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <span className="px-2 py-0.5 bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[9px] sm:text-xs font-black rounded-full uppercase tracking-wider">
                    🏆 R{auctionRound}
                  </span>
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] sm:text-xs font-extrabold rounded-full uppercase tracking-wider">
                    #{currentStudentIndex + 1}/{totalStudents}
                  </span>
                </div>
                <h2 className="text-base sm:text-2xl font-black text-white tracking-tight truncate">
                  {currentStudent.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-300 font-semibold mt-0.5">
                  <span className="flex items-center gap-1 text-amber-300 truncate">
                    <Trophy size={12} /> {currentStudent.category}
                  </span>
                  {currentStudent.batch && (
                    <span className="flex items-center gap-1 text-rose-300 truncate">
                      <GraduationCap size={12} /> {currentStudent.batch}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-blue-400 truncate">
                    <MapPin size={12} /> {currentStudent.place}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Offer Counter & Permanent Countdown Timer */}
            <div className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border shrink-0 transition-all duration-300 ${
              timer <= 5
                ? "bg-red-950/90 border-red-500 shadow-lg shadow-red-500/30 animate-pulse ring-2 ring-red-500/50"
                : "bg-slate-950/90 border-slate-800"
            }`}>
              <div>
                <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Offer</p>
                <p className="text-xl sm:text-3xl font-black text-yellow-400 tracking-tight">
                  ₹{auction.currentBid.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="text-right pl-3 sm:pl-4 border-l border-slate-800">
                <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-extrabold tracking-wider flex items-center gap-1">
                  ⏱️ Timer
                </p>
                <p className={`text-xl sm:text-3xl font-black tracking-tight ${
                  timer <= 5 ? "text-red-400 animate-bounce" : "text-emerald-400"
                }`}>
                  {timer}s
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="sticky top-2 z-40 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 text-center text-slate-400 font-bold backdrop-blur-xl shadow-xl">
            Waiting for next participant to enter auction stage...
          </div>
        )}

        {/* Main Captain Card */}
        <div
          className="rounded-3xl p-5 sm:p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl space-y-6"
          style={{
            backgroundColor: myTeam.color || "#1e293b",
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.4) 100%)",
          }}
        >
          {/* Team Header */}
          <div className="flex justify-between items-start border-b border-white/20 pb-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl">{TEAM_ICONS[myTeam.id] || "🏆"}</span>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase">
                  {myTeam.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-white/80 text-xs font-semibold">Captain Console</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full flex items-center gap-1 border ${
                  isConnected
                    ? "bg-green-500/20 text-green-300 border-green-500/30"
                    : "bg-red-500/20 text-red-300 border-red-500/30 animate-pulse"
                }`}>
                  {isConnected ? "🟢 Live Sync" : "🔴 Reconnecting"}
                </span>
              </div>
            </div>

            {isHighestBidder && (
              <span className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider flex items-center gap-1 shadow-lg animate-pulse">
                <Sparkles size={14} /> Highest Bidder
              </span>
            )}
          </div>

          {/* Large Budget Metric & Visual Bar */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-white/70 uppercase tracking-widest flex items-center gap-1.5">
                <Coins size={16} className="text-emerald-400" /> Remaining Budget
              </span>
              <span className="text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {budgetPercent.toFixed(0)}% Left
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-emerald-300 tracking-tight my-1">
              ₹{remainingBudget.toLocaleString("en-IN")}
            </div>

            <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
                style={{ width: `${budgetPercent}%` }}
              />
            </div>
            
            <p className="text-xs text-white/60 text-right font-medium">
              Spent: ₹{spentPoints.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Status Warnings */}
          {isHighestBidder && (
            <div className="bg-amber-400/20 border border-amber-400/40 text-amber-300 p-3.5 rounded-2xl font-bold text-center text-xs sm:text-sm">
              👑 Your team currently holds the top bid (₹{auction.currentBid.toLocaleString("en-IN")})!
            </div>
          )}
          {squadFull && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 p-3.5 rounded-2xl font-bold text-center text-xs sm:text-sm">
              🚫 Member Limit Reached ({maxStudents}/{maxStudents})
            </div>
          )}
          {categoryFull && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 p-3.5 rounded-2xl font-bold text-center text-xs sm:text-sm">
              🚫 {currentStudent?.category} quota completed
            </div>
          )}
          {maximumAllowedBid <= auction.currentBid && !squadFull && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 p-3.5 rounded-2xl font-bold text-center text-xs sm:text-sm">
              🚫 You must reserve enough budget to complete your team members.
            </div>
          )}

          {/* Mobile-First Rapid Tap Bidding Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase font-extrabold tracking-wider text-white/90 flex items-center gap-1.5">
                ⚡ Rapid Bidding Buttons
              </p>
              {canBid && (
                <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Tap to Place Bid
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {[500, 1000, 2000, 5000].map((increment) => {
                const nextAmount = auction.currentBid + increment;
                const canAfford = canBid && nextAmount <= maximumAllowedBid;
                return (
                  <button
                    key={increment}
                    disabled={!canAfford}
                    onClick={() => handlePlaceBid(increment)}
                    className={`py-3.5 sm:py-5 px-3 min-h-[58px] rounded-2xl font-black text-base sm:text-xl transition-all shadow-xl active:scale-95 touch-manipulation select-none flex flex-col items-center justify-center ${
                      canAfford
                        ? "bg-white text-slate-950 hover:bg-amber-300 hover:shadow-amber-400/30 cursor-pointer active:bg-amber-400"
                        : "bg-black/40 text-white/30 cursor-not-allowed border border-white/10 opacity-50"
                    }`}
                  >
                    <span>+ ₹{increment.toLocaleString("en-IN")}</span>
                    {canAfford && (
                      <span className="text-[10px] font-extrabold text-slate-700 mt-0.5">
                        → ₹{nextAmount.toLocaleString("en-IN")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Premium "MY MEMBERS" Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Section Title & Live Stats Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shadow-md">
                  <Shield size={22} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                    My Members
                  </h3>
                  <p className="text-xs font-semibold text-slate-400">
                    Live Purchased Roster & Category Breakdown
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Live Counters Badge Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Remaining Budget</span>
                <span className="text-xs font-black text-emerald-400">₹{remainingBudget.toLocaleString("en-IN")}</span>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Member Count</span>
                <span className="text-xs font-black text-white">{squadCount} / {maxStudents}</span>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl text-center">
                <span className="text-[10px] text-amber-400 font-extrabold uppercase block">Senior</span>
                <span className="text-xs font-black text-amber-300">{seniorCount} / 16</span>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl text-center">
                <span className="text-[10px] text-blue-400 font-extrabold uppercase block">Junior</span>
                <span className="text-xs font-black text-blue-300">{juniorCount} / 16</span>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl text-center">
                <span className="text-[10px] text-purple-400 font-extrabold uppercase block">Sub Jr</span>
                <span className="text-xs font-black text-purple-300">{subJuniorCount} / 21</span>
              </div>
            </div>
          </div>

          {/* Purchased Participant Cards Grid */}
          {squadList.length === 0 ? (
            <div className="bg-slate-950/50 border border-slate-800/80 rounded-3xl p-10 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                <Users size={32} />
              </div>
              <h4 className="text-lg font-black text-slate-300">No Purchased Participants Yet</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
                Winning bids in live auction rounds will automatically add participants to your team roster here in real time.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {squadList.map((student, idx) => {
                const isNewest = idx === 0;
                const purchaseNumber = student.purchaseOrder ?? (rawSquad.length - idx);
                const price = student.purchasePrice ?? student.amount ?? BASE_BID;

                const categoryBg =
                  student.category === "Senior"
                    ? "bg-amber-400/10 text-amber-400 border-amber-400/30"
                    : student.category === "Junior"
                    ? "bg-blue-400/10 text-blue-400 border-blue-400/30"
                    : "bg-purple-400/10 text-purple-400 border-purple-400/30";

                return (
                  <div
                    key={student.studentId || `${student.name}-${purchaseNumber}`}
                    className={`relative overflow-hidden rounded-2xl p-4.5 border transition-all duration-500 flex flex-col justify-between ${
                      isNewest
                        ? "bg-slate-900 border-emerald-400/90 ring-2 ring-emerald-400/60 shadow-2xl shadow-emerald-500/20 scale-[1.01]"
                        : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {/* Top Accent line & Newest Badge */}
                    {isNewest && (
                      <div className="flex items-center justify-between mb-3 bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 rounded-xl">
                        <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5 animate-pulse">
                          <Sparkles size={13} className="text-emerald-400" /> NEWEST ACQUISITION
                        </span>
                        <span className="text-[10px] font-black text-emerald-300">Latest</span>
                      </div>
                    )}

                    <div className="flex items-start gap-3.5">
                      {/* Student Icon / Avatar */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shrink-0 shadow-lg border border-white/20 overflow-hidden">
                        {student.photo || student.image ? (
                          <img src={student.photo || student.image} alt={student.name} className="w-full h-full object-cover" />
                        ) : (
                          <User size={28} />
                        )}
                      </div>

                      {/* Name & Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                            Purchase #{purchaseNumber}
                          </span>
                        </div>

                        <h4 className="text-base font-black text-white truncate tracking-tight">
                          {student.name}
                        </h4>

                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${categoryBg}`}>
                            {student.category || "General"}
                          </span>
                          {student.batch && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-rose-400/30 bg-rose-400/10 text-rose-300 flex items-center gap-1">
                              <GraduationCap size={11} /> {student.batch}
                            </span>
                          )}
                          {student.place && (
                            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 truncate">
                              <MapPin size={11} className="text-slate-500 shrink-0" /> {student.place}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Purchase Price Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Coins size={13} className="text-emerald-400" /> Purchase Price
                      </span>
                      <span className="text-sm font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                        ₹{price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

