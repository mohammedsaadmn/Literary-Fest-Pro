import farasztoLogo from "../assets/faraszto-logo.png";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sparkles,
  Trophy,
  Tv,
  Sliders,
  LogIn,
  Award,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home", icon: Sparkles },
    { path: "/control", label: "Control Center", icon: Sliders },
    { path: "/display", label: "Display Stage", icon: Tv },
    { path: "/results", label: "Results", icon: Award },
    { path: "/login", label: "Login", icon: LogIn },
  ];

  // Close the mobile menu whenever the route changes.
 

  // Allow closing the menu with the Escape key.
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-500/20 bg-[#020817]/95 text-white shadow-[0_8px_35px_rgba(0,80,200,0.12)] backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-5 md:px-8">

        
{/* FARASZTO Brand */}
<Link
  to="/"
  className="flex min-w-0 items-center gap-2 sm:gap-3"
  aria-label="FARASZTO home"
>
  <img
  src={farasztoLogo}
  alt="FARASZTO — Sprouting of Art"
  className="h-10 w-auto max-w-[140px] shrink-0 rounded-lg border border-blue-400/30 bg-white p-1 object-contain shadow-[0_0_18px_rgba(0,120,255,0.22)] sm:h-12 sm:max-w-[180px]"
/>

  <div className="min-w-0">
    <h1 className="text-sm font-black uppercase tracking-tight text-white sm:text-lg md:text-xl">
      
      <span className="ml-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider text-amber-400 sm:px-2 sm:text-xs">
        PRO
      </span>
    </h1>

    <p className="truncate text-[8px] font-semibold uppercase tracking-wider text-slate-400 sm:text-[10px]">
      Live Fest Auction
    </p>
  </div>
</Link>


        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-extrabold uppercase tracking-wide transition-all duration-300 xl:px-4 xl:text-sm ${
  isActive
    ? "border-amber-400/50 bg-gradient-to-b from-amber-400/20 to-amber-500/5 text-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.16)]"
    : "border-transparent text-slate-300 hover:border-blue-400/20 hover:bg-blue-400/5 hover:text-white"
}`}
                >
                  <Icon
                    size={16}
                    className={isActive ? "text-amber-400" : ""}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-amber-400 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 lg:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile navigation panel */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-800 bg-slate-950 px-3 pb-4 pt-3 shadow-2xl lg:hidden sm:px-5"
        >
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Navigation
          </p>

          <ul className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-12 items-center gap-3 rounded-xl border px-3 py-3 text-sm font-bold transition-colors ${
                      isActive
                        ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
                        : "border-transparent text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    <Icon
                      size={19}
                      className={isActive ? "text-amber-400" : "text-slate-400"}
                    />
                    <span className="flex-1">{item.label}</span>
                    {isActive && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                        Current
                      </span>
                    )}
                    <ChevronRight
                      size={16}
                      className={isActive ? "text-amber-400" : "text-slate-600"}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-3 px-3 text-center text-[10px] text-slate-500">
            ArtSalvia PRO · Live Fest Auction
          </p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
