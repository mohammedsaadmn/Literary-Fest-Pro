import { useState } from "react";
import useAuctionSync from "../hooks/useAuctionSync";
import { Trophy, Award, Users, Coins, CheckCircle, Shield, User, Sparkles } from "lucide-react";

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

function Results() {
  const { teamData, bidHistory } = useAuctionSync();
  const [selectedTeamId, setSelectedTeamId] = useState(1);

  // Sorted leaderboard by squad size then budget remaining
  const leaderboard = [...teamData].sort((a, b) => {
    const aCount = a.studentsWon?.length ?? 0;
    const bCount = b.studentsWon?.length ?? 0;
    if (bCount !== aCount) return bCount - aCount;
    return b.remainingPoints - a.remainingPoints;
  });

  const selectedTeam = teamData.find((t) => t.id === selectedTeamId) || teamData[0] || {};
  const selectedTeamSquad = selectedTeam?.studentsWon || [];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 space-y-8 selection:bg-amber-400 selection:text-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <header className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Trophy size={32} className="fill-slate-950" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                <span>ArtSalvia 2K26</span>
                <span className="text-amber-400 text-xs px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 font-black tracking-widest">
                  RESULTS & STANDINGS
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Live Franchise Member Analytics & Auction Leaderboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-extrabold text-amber-300 flex items-center gap-1.5 shadow-inner">
              <Sparkles size={14} /> {bidHistory.length} Total Participants Auctioned
            </span>
          </div>
        </header>

        {/* 4 Team Standings Cards Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xl font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Shield size={20} className="text-amber-400" /> Franchise Leaderboard
            </h2>
            <span className="text-xs text-slate-400 font-semibold">Ranked by Member Count & Budget</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaderboard.map((team, idx) => {
              const count = team.studentsWon?.length ?? 0;
              const remBudget = team.remainingPoints ?? 150000;
              const totalBudget = team.budget ?? 150000;
              const spentBudget = totalBudget - remBudget;
              const teamColor = team.color || TEAM_COLORS[team.id] || "#3b82f6";
              const isFirst = idx === 0;

              return (
                <div
                  key={team.id}
                  onClick={() => setSelectedTeamId(team.id)}
                  className={`bg-slate-900/90 border rounded-3xl p-6 shadow-2xl backdrop-blur-xl cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    selectedTeamId === team.id
                      ? "border-amber-400 ring-2 ring-amber-400/40 shadow-amber-500/10 scale-[1.02]"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {isFirst && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-yellow-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-bl-2xl shadow-md tracking-wider">
                      🥇 #1 Leader
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shadow-inner">
                      {TEAM_ICONS[team.id] || "🏆"}
                    </div>
                    <div>
                      <h3 className="font-black text-xl uppercase tracking-wide text-white" style={{ color: teamColor }}>
                        {team.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400">Rank #{idx + 1}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">Participants Acquired</span>
                      <span className="text-amber-300 font-black text-base">{count} / 53</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">Budget Spent</span>
                      <span className="text-slate-200 font-extrabold text-sm">₹{spentBudget.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">Budget Left</span>
                      <span className="text-emerald-400 font-black text-sm">₹{remBudget.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Selected Team Member Roster */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">Roster Inspector</span>
              <h2 className="text-2xl font-black uppercase text-white flex items-center gap-2 mt-0.5">
                <Users size={22} className="text-blue-400" /> {selectedTeam.name} Official Members ({selectedTeamSquad.length})
              </h2>
            </div>

            {/* Team Switcher Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {teamData.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTeamId(t.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedTeamId === t.id
                      ? "bg-amber-400 text-slate-950 shadow-md font-black"
                      : "bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  {TEAM_ICONS[t.id]} {t.name}
                </button>
              ))}
            </div>
          </div>

          {selectedTeamSquad.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-semibold text-base">
              No participants currently acquired by {selectedTeam.name}.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedTeamSquad.map((student, index) => (
                <div
                  key={index}
                  className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-inner hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md">
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{student.name}</h4>
                      <p className="text-xs text-slate-400 font-medium">{student.place}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                    <span className="px-2.5 py-0.5 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded-full font-extrabold text-[10px]">
                      {student.category}
                    </span>
                    <span className="text-slate-400 font-bold">
                      {student.competitions?.length || 0} Events
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default Results;
