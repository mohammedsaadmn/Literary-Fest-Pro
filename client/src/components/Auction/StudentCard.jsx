import { User, Trophy, MapPin, Hash, Award, ArrowRight, GraduationCap, Calendar, Coins, Shield, Star, Sparkles } from "lucide-react";

function StudentCard({ student, nextStudent, currentBid = 0 }) {
  if (!student) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 font-bold shadow-2xl backdrop-blur-xl">
        <User size={64} className="mx-auto text-slate-600 mb-3" />
        <p className="text-xl font-extrabold text-slate-300">No Active Participant Selected</p>
        <p className="text-xs text-slate-500 mt-1">Waiting for next participant to enter live auction stage...</p>
      </div>
    );
  }

  const categoryColor =
    student.category === "Senior"
      ? "bg-amber-400/10 text-amber-400 border-amber-400/30"
      : student.category === "Junior"
      ? "bg-blue-400/10 text-blue-400 border-blue-400/30"
      : "bg-purple-400/10 text-purple-400 border-purple-400/30";

  return (
    <div className="bg-slate-900/95 border border-slate-800/90 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group transition-all duration-300">
      {/* Ambient Background Decorative Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-500" />

      <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center relative z-10">
        
        {/* Left Column: Participant Photo/Avatar & Identifiers */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-3">
          <div className="relative">
            {/* Photo Container with Gradient Ring Border */}
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-1 shadow-2xl shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center overflow-hidden">
                {student.photo || student.image ? (
                  <img src={student.photo || student.image} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={84} className="text-white/90" />
                )}
              </div>
            </div>

            {/* Floating Participant ID Badge */}
            {(student.studentId || student.id) && (
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-950 text-amber-400 border border-amber-400/40 text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1 shrink-0">
                <Hash size={12} /> ID #{student.studentId || student.id}
              </span>
            )}
          </div>

          {/* Exceptional Talent Badge if applicable */}
          {student.exceptional && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase tracking-wider shadow-md animate-pulse mt-2">
              <Star size={12} className="fill-amber-300" /> Exceptional Star Participant
            </span>
          )}
        </div>

        {/* Right Column: Educational Hierarchy, Name & Real-Time Stats */}
        <div className="md:col-span-8 space-y-5">
          
          <div className="space-y-2.5">
            {/* Educational Level & Category Badge Row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category Badge */}
              <span className={`px-3 py-1 text-xs font-black rounded-full border uppercase tracking-wider flex items-center gap-1.5 ${categoryColor}`}>
                <Award size={14} /> {student.category || "General"}
              </span>

              {/* Educational Level / Batch Badge */}
              {student.batch && (
                <span className="px-3 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-black rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <GraduationCap size={15} className="text-rose-400" />
                  <span>{student.batch}</span>
                </span>
              )}

              {/* Academic Admission Year */}
              {student.year && (
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-black rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar size={14} className="text-purple-400" /> {student.year}
                </span>
              )}

              {/* Location / Institution */}
              {student.place && (
                <span className="px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-extrabold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={14} className="text-blue-400" /> {student.place}
                </span>
              )}
            </div>

            {/* Participant Main Name */}
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-md">
              {student.name}
            </h1>
          </div>

          {/* Educational & Performance Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/90 text-xs font-bold text-slate-300">
            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80 space-y-0.5">
              <span className="text-slate-400 uppercase font-semibold block text-[10px] tracking-wider">Competitions</span>
              <span className="text-base md:text-lg font-black text-yellow-400 flex items-center gap-1.5">
                <Trophy size={16} className="text-yellow-400 shrink-0" />
                <span>{student.competitions?.length || 0} Events</span>
              </span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80 space-y-0.5">
              <span className="text-slate-400 uppercase font-semibold block text-[10px] tracking-wider">Base Price</span>
              <span className="text-base md:text-lg font-black text-emerald-400 flex items-center gap-1.5">
                <Coins size={16} className="text-emerald-400 shrink-0" />
                <span>₹{student.startingBid || 500}</span>
              </span>
            </div>

            {student.maxBid && (
              <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80 space-y-0.5 col-span-2 sm:col-span-1">
                <span className="text-slate-400 uppercase font-semibold block text-[10px] tracking-wider">Max Bid Cap</span>
                <span className="text-base md:text-lg font-black text-indigo-400 flex items-center gap-1.5">
                  <Shield size={16} className="text-indigo-400 shrink-0" />
                  <span>₹{student.maxBid}</span>
                </span>
              </div>
            )}
          </div>

          {/* Current Highest Offer Display & Next Participant Action Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="bg-slate-950/90 border border-slate-800 px-5 py-3.5 rounded-2xl flex-1 shadow-inner">
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest flex items-center gap-1">
                <Sparkles size={13} className="text-amber-400" /> Current Highest Offer
              </p>
              <p className="text-3xl md:text-4xl font-black text-yellow-400 tracking-tight mt-0.5">
                ₹{currentBid.toLocaleString("en-IN")}
              </p>
            </div>

            {nextStudent && (
              <button
                onClick={nextStudent}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-black px-6 py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer active:scale-95 shrink-0"
              >
                <span>Next Participant</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default StudentCard;