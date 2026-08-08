import { Link, useLocation } from "react-router-dom";
import { Sparkles, Trophy, Tv, Sliders, LogIn, Award } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Sparkles },
    { path: "/control", label: "Control Center", icon: Sliders },
    { path: "/display", label: "Display Stage", icon: Tv },
    { path: "/results", label: "Results", icon: Award },
    { path: "/login", label: "Login", icon: LogIn },
  ];

  return (
    <nav className="bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl sticky top-0 z-50 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3.5">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Trophy size={22} className="fill-slate-950" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black tracking-tight text-white uppercase flex items-center gap-1.5">
              <span>ArtSalvia</span>
              <span className="text-amber-400 text-xs px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 font-extrabold tracking-widest">PRO</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Live Fest Auction</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-1 md:gap-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all duration-150 ${
                    isActive
                      ? "bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-inner"
                      : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-amber-400" : "text-slate-400"} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
