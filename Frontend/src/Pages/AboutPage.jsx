import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Globe2, Menu, X, ArrowUpRight, ArrowRight, Satellite,
  MapPinned, Sparkles, Layers3, ShieldCheck, Compass,
  Earth, Target, UsersRound, Leaf, Building2, Waves,
} from 'lucide-react'

const focusAreas = [
  {
    icon: Satellite,
    number: '01',
    title: 'Earth observation',
    description: 'Explore satellite imagery and geographic features to better understand places and landscapes.',
    tone: 'bg-blue-50 text-blue-700',
  },
  {
    icon: Layers3,
    number: '02',
    title: 'Spatial understanding',
    description: 'Bring map layers and location context together to explore patterns across a region.',
    tone: 'bg-violet-50 text-violet-700',
  },
  {
    icon: Leaf,
    number: '03',
    title: 'Environment & resources',
    description: 'Explore geographic context related to land, water, vegetation and the environment.',
    tone: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: Building2,
    number: '04',
    title: 'Planning & awareness',
    description: 'Use location-first exploration to support learning, analysis and informed discussions.',
    tone: 'bg-amber-50 text-amber-700',
  },
]

export default function AboutPage() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const go = (path) => {
    setMobileMenuOpen(false)
    navigate(path)
  }

  return (
    <div className="h-dvh min-h-0 w-full overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-smooth bg-[#f7f9fc] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <button onClick={() => go('/')} className="flex items-center gap-3 text-left" aria-label="Bhuvan GPT home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-sm"><Globe2 size={23} /></span>
            <span>
              <span className="block text-[19px] font-bold tracking-tight">Bhuvan <span className="text-blue-700">GPT</span></span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-500">Geospatial Intelligence</span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <button onClick={() => go('/')} className="text-sm font-medium text-slate-600 transition hover:text-blue-700">Home</button>
            <button onClick={() => go('/map')} className="text-sm font-medium text-slate-600 transition hover:text-blue-700">Explore Map</button>
            <button onClick={() => go('/service')} className="text-sm font-medium text-slate-600 transition hover:text-blue-700">Services</button>
            <button aria-current="page" className="relative text-sm font-semibold text-blue-700">About<span className="absolute -bottom-[27px] left-0 right-0 h-0.5 rounded-full bg-blue-700" /></button>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 lg:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Geospatial AI</span>
            <button onClick={() => go('/map')} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">Open Map <ArrowUpRight size={16} /></button>
          </div>

          <button onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden" aria-label="Toggle navigation" aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              <button onClick={() => go('/')} className="rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50">Home</button>
              <button onClick={() => go('/map')} className="rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50">Explore Map</button>
              <button onClick={() => go('/service')} className="rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50">Services</button>
              <button aria-current="page" className="rounded-lg bg-blue-50 px-3 py-2 text-left text-sm font-semibold text-blue-700">About</button>
              <button onClick={() => go('/map')} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white">Open Map <ArrowUpRight size={16} /></button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative isolate overflow-hidden border-b border-blue-100 bg-gradient-to-br from-[#edf5ff] via-white to-[#eefaf8]">
          <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-blue-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-[15%] h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-blue-800 shadow-sm"><Sparkles size={15} /> About Bhuvan GPT</div>
              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[60px]">Making geospatial exploration <span className="text-blue-700">more intuitive.</span></h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Bhuvan GPT is designed as a simpler way to explore maps, geographic information and Earth-related insights. It brings a conversational interface together with a map-first experience.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => go('/map')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/15 transition hover:-translate-y-0.5 hover:bg-blue-800">Explore the map <ArrowRight size={17} /></button>
                <button onClick={() => go('/service')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">View services <ArrowUpRight size={16} /></button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500"><span className="inline-flex items-center gap-1.5"><Compass size={15} className="text-blue-600" /> Location-first exploration</span><span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-emerald-600" /> Clear geographic context</span></div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] lg:justify-self-end">
              <div className="absolute -inset-3 rounded-[30px] bg-gradient-to-br from-blue-200/60 to-cyan-100/60 blur-xl" />
              <div className="relative overflow-hidden rounded-[26px] border border-white bg-white p-3 shadow-2xl shadow-blue-900/10">
                <div className="relative min-h-[300px] overflow-hidden rounded-[18px] bg-[#dbeafe] sm:min-h-[360px]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,#c5e3c7_0%,transparent_35%),radial-gradient(ellipse_at_75%_65%,#9bc9ac_0%,transparent_34%),linear-gradient(135deg,#dcebd9,#a9cdb8_48%,#d6e7dd)]" />
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <path d="M-20 68 C80 102 88 16 170 48 S300 116 370 62 S480 28 590 70" fill="none" stroke="#f8fafc" strokeWidth="18" opacity=".9" />
                    <path d="M-30 250 C70 188 130 290 220 218 S360 180 590 278" fill="none" stroke="#f8fafc" strokeWidth="13" opacity=".9" />
                    <path d="M72 -20 C130 70 100 118 174 178 S236 250 202 380" fill="none" stroke="#e8d7ad" strokeWidth="8" />
                    <path d="M370 -20 C322 70 388 122 336 184 S418 254 470 380" fill="none" stroke="#e8d7ad" strokeWidth="7" />
                    <path d="M0 145 L560 145 M280 0 L280 360" stroke="#fff" strokeWidth="1" strokeDasharray="5 7" opacity=".55" />
                    <path d="M80 0 L115 360 M450 0 L415 360" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 8" opacity=".45" />
                  </svg>
                  <div className="absolute left-[48%] top-[44%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"><span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-blue-700 text-white shadow-xl"><MapPinned size={24} /></span><span className="mt-2 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-lg">Geospatial workspace</span></div>
                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-md backdrop-blur"><Globe2 size={16} className="text-blue-700" /><span className="text-xs font-semibold text-slate-700">Explore our world</span></div>
                  <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-white/70 bg-white/90 p-3 shadow-sm backdrop-blur"><Satellite size={17} className="text-blue-700" /><p className="mt-2 text-[11px] font-bold text-slate-800">Imagery</p></div>
                    <div className="rounded-xl border border-white/70 bg-white/90 p-3 shadow-sm backdrop-blur"><Layers3 size={17} className="text-blue-700" /><p className="mt-2 text-[11px] font-bold text-slate-800">Map layers</p></div>
                    <div className="rounded-xl border border-white/70 bg-white/90 p-3 shadow-sm backdrop-blur"><Sparkles size={17} className="text-blue-700" /><p className="mt-2 text-[11px] font-bold text-slate-800">AI-assisted</p></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-2 pb-1 pt-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-5 text-slate-500">A map-first interface for exploring geographic context.</p><span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Explore at your pace</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Our purpose</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">Understand places through a clearer lens.</h2>
            </div>
            <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
              <p>Geographic information can help us ask better questions about the places around us. Bhuvan GPT aims to make that exploration approachable by combining an interactive map experience with a conversational starting point.</p>
              <p>Whether you are exploring satellite imagery, learning about land patterns or looking for geographic context for a region, the goal is to make it easier to get started and discover the information available to you.</p>
              <p className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 text-sm leading-6 text-slate-700"><strong className="text-slate-900">A note on data:</strong> Available map layers, datasets and analysis depend on the services and sources connected to the application. Information should be checked against authoritative sources before being used for important decisions.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
            <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">What we focus on</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">A practical starting point for geospatial discovery.</h2><p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">Explore common ways to use geographic information through the Bhuvan GPT experience.</p></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {focusAreas.map(({ icon: Icon, number, title, description, tone }) => (
                <article key={number} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/[0.05] sm:p-6">
                  <div className="flex items-start justify-between"><span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}><Icon size={23} strokeWidth={1.8} /></span><span className="text-xs font-bold tracking-widest text-slate-300">{number}</span></div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-[#102b55] px-6 py-9 text-white sm:px-9 sm:py-11 lg:flex lg:items-center lg:justify-between lg:px-12">
            <div className="absolute -right-12 -top-28 h-64 w-64 rounded-full border-[36px] border-white/[0.05]" />
            <div className="absolute -bottom-28 right-[28%] h-52 w-52 rounded-full border-[28px] border-white/[0.04]" />
            <div className="relative max-w-2xl"><div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200"><Sparkles size={15} /> Start exploring</div><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Curious about a place? Begin with the map.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-blue-100/80 sm:text-base">Open the map to explore geographic context and discover the tools available in Bhuvan GPT.</p></div>
            <button onClick={() => go('/map')} className="relative mt-6 inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-900 transition hover:bg-blue-50 lg:mt-0">Open Bhuvan GPT <ArrowUpRight size={17} /></button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <button onClick={() => go('/')} className="flex items-center gap-2 text-left"><Globe2 size={16} className="text-blue-700" /><span className="font-semibold text-slate-700">Bhuvan GPT</span><span>· Geospatial Intelligence</span></button>
          <p>Explore responsibly. Data availability depends on connected services and sources.</p>
          <button onClick={() => go('/service')} className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900">Explore services <ArrowRight size={13} /></button>
        </div>
      </footer>
    </div>
  )
}
