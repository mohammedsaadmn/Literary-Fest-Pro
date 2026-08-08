import useAuctionSync from "../hooks/useAuctionSync";
import { User, Trophy, MapPin, Clock, Award, CheckCircle, Users, Radio, Sparkles } from "lucide-react";

const TEAM_ICONS = {
  1: "🦅", // Phoenix
  2: "🦅", // Falcons
  3: "🛡️", // Titans
  4: "👑", // Legends
};

const TEAM_COLORS = {
  1: "#ef4444",
  2: "#3b82f6",
  3: "#10b981",
  4: "#eab308",
};

function Display() {
  const {
    auction,
    teamData,
    currentStudentIndex,
    currentStudent,
    bidHistory,
    timer,
    auctionRound,
    totalStudents,
    unsoldStudentsCount,
    auctionCompleted,
    isConnected,
  } = useAuctionSync();

  // Sorted Leaderboard (highest remaining budget / highest players)
  const sortedTeams = [...teamData].sort((a, b) => {
    if (b.studentsWon.length !== a.studentsWon.length) {
      return b.studentsWon.length - a.studentsWon.length;
    }
    return b.remainingPoints - a.remainingPoints;
  });

  const last5Sold = bidHistory.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 flex flex-col justify-between selection:bg-yellow-400 selection:text-slate-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        
        {/* Stage Header */}
        <header className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Trophy size={28} className="fill-slate-950" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-black tracking-tight uppercase text-yellow-400">
                ART SALVIA 2K26 LIVE AUCTION
              </h1>
              <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Official Stage Projector View</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="px-4 py-2 bg-yellow-400/10 text-yellow-300 border border-yellow-400/30 text-xs md:text-sm font-black rounded-2xl uppercase tracking-wider flex items-center gap-2 shadow-inner">
              🏆 Round {auctionRound}
            </span>

            <span className="px-4 py-2 bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs md:text-sm font-black rounded-2xl uppercase tracking-wider flex items-center gap-2">
              📋 Unsold Pool: {unsoldStudentsCount}
            </span>

            <span
              className={`px-3 py-2 text-xs font-bold rounded-2xl flex items-center gap-1.5 border ${
                isConnected
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse"
              }`}
            >
              <Radio size={14} className={isConnected ? "text-green-400" : "text-red-400 animate-pulse"} />
              <span>{isConnected ? "Live Sync Active" : "Reconnecting..."}</span>
            </span>
          </div>
        </header>

        {/* Completion Banner */}
        {auctionCompleted && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl text-center shadow-2xl font-black text-2xl md:text-4xl tracking-wide uppercase border-2 border-emerald-400 animate-pulse">
            🎉 AUCTION COMPLETED FOR ALL ROUNDS!
          </div>
        )}

        {/* Main Stage Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Current Student Visual Card */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden backdrop-blur-xl group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs md:text-sm font-extrabold rounded-full uppercase tracking-widest">
                  Student {currentStudentIndex + 1} / {totalStudents}
                </span>
                <span className="px-4 py-1.5 bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs md:text-sm font-black rounded-full uppercase tracking-widest flex items-center gap-1.5">
                  <Award size={16} /> {currentStudent?.category || "N/A"}
                </span>
              </div>

              {/* Large Student Visual Container */}
              <div className="flex flex-col items-center text-center p-6 md:p-8 bg-slate-950/70 rounded-3xl border border-slate-800/90 shadow-inner">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center border-4 border-amber-400 shadow-2xl mb-4 shrink-0">
                  <User size={80} className="text-white" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight my-1">
                  {currentStudent?.name || "No Student Active"}
                </h2>
                <div className="flex items-center gap-2 text-slate-300 text-base md:text-lg mt-2 font-bold">
                  <MapPin size={20} className="text-blue-400" />
                  <span>{currentStudent?.place || "Location Unspecified"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-extrabold uppercase tracking-wider">
              <span>Category: <strong className="text-amber-400">{currentStudent?.category || "N/A"}</strong></span>
              <span>Stage Status: <strong className="text-green-400">ON AUCTION</strong></span>
            </div>
          </div>

          {/* Right Column: Highest Offer Display & Countdown Timer */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Current Highest Offer Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-center relative overflow-hidden backdrop-blur-xl">
              <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <p className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-400 mb-1">
                Current Highest Offer
              </p>
              
              <div className="text-6xl md:text-8xl font-black text-yellow-400 tracking-tight drop-shadow-lg my-1">
                ₹{auction.currentBid.toLocaleString("en-IN")}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800/90 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                    Highest Bidder
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-3xl">
                      {auction.highestBidder ? TEAM_ICONS[auction.highestBidder] || "👑" : "⚖️"}
                    </span>
                    <span className="text-2xl md:text-4xl font-black text-white tracking-wide">
                      {auction.highestTeamName || "No Bids Yet"}
                    </span>
                  </div>
                </div>

                {auction.highestBidder && (
                  <span className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black rounded-2xl text-xs md:text-sm uppercase tracking-wider shadow-lg shadow-amber-400/20 flex items-center gap-1.5 animate-pulse">
                    <Sparkles size={16} /> Top Offer
                  </span>
                )}
              </div>
            </div>

            {/* Countdown Timer with Urgency Pulse */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex items-center justify-between backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black border-2 transition-all ${
                    timer <= 5
                      ? "bg-red-500/20 text-red-500 border-red-500 animate-bounce"
                      : "bg-green-500/20 text-green-400 border-green-500"
                  }`}
                >
                  <Clock size={32} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-extrabold tracking-wider">
                    Countdown Timer
                  </p>
                  <p className="text-xs text-slate-500 font-medium">Resets on incoming bids</p>
                </div>
              </div>

              <div
                className={`text-5xl md:text-6xl font-black tracking-tight ${
                  timer <= 5 ? "text-red-500 animate-pulse" : "text-green-400"
                }`}
              >
                {timer}s
              </div>
            </div>

          </div>

        </main>

        {/* Bottom Section: Live Team Leaderboard & Last 5 Sold Students */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Live Team Leaderboard */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Users size={20} className="text-blue-400" /> Franchise Leaderboard & Budgets
              </h3>
              <span className="text-xs text-slate-400 font-bold">4 Teams Competing</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sortedTeams.map((team) => {
                const isLeading = auction.highestBidder === team.id;
                const wonCount = team.studentsWon?.length ?? 0;
                const remBudget = team.remainingPoints ?? 150000;
                const spentBudget = (team.budget ?? 150000) - remBudget;
                const teamColor = team.color || TEAM_COLORS[team.id] || "#3b82f6";
                const maxSquad = 53;
                const squadPercent = Math.min(100, (wonCount / maxSquad) * 100);

                return (
                  <div
                    key={team.id}
                    className={`rounded-2xl p-4 border transition-all ${
                      isLeading
                        ? "border-amber-400 bg-slate-950/90 shadow-xl ring-2 ring-amber-400/30"
                        : "border-slate-800 bg-slate-950/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{TEAM_ICONS[team.id] || "🛡️"}</span>
                        <h4 className="font-black text-lg uppercase tracking-wide text-white" style={{ color: teamColor }}>
                          {team.name}
                        </h4>
                      </div>
                      {isLeading && (
                        <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 text-xs font-black rounded-full uppercase border border-amber-400/30">
                          Highest Bidder
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-xs">
                      <div>
                        <p className="text-slate-400 font-bold text-[10px] uppercase">Remaining</p>
                        <p className="text-base font-black text-emerald-400 mt-0.5">
                          ₹{remBudget.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold text-[10px] uppercase">Spent</p>
                        <p className="text-base font-black text-slate-300 mt-0.5">
                          ₹{spentBudget.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold text-[10px] uppercase">Squad</p>
                        <p className="text-base font-black text-white mt-0.5">
                          {wonCount} / {maxSquad}
                        </p>
                      </div>
                    </div>

                    {/* Mini Squad Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-3">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${squadPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Last 5 Sold Students Feed */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <h3 className="text-lg font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <CheckCircle size={20} className="text-emerald-400" /> Recent Sales
                </h3>
                <span className="text-xs text-slate-400 font-bold">{bidHistory.length} Total</span>
              </div>

              {last5Sold.length === 0 ? (
                <div className="text-center text-slate-500 text-sm py-8 font-semibold">
                  No students sold yet
                </div>
              ) : (
                <div className="space-y-3">
                  {last5Sold.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-extrabold text-sm text-white">{item.student}</p>
                        <p className="text-xs text-slate-400 font-medium">Sold to: <span className="text-blue-400 font-bold">{item.team}</span></p>
                      </div>
                      <span className="text-xs font-black text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-xl border border-yellow-400/20">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-500 font-bold uppercase tracking-widest">
              Live Stage Audience Screen
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}

export default Display;
