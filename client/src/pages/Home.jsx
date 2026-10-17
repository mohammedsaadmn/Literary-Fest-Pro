
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Trophy,
  ShieldCheck,
  Coins,
  Users,
  Zap,
  Radio,
  SlidersHorizontal,
  Tv,
  Award,
  ArrowRight,
  ChevronRight,
  Clock3,
  Layers3,
  Sparkles,
  Crown,
  Menu,
} from "lucide-react";

const TEAMS = [
  {
    id: 2,
    name: "Falcons",
    icon: "🦅",
    path: "/falcons",
    accent: "text-blue-300",
    border: "border-blue-400/25 hover:border-blue-300/60",
    glow: "from-blue-500/20 to-cyan-500/5",
    badge: "bg-blue-400/10 text-blue-200 border-blue-300/20",
    description: "Build a balanced squad with smart, strategic bidding.",
  },
  {
    id: 3,
    name: "Titans",
    icon: "🛡️",
    path: "/titans",
    accent: "text-emerald-300",
    border: "border-emerald-400/25 hover:border-emerald-300/60",
    glow: "from-emerald-500/20 to-teal-500/5",
    badge: "bg-emerald-400/10 text-emerald-200 border-emerald-300/20",
    description: "Compete for talent while protecting your team budget.",
  },
  {
    id: 4,
    name: "Legends",
    icon: "👑",
    path: "/legends",
    accent: "text-amber-300",
    border: "border-amber-400/25 hover:border-amber-300/60",
    glow: "from-amber-500/20 to-yellow-500/5",
    badge: "bg-amber-400/10 text-amber-200 border-amber-300/20",
    description: "Make decisive bids and assemble a championship squad.",
  },
];

const STATS = [
  { value: "150", label: "Student talent pool", icon: Users },
  { value: "₹1.5L", label: "Starting budget per team", icon: Coins },
  { value: "03", label: "Competing franchises", icon: Trophy },
  { value: "LIVE", label: "Auction synchronization", icon: Radio },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Real-time bidding",
    text: "Keep operator, captain and audience screens synchronized through the live auction connection.",
    color: "text-amber-300",
    background: "bg-amber-400/10 border-amber-300/15",
  },
  {
    icon: ShieldCheck,
    title: "Budget protection",
    text: "Support disciplined bidding with budget-aware auction rules and squad planning.",
    color: "text-emerald-300",
    background: "bg-emerald-400/10 border-emerald-300/15",
  },
  {
    icon: Tv,
    title: "Audience stage",
    text: "Present student details, bid activity and auction progress on the display screen.",
    color: "text-violet-300",
    background: "bg-violet-400/10 border-violet-300/15",
  },
  {
    icon: Layers3,
    title: "Squad categories",
    text: "Organize each 50-member squad into Senior, Junior and Sub-Junior categories.",
    color: "text-sky-300",
    background: "bg-sky-400/10 border-sky-300/15",
  },
];

const PORTALS = [
  {
    title: "Operator Control Center",
    description: "Manage the auction and control bidding activity.",
    path: "/control",
    icon: SlidersHorizontal,
    color: "text-amber-300",
    background: "from-amber-500/15 to-orange-500/5",
    border: "hover:border-amber-300/40",
  },
  {
    title: "Audience Display Stage",
    description: "Show the live auction on a projector or large screen.",
    path: "/display",
    icon: Tv,
    color: "text-violet-300",
    background: "from-violet-500/15 to-indigo-500/5",
    border: "hover:border-violet-300/40",
  },
  {
    title: "Results & Standings",
    description: "Review acquired participants and team budgets.",
    path: "/results",
    icon: Award,
    color: "text-emerald-300",
    background: "from-emerald-500/15 to-teal-500/5",
    border: "hover:border-emerald-300/40",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-200 sm:text-xs">
        <Sparkles size={13} />
        {eyebrow}
      </span>

      <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function Home() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050916] text-white selection:bg-amber-300 selection:text-slate-950">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-48 left-1/2 h-[28rem] w-[45rem] -translate-x-1/2 rounded-full bg-blue-600/[0.12] blur-[120px]" />
        <div className="absolute right-[-12rem] top-[35rem] h-96 w-96 rounded-full bg-violet-600/[0.08] blur-[100px]" />
        <div className="absolute left-[-12rem] top-[70rem] h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="relative isolate">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-24">
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/[0.07] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.13em] text-blue-200 sm:text-xs sm:tracking-[0.16em]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              FARASZTO · Live Auction Platform
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.08] tracking-[-0.045em] sm:text-5xl md:text-6xl xl:text-7xl">
              The next bid.
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                The winning team.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 md:text-lg">
              A live talent auction experience built for strategic bidding,
              transparent team budgets and a captivating audience stage.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/control"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-500 px-5 py-3 text-sm font-black text-slate-950 shadow-[0_8px_30px_rgba(245,158,11,0.16)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(245,158,11,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
              >
                <SlidersHorizontal size={17} />
                Open Control Center
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/display"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition duration-300 hover:border-blue-300/30 hover:bg-blue-400/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                <Tv size={17} className="text-blue-200" />
                View Live Stage
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-slate-400">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={15} className="text-emerald-300" />
                Budget-aware bidding
              </span>
              <span className="inline-flex items-center gap-2">
                <Radio size={15} className="text-blue-300" />
                Real-time synchronization
              </span>
            </div>
          </motion.div>

          {/* Auction overview visual */}
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.75, delay: 0.12 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-transparent to-amber-400/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1224]/90 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
                    Auction overview
                  </p>
                  <h2 className="mt-1 text-lg font-black sm:text-xl">The competition</h2>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-2.5 py-1.5 text-[10px] font-bold text-emerald-200 sm:text-xs">
                  <Radio size={12} />
                  Live-ready
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <Users size={18} className="text-blue-300" />
                  <p className="mt-3 text-2xl font-black sm:text-3xl">150</p>
                  <p className="mt-1 text-[11px] font-medium text-slate-400 sm:text-xs">Students in pool</p>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <Coins size={18} className="text-amber-300" />
                  <p className="mt-3 text-2xl font-black sm:text-3xl">₹1.5L</p>
                  <p className="mt-1 text-[11px] font-medium text-slate-400 sm:text-xs">Starting team budget</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-300">Competing franchises</p>
                  <p className="text-[10px] font-semibold text-slate-500">3 teams · 50 places each</p>
                </div>

                <div className="space-y-2.5">
                  {TEAMS.map((team, index) => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, x: reduceMotion ? 0 : 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.3 + index * 0.12 }}
                      className={`flex items-center gap-3 rounded-xl border bg-gradient-to-r ${team.glow} ${team.border} p-3 transition duration-300`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-xl">
                        {team.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-black uppercase tracking-wide ${team.accent}`}>
                          {team.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
                          Squad capacity · 50 members
                        </p>
                      </div>
                      <span className={`rounded-lg border px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider ${team.badge}`}>
                        Team {index + 1}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.05] p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-300/10 text-amber-200">
                  <Clock3 size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Every bid matters</p>
                  <p className="mt-1 text-[10px] leading-5 text-slate-400 sm:text-xs">
                    Follow the auction from operator console to final standings.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key statistics */}
      <section className="relative border-y border-white/[0.07] bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-5 sm:px-6 md:grid-cols-4 md:px-8 md:py-7">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.08 }}
                className="flex items-center gap-3 px-2 py-4 sm:px-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon size={19} className="text-amber-200" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xl font-black tracking-tight sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Team showcase */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Meet the franchises"
            title="Three teams. One championship."
            description="Every franchise has 50 squad places and a starting purse of ₹1,50,000. Choose a team portal to access its captain dashboard."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TEAMS.map((team, index) => (
              <motion.article
                key={team.id}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.1 }}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                className={`group relative isolate overflow-hidden rounded-2xl border bg-[#0b1224]/90 p-5 shadow-xl transition-colors duration-300 sm:p-6 ${team.border}`}
              >
                <div className={`pointer-events-none absolute -right-12 -top-16 -z-10 h-48 w-48 rounded-full bg-gradient-to-br ${team.glow} opacity-80 blur-3xl transition-opacity group-hover:opacity-100`} />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-3xl shadow-inner">
                    {team.icon}
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] ${team.badge}`}>
                    Franchise {index + 1}
                  </span>
                </div>

                <h3 className={`mt-5 text-2xl font-black uppercase tracking-tight ${team.accent}`}>
                  {team.name}
                </h3>
                <p className="mt-2 min-h-[3rem] text-sm leading-6 text-slate-400">
                  {team.description}
                </p>

                <div className="my-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Squad limit</p>
                    <p className="mt-1 text-lg font-black">50 members</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Starting purse</p>
                    <p className="mt-1 text-lg font-black">₹1.5L</p>
                  </div>
                </div>

                <Link
                  to={team.path}
                  className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-xs font-extrabold text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  Open captain dashboard
                  <ChevronRight size={17} className={`shrink-0 ${team.accent} transition-transform group-hover:translate-x-1`} />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Platform features */}
      <section className="relative border-y border-white/[0.07] bg-white/[0.02] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Designed for live events"
            title="Everything the auction needs."
            description="A coordinated experience for the auction operator, team captains and the audience watching the stage."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.08 }}
                  className="rounded-2xl border border-white/[0.08] bg-[#0b1224]/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/15 sm:p-6"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${feature.background} ${feature.color}`}>
                    <Icon size={21} />
                  </div>
                  <h3 className="mt-5 text-base font-extrabold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{feature.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Squad quota breakdown */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[0.07] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-violet-200 sm:text-xs">
              <Crown size={14} />
              Balanced squad structure
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              Build a complete squad.
              <span className="block text-slate-400">Make every place count.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Each franchise aims to build a 50-member squad with the intended category distribution. Keep the quotas visible while planning bids.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b1224]/90 p-5 shadow-2xl sm:p-7">
            {[
              { name: "Senior", count: 12, color: "bg-amber-300", text: "text-amber-200" },
              { name: "Junior", count: 26, color: "bg-blue-300", text: "text-blue-200" },
              { name: "Sub-Junior", count: 12, color: "bg-violet-300", text: "text-violet-200" },
            ].map((category) => (
              <div key={category.name} className="mb-5 last:mb-0">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-slate-200">{category.name}</span>
                  <span className={`text-sm font-black ${category.text}`}>{category.count} places</span>
                </div>
                <div
                  className="h-2.5 overflow-hidden rounded-full bg-white/[0.07]"
                  role="img"
                  aria-label={`${category.name}: ${category.count} of 50 squad places`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(category.count / 50) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${category.color}`}
                  />
                </div>
              </div>
            ))}

            <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Squad target</span>
              <span className="text-xl font-black text-white">50 members</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick access portals */}
      <section className="relative border-y border-white/[0.07] bg-white/[0.02] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Quick access"
            title="Your auction, one click away."
            description="Jump straight into the tool you need. Each shortcut keeps its existing application route."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PORTALS.map((portal, index) => {
              const Icon = portal.icon;
              return (
                <motion.div
                  key={portal.path}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.08 }}
                >
                  <Link
                    to={portal.path}
                    className={`group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br ${portal.background} p-5 transition duration-300 ${portal.border} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:p-6`}
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 ${portal.color}`}>
                      <Icon size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-extrabold text-white sm:text-base">{portal.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">{portal.description}</p>
                    </div>
                    <ArrowRight size={18} className={`shrink-0 ${portal.color} transition-transform duration-300 group-hover:translate-x-1`} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="relative px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.55 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-amber-200/20 bg-gradient-to-br from-amber-300/[0.12] via-[#0b1224] to-blue-500/[0.10] p-6 shadow-2xl sm:p-10 md:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-amber-300/[0.08] blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-200">
                <Trophy size={15} />
                The stage is yours
              </span>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
                Ready to run the auction?
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                Open the control center to manage bidding, or launch the stage display for your audience.
              </p>
            </div>
            <Link
              to="/control"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Start managing
              <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="relative border-t border-white/[0.07] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs font-bold tracking-wide text-slate-300">
            FARASZTO <span className="text-slate-600">·</span> Live Fest Auction
          </p>
          <p className="text-[10px] text-slate-500 sm:text-xs">
            A coordinated platform for live bidding and team management.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default Home;
