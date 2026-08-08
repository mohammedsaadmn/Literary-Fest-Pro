import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/control");
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-amber-400 selection:text-slate-950">
      
      {/* Background Decorative Ambient Illumination */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 backdrop-blur-2xl p-8 md:p-10 rounded-3xl shadow-2xl relative z-10 space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 mx-auto flex items-center justify-center text-slate-950 font-black shadow-xl shadow-amber-500/20">
            <Trophy size={34} className="fill-slate-950" />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">
              ArtSalvia <span className="text-amber-400">Login</span>
            </h1>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Live Auction Admin & Captain Portal Access
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@artsalvia.com"
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400/80 text-white rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400/80 text-white rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black py-4 rounded-2xl transition-all duration-200 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
          >
            <span>Access Control Portal</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-500 font-bold flex items-center justify-center gap-1.5 uppercase tracking-wider">
          <ShieldCheck size={14} className="text-emerald-400" /> Secured Real-Time Socket Connection
        </div>

      </div>
    </div>
  );
}

export default Login;
