import { User, Trophy, MapPin, Hash, Award, ArrowRight } from "lucide-react";

function StudentCard({ student, nextStudent, currentBid = 0 }) {
  if (!student) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 font-bold shadow-2xl backdrop-blur-xl">
        <User size={64} className="mx-auto text-slate-600 mb-3" />
        <p className="text-xl">No Active Student Selected</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
      {/* Background Decorative Ambient Lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center relative z-10">
        
        {/* Left Column: Avatar & ID */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
          <div className="relative">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center border-4 border-amber-400 shadow-2xl shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <User size={80} className="text-white" />
            </div>
            {student.studentId && (
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-950 text-amber-400 border border-amber-400/40 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                <Hash size={12} /> {student.studentId}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Details & Real-Time Bidding Stats */}
        <div className="md:col-span-8 space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-black rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Award size={14} /> {student.category}
              </span>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-extrabold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={14} /> {student.place}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {student.name}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-300 pt-2 border-t border-slate-800">
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 uppercase font-semibold block mb-0.5 text-[10px]">Competitions</span>
              <span className="text-lg font-black text-yellow-400 flex items-center gap-1">
                <Trophy size={16} /> {student.competitions?.length || 0} Events
              </span>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 uppercase font-semibold block mb-0.5 text-[10px]">Base Price</span>
              <span className="text-lg font-black text-emerald-400">₹500</span>
            </div>
          </div>

          {/* Current Bid Display & Next Student Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="bg-slate-950/90 border border-slate-800 px-5 py-3 rounded-2xl flex-1">
              <p className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Current Highest Offer</p>
              <p className="text-3xl md:text-4xl font-black text-yellow-400 tracking-tight mt-0.5">
                ₹{currentBid.toLocaleString("en-IN")}
              </p>
            </div>

            {nextStudent && (
              <button
                onClick={nextStudent}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold px-6 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer active:scale-95 shrink-0"
              >
                <span>Next Student</span>
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