import { useEffect, useState } from "react";
import {
  Globe2,
  Satellite,
  MapPinned,
  Layers3,
  Sparkles,
  Waves,
  Trees,
  Building2,
  ArrowRight,
  RotateCcw,
  MousePointer2,
  Compass,
  Check,
  Zap,
} from "lucide-react";

/**
 * Interactive Bhuvan GPT splash screen.
 *
 * Props:
 * - onComplete: called when the user presses "Enter workspace" or auto-complete is enabled.
 * - onSkip: optional callback for Skip.
 * - autoComplete: automatically completes after duration when true (default false).
 * - duration: auto-complete duration in ms (default 3200).
 * - appName: product name.
 */
export default function LoadingPage({
  onComplete,
  onSkip,
  autoComplete = true,
  duration = 10000,
  appName = "Bhuvan GPT",
}) {
  const [progress, setProgress] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedMode, setSelectedMode] = useState("Satellite");
  const [showTips, setShowTips] = useState(true);
  const [ready, setReady] = useState(false);

  const features = [
    { icon: Satellite, label: "Satellite imagery", detail: "Explore Earth from above", color: "from-blue-600 to-cyan-500" },
    { icon: Waves, label: "Water resources", detail: "Discover rivers, lakes and watersheds", color: "from-cyan-600 to-blue-500" },
    { icon: Trees, label: "Land insights", detail: "Understand land use and green cover", color: "from-emerald-600 to-teal-500" },
    { icon: Building2, label: "Urban growth", detail: "See how cities change over time", color: "from-violet-600 to-blue-500" },
  ];

  useEffect(() => {
    if (!autoComplete) return;
    const start = Date.now();
    const timer = window.setInterval(() => {
      const value = Math.min(100, Math.round(((Date.now() - start) / duration) * 100));
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(timer);
        setReady(true);
        onComplete?.();
      }
    }, 40);
    return () => window.clearInterval(timer);
  }, [autoComplete, duration, onComplete]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveFeature((current) => (current + 1) % features.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  const enterWorkspace = () => {
    setProgress(100);
    setReady(true);
    onComplete?.();
  };

  const skip = () => {
    onSkip?.();
    onComplete?.();
  };

  const modes = ["Satellite", "Streets", "Terrain"];

  return (
    <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#071329] px-3 py-5 text-white sm:px-6 sm:py-8 lg:px-8">
      {/* Animated night-sky / grid backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(37,99,235,0.28),transparent_50%),radial-gradient(ellipse_at_90%_90%,rgba(6,182,212,0.14),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]" style={{
        backgroundImage: "linear-gradient(rgba(125,181,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(125,181,255,.22) 1px, transparent 1px)",
        backgroundSize: "46px 46px",
        maskImage: "radial-gradient(ellipse at center, black 15%, transparent 80%)",
      }} />
      <div className="pointer-events-none absolute left-[8%] top-[15%] h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_20px_5px_rgba(34,211,238,.4)]" />
      <div className="pointer-events-none absolute right-[12%] top-[22%] h-1.5 w-1.5 animate-ping rounded-full bg-blue-300" />
      <div className="pointer-events-none absolute bottom-[17%] left-[17%] h-1.5 w-1.5 animate-pulse rounded-full bg-sky-300" />

      <section className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-7 sm:gap-9 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        {/* Interactive globe side */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-5 inline-flex items-center gap-3 sm:mb-8">
            <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-blue-300/30 bg-blue-500/15 text-cyan-200 shadow-[0_0_40px_rgba(59,130,246,.18)]">
              <Globe2 size={27} strokeWidth={1.7} />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#071329] bg-emerald-400" />
            </div>
            <div className="text-left">
              <div className="text-xl font-bold tracking-tight sm:text-2xl">{appName.split(" ")[0]} <span className="text-cyan-300">{appName.split(" ").slice(1).join(" ")}</span></div>
              <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-200/60">Geospatial intelligence</div>
            </div>
          </div>

          <div className="relative mb-5 flex h-[235px] w-full max-w-[440px] items-center justify-center sm:mb-7 sm:h-[320px] md:h-[350px]">
            <div className="absolute h-[205px] w-[205px] rounded-full border border-blue-300/15 sm:h-[270px] sm:w-[270px] md:h-[300px] md:w-[300px]" />
            <div className="absolute h-[180px] w-[180px] animate-[spin_18s_linear_infinite] motion-reduce:animate-none rounded-full border border-dashed border-cyan-300/35 sm:h-[240px] sm:w-[240px] md:h-[270px] md:w-[270px]">
              <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_18px_4px_rgba(103,232,249,.4)]" />
            </div>
            <div className="absolute h-[155px] w-[155px] animate-[spin_25s_linear_infinite_reverse] motion-reduce:animate-none rounded-full border border-blue-300/25 sm:h-[205px] sm:w-[205px] md:h-[230px] md:w-[230px]">
              <span className="absolute bottom-6 -left-1 h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_16px_3px_rgba(96,165,250,.5)]" />
            </div>
            <button
              type="button"
              onClick={() => setActiveFeature((activeFeature + 1) % features.length)}
              aria-label="Change globe highlight"
              title="Click to explore another geospatial capability"
              className="group relative grid h-[132px] w-[132px] cursor-pointer place-items-center rounded-full transition duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-200/70 sm:h-[180px] sm:w-[180px] md:h-[205px] md:w-[205px]"
            >
              {/* Real Earth imagery, clipped into a sphere. Remote image requires internet access. */}
              <span className="absolute inset-0 overflow-hidden rounded-full border border-cyan-100/40 bg-[#061a35] shadow-[inset_-24px_-18px_35px_rgba(3,12,40,.65),0_0_70px_rgba(37,99,235,.35)]">
                <img
                  src="https://images-assets.nasa.gov/image/PIA00122/PIA00122~orig.jpg"
                  alt="Earth from space"
                  className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-125 motion-reduce:transition-none"
                  onError={(event) => {
                    event.currentTarget.src = "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57730/globe_west_2048.jpg";
                  }}
                />
                <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#020817]/75 via-transparent to-cyan-100/10" />
                <span className="absolute inset-0 rounded-full shadow-[inset_-22px_-12px_25px_rgba(0,0,0,.7),inset_8px_5px_20px_rgba(255,255,255,.12)]" />
              </span>
              <span className="absolute left-[64%] top-[30%] h-3 w-3 rounded-full border-2 border-white bg-orange-400 shadow-[0_0_0_6px_rgba(251,146,60,.16),0_0_18px_rgba(251,146,60,.75)]" />
              <span className="absolute left-[27%] top-[59%] h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-300 shadow-[0_0_0_5px_rgba(52,211,153,.15)]" />
              <span className="absolute bottom-5 right-5 rounded-full border border-white/20 bg-slate-950/55 px-2 py-1 text-[9px] font-bold tracking-widest text-white/90">EARTH 01</span>
              <span className="absolute -bottom-10 whitespace-nowrap text-[10px] font-medium text-cyan-100/70 opacity-0 transition group-hover:opacity-100"><MousePointer2 size={12} className="mr-1 inline" /> Click to explore features</span>
            </button>
            <div className="absolute left-0 top-[18%] hidden rounded-xl border border-white/10 bg-slate-900/75 px-3 py-2 text-left backdrop-blur-md sm:block">
              <div className="flex items-center gap-2 text-[10px] font-semibold text-cyan-200"><Satellite size={13} /> ORBITAL VIEW</div>
              <div className="mt-1 text-[10px] text-slate-400">Earth observation ready</div>
            </div>
            <div className="absolute bottom-[15%] right-0 hidden rounded-xl border border-white/10 bg-slate-900/75 px-3 py-2 text-left backdrop-blur-md sm:block">
              <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-200"><MapPinned size={13} /> MAP INTELLIGENCE</div>
              <div className="mt-1 text-[10px] text-slate-400">Layers • Analysis • Insights</div>
            </div>
          </div>

          <div className="max-w-lg px-1 sm:px-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">
              <Sparkles size={12} /> Your Earth, in a new perspective
            </div>
            <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">Ask questions.<br className="hidden sm:block" /> <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Discover the planet.</span></h1>
            <p className="mx-auto mt-3 max-w-md text-[13px] leading-6 text-blue-100/60 sm:text-sm lg:mx-0">Explore maps, satellite imagery and geospatial insights through a more natural way to ask.</p>
          </div>
        </div>

        {/* Interactive loading / launch panel */}
        <div className="w-full">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] shadow-[0_30px_100px_rgba(0,0,0,.25)] backdrop-blur-2xl sm:rounded-[28px]">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-4 sm:gap-4 sm:px-7 sm:py-5">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-white"><Zap size={16} className="text-cyan-300" /> Workspace initialization</div>
                <p className="mt-1 text-xs text-blue-100/50">Choose what you want to explore first.</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${ready ? "bg-emerald-300/10 text-emerald-200" : "bg-blue-300/10 text-blue-200"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${ready ? "bg-emerald-300" : "animate-pulse bg-cyan-300"}`} />
                {ready ? "READY" : autoComplete ? "INITIALIZING" : "STANDBY"}
              </span>
            </div>

            <div className="p-4 sm:p-6 md:p-7">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-blue-100/60">{autoComplete ? "Launching your workspace in 10 seconds" : "Preview your map style"}</span>
                <span className="text-xs font-bold tabular-nums text-cyan-200">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-300 transition-[width] duration-300" style={{ width: `${progress}%` }} />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-2.5" aria-label="Choose map style">
                {modes.map((mode) => (
                  <button key={mode} type="button" onClick={() => setSelectedMode(mode)} className={`min-h-[72px] rounded-xl border px-1.5 py-2.5 text-[11px] font-semibold transition sm:px-2 sm:py-3 sm:text-xs ${selectedMode === mode ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,.08)]" : "border-white/10 bg-white/[0.03] text-blue-100/55 hover:border-white/25 hover:bg-white/[0.06]"}`}>
                    <span className="mb-1.5 flex justify-center">{mode === "Satellite" ? <Satellite size={18} /> : mode === "Streets" ? <MapPinned size={18} /> : <Compass size={18} />}</span>
                    {mode}
                    {selectedMode === mode && <span className="mt-1 flex justify-center"><Check size={12} /></span>}
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/25 p-3.5 sm:mt-5 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold text-white">Explore capabilities</div>
                  <div className="flex gap-1.5">
                    {features.map((feature, index) => <button key={feature.label} type="button" onClick={() => setActiveFeature(index)} aria-label={`Show ${feature.label}`} className={`h-1.5 rounded-full transition-all ${activeFeature === index ? "w-6 bg-cyan-300" : "w-1.5 bg-white/25 hover:bg-white/50"}`} />)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${features[activeFeature].color} text-white shadow-lg`}>
                    {(() => { const Icon = features[activeFeature].icon; return <Icon size={22} />; })()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-white">{features[activeFeature].label}</div>
                    <div className="mt-1 text-xs leading-5 text-blue-100/55">{features[activeFeature].detail}</div>
                  </div>
                  <button type="button" onClick={() => setActiveFeature((activeFeature + 1) % features.length)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 text-blue-100/70 transition hover:bg-white/10 hover:text-white" aria-label="Next capability"><ArrowRight size={16} /></button>
                </div>
              </div>

              {showTips && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-blue-300/10 bg-blue-400/[0.06] p-3">
                  <Sparkles size={15} className="mt-0.5 shrink-0 text-cyan-300" />
                  <div className="flex-1 text-xs leading-5 text-blue-100/60"><span className="font-semibold text-blue-100">Quick tip:</span> Try asking “Show water bodies near Meerut” once you enter the workspace.</div>
                  <button type="button" onClick={() => setShowTips(false)} className="text-[10px] text-blue-100/40 hover:text-white">Hide</button>
                </div>
              )}

              <button type="button" onClick={enterWorkspace} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200/70">
                {ready ? "Open workspace" : "Enter workspace now"} <ArrowRight size={17} />
              </button>
              <div className="mt-3 flex items-center justify-between text-[10px] text-blue-100/35">
                <span className="flex items-center gap-1.5"><Layers3 size={12} /> Map style: {selectedMode}</span>
                <button type="button" onClick={skip} className="inline-flex items-center gap-1 transition hover:text-blue-100/80"><RotateCcw size={11} /> Skip intro</button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-blue-100/35 sm:mt-5 sm:text-[10px] sm:tracking-[0.18em]">
            <Building2 size={12} /> Geospatial AI for a better Earth
          </div>
        </div>
      </section>
    </main>
  );
}
