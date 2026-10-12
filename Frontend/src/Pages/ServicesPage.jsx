import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {

  ArrowRight, ArrowUpRight, Search, Sparkles, Satellite, Trees, Droplets,

  Building2, Flame, CloudSun, MapPinned, Waves, Sprout, Route, Layers3,

  ShieldCheck, Compass, ChevronRight, Menu, X, Globe2, ExternalLink

} from 'lucide-react'



const categories = ['All services', 'Earth observation', 'Environment', 'Planning & development', 'Disaster management']



const services = [

  {

    id: 'satellite', title: 'Satellite Imagery', category: 'Earth observation', icon: Satellite,

    description: 'Explore satellite views of the Earth and inspect geographic features across regions.',

    tags: ['Imagery', 'Map exploration'], tone: 'blue', featured: true,

  },

  {

    id: 'land', title: 'Land Use & Land Cover', category: 'Environment', icon: Trees,

    description: 'Understand land-cover patterns and explore how land is being used over time.',

    tags: ['Land cover', 'Change analysis'], tone: 'green',

  },

  {

    id: 'water', title: 'Water Resources', category: 'Environment', icon: Droplets,

    description: 'Explore rivers, lakes, watersheds and other important water-resource features.',

    tags: ['Hydrology', 'Water bodies'], tone: 'cyan',

  },

  {

    id: 'urban', title: 'Urban Growth Analysis', category: 'Planning & development', icon: Building2,

    description: 'Review built-up areas, settlement patterns and urban expansion for a region.',

    tags: ['Urban planning', 'Growth'], tone: 'violet',

  },

  {

    id: 'disaster', title: 'Disaster Monitoring', category: 'Disaster management', icon: Flame,

    description: 'Explore hazard-related map layers and review sample disaster monitoring indicators.',

    tags: ['Hazards', 'Situational awareness'], tone: 'orange',

  },

  {

    id: 'weather', title: 'Weather & Climate', category: 'Environment', icon: CloudSun,

    description: 'Bring geographic context to weather patterns and climate-related observations.',

    tags: ['Climate', 'Weather'], tone: 'sky',

  },

  {

    id: 'terrain', title: 'Terrain & Elevation', category: 'Earth observation', icon: Layers3,

    description: 'Inspect terrain, elevation and physical landscape characteristics.',

    tags: ['Terrain', 'Elevation'], tone: 'amber',

  },

  {

    id: 'agriculture', title: 'Agriculture Insights', category: 'Planning & development', icon: Sprout,

    description: 'Explore agricultural landscapes and geographic context for rural planning.',

    tags: ['Agriculture', 'Rural planning'], tone: 'green',

  },

  {

    id: 'routes', title: 'Route & Location Explorer', category: 'Planning & development', icon: Route,

    description: 'Explore places, transport corridors and spatial relationships on the map.',

    tags: ['Locations', 'Connectivity'], tone: 'blue',

  },

]



const tones = {

  blue: 'bg-blue-50 text-blue-700 ring-blue-100',

  green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',

  cyan: 'bg-cyan-50 text-cyan-700 ring-cyan-100',

  violet: 'bg-violet-50 text-violet-700 ring-violet-100',

  orange: 'bg-orange-50 text-orange-700 ring-orange-100',

  sky: 'bg-sky-50 text-sky-700 ring-sky-100',

  amber: 'bg-amber-50 text-amber-700 ring-amber-100',

}



export default function ServicesPage({ onNavigate, onOpenService }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('')

  const [activeCategory, setActiveCategory] = useState('All services')

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)



  const filteredServices = useMemo(() => {

    const q = query.trim().toLowerCase()

    return services.filter((service) => {

      const categoryMatch = activeCategory === 'All services' || service.category === activeCategory

      const queryMatch = !q || [service.title, service.category, service.description, ...service.tags].join(' ').toLowerCase().includes(q)

      return categoryMatch && queryMatch

    })

  }, [query, activeCategory])



  const openService = (service) => {

    if (onOpenService) onOpenService(service)

    else if (onNavigate) onNavigate(service.id)

    else window.dispatchEvent(new CustomEvent('bhuvan:open-service', { detail: service }))

  }



  return (

    <div className="h-screen overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-smooth bg-[#f7f9fc] text-slate-900">

      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">

          <button onClick={() => navigate("/")} className="flex items-center gap-3 text-left" aria-label="Bhuvan GPT home">

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-sm"><Globe2 size={23} /></span>

            <span><span className="block text-[19px] font-bold tracking-tight">Bhuvan <span className="text-blue-700">GPT</span></span><span className="block text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-500">Geospatial Intelligence</span></span>

          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">

            <button onClick={() => navigate("/")} className="text-sm font-medium text-slate-600 transition hover:text-blue-700">Home</button>

            <button onClick={() => navigate("/map")} className="text-sm font-medium text-slate-600 transition hover:text-blue-700">Explore Map</button>

            <button className="relative text-sm font-semibold text-blue-700">Services<span className="absolute -bottom-[27px] left-0 right-0 h-0.5 rounded-full bg-blue-700" /></button>

            <button onClick={() => navigate("/about")} className="text-sm font-medium text-slate-600 transition hover:text-blue-700">About</button>

          </nav>

          <div className="hidden items-center gap-3 sm:flex">

            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 lg:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Geospatial AI</span>

            <button onClick={() => navigate("/map")} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">Open Map <ArrowUpRight size={16} /></button>

          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" aria-label="Toggle navigation">{mobileMenuOpen ? <X /> : <Menu />}</button>

        </div>

        {mobileMenuOpen && <div className="border-t border-slate-100 bg-white px-5 py-3 md:hidden"><div className="flex flex-col gap-1"><button onClick={() => navigate("/")} className="rounded-lg px-3 py-2 text-left text-sm">Home</button><button onClick={() => navigate("/map")} className="rounded-lg px-3 py-2 text-left text-sm">Explore Map</button><button className="rounded-lg bg-blue-50 px-3 py-2 text-left text-sm font-semibold text-blue-700">Services</button><button onClick={() => navigate("/about")} className="rounded-lg px-3 py-2 text-left text-sm">About</button></div></div>}

      </header>



      <main>

        <section className="relative isolate overflow-hidden border-b border-blue-100 bg-gradient-to-br from-[#edf5ff] via-white to-[#eefaf8]">

          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 left-[18%] h-80 w-80 rounded-full bg-cyan-200/25 blur-3xl" />

          <div className="relative mx-auto grid max-w-[1440px] items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-[72px]">

            <div className="max-w-3xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-blue-800 shadow-sm"><Sparkles size={15} /> Explore geospatial intelligence</div>

              <h1 className="max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[58px]">Powerful geospatial tools, <span className="text-blue-700">one place.</span></h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Discover satellite imagery, environmental insights and location-based analysis through a simpler, AI-ready experience.</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <button onClick={() => navigate("/map")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/15 transition hover:-translate-y-0.5 hover:bg-blue-800">Start exploring <ArrowRight size={17} /></button>

                <a href="#all-services" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">Browse all services <ChevronRight size={17} /></a>

              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500"><span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-emerald-600" /> Designed for informed decisions</span><span className="inline-flex items-center gap-1.5"><Compass size={15} className="text-blue-600" /> Location-first exploration</span></div>

            </div>

            <div className="relative mx-auto w-full max-w-[520px] lg:justify-self-end">

              <div className="absolute -inset-3 rounded-[30px] bg-gradient-to-br from-blue-200/60 to-cyan-100/60 blur-xl" />

              <div className="relative overflow-hidden rounded-[26px] border border-white bg-white p-3 shadow-2xl shadow-blue-900/10">

                <div className="relative h-[270px] overflow-hidden rounded-[18px] bg-[#dbeafe] sm:h-[320px]">

                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_25%,#c2e4cc_0%,transparent_36%),radial-gradient(ellipse_at_72%_55%,#9bc7a9_0%,transparent_30%),linear-gradient(140deg,#d8e8d5,#a8cbb7_42%,#d5e7d9)]" />

                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M-20 60 C80 95 80 10 170 44 S300 110 370 56 S470 22 550 60" fill="none" stroke="#f8fafc" strokeWidth="17" opacity=".9"/><path d="M-30 230 C70 180 130 280 210 210 S350 170 550 260" fill="none" stroke="#f8fafc" strokeWidth="12" opacity=".9"/><path d="M60 -20 C120 60 90 110 160 170 S220 240 190 350" fill="none" stroke="#e8d7ad" strokeWidth="8"/><path d="M340 -20 C300 70 370 110 320 170 S400 230 450 340" fill="none" stroke="#e8d7ad" strokeWidth="7"/><path d="M0 145 L520 145 M260 0 L260 320" stroke="#ffffff" strokeWidth="1" strokeDasharray="5 7" opacity=".55"/></svg>

                  <div className="absolute left-[48%] top-[42%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"><span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-blue-700 text-white shadow-xl"><MapPinned size={19} /></span><span className="mt-2 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-lg">Explore a region</span></div>

                  <div className="absolute bottom-3 left-3 rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-md backdrop-blur"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"/><span className="text-xs font-semibold text-slate-700">Geospatial workspace</span></div><p className="mt-0.5 text-[10px] text-slate-500">Illustrative map preview</p></div>

                  <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/80 bg-white/90 text-blue-700 shadow-sm"><Satellite size={18} /></div>

                </div>

                <div className="grid grid-cols-3 gap-2 px-1 pb-1 pt-3"><div className="rounded-xl bg-slate-50 px-3 py-2.5"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Discover</p><p className="mt-1 text-sm font-bold text-slate-800">Places</p></div><div className="rounded-xl bg-slate-50 px-3 py-2.5"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Understand</p><p className="mt-1 text-sm font-bold text-slate-800">Patterns</p></div><div className="rounded-xl bg-slate-50 px-3 py-2.5"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Explore</p><p className="mt-1 text-sm font-bold text-slate-800">Change</p></div></div>

              </div>

            </div>

          </div>

        </section>



        <section id="all-services" className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10">

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Service directory</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">What would you like to explore?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Choose a service to get started. Filter by topic or search for a specific geospatial capability.</p></div>

            <div className="relative w-full lg:max-w-[360px]"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services..." className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100" aria-label="Search services" /></div>

          </div>



          <div className="mt-7 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter service categories">{categories.map((category) => <button key={category} role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${activeCategory === category ? 'bg-blue-700 text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700'}`}>{category}</button>)}</div>



          {filteredServices.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filteredServices.map((service) => { const Icon = service.icon; return <article key={service.id} className={`group flex min-h-[250px] flex-col rounded-2xl border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/[0.06] sm:p-6 ${service.featured ? 'border-blue-200 ring-1 ring-blue-100' : 'border-slate-200'}`}>

            <div className="flex items-start justify-between gap-3"><span className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${tones[service.tone]}`}><Icon size={23} strokeWidth={1.8}/></span>{service.featured && <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">Popular</span>}</div>

            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">{service.category}</p><h3 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900">{service.title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{service.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">{service.tags.map((tag) => <span key={tag} className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">{tag}</span>)}</div>

            <button onClick={() => openService(service)} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-blue-700 transition group-hover:gap-3">Explore service <ArrowRight size={16}/></button>

          </article> })}</div> : <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"><Search className="mx-auto text-slate-300" size={30}/><h3 className="mt-3 font-semibold text-slate-800">No matching services</h3><p className="mt-1 text-sm text-slate-500">Try another keyword or choose a different category.</p><button onClick={() => { setQuery(''); setActiveCategory('All services') }} className="mt-4 text-sm font-semibold text-blue-700">Clear filters</button></div>}

        </section>



        <section className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-10 lg:pb-16"><div className="relative overflow-hidden rounded-3xl bg-[#102b55] px-6 py-8 text-white sm:px-9 sm:py-10 lg:flex lg:items-center lg:justify-between lg:px-12"><div className="absolute -right-12 -top-28 h-64 w-64 rounded-full border-[36px] border-white/[0.05]"/><div className="relative max-w-2xl"><div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200"><Sparkles size={15}/> Have a question?</div><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Explore maps with natural language.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-blue-100/80 sm:text-base">Ask Bhuvan GPT about a place, a geographic pattern or a region you want to understand.</p></div><button onClick={() => navigate("/map")} className="relative mt-6 inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-900 transition hover:bg-blue-50 lg:mt-0">Open Bhuvan GPT <ArrowUpRight size={17}/></button></div></section>

      </main>



      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10"><div className="flex items-center gap-2"><Globe2 size={16} className="text-blue-700"/><span className="font-semibold text-slate-700">Bhuvan GPT</span><span>· Geospatial Intelligence</span></div><p>Explore responsibly. Data availability depends on connected services and sources.</p><a href="#all-services" className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900">Back to services <ExternalLink size={12}/></a></div></footer>

    </div>

  )

}
