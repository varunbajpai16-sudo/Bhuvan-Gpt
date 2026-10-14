import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import LoadingPage from "./LoadingPage";

import {

  Search,

  ChevronDown,

  Satellite,

  UsersRound,

  TentTree,

  Droplet,

  ChartNoAxesColumnIncreasing,

  Layers,

  Download,

  LocateFixed,

  Globe2,

  Plus,

  Menu,

  Sparkles,

} from "lucide-react";

const features = [

  { icon: Satellite, title: <>Satellite<br />Imagery</> },

  { icon: UsersRound, title: <>Land Use<br />Analysis</> },

  { icon: TentTree, title: <>Disaster<br />Monitoring</> },

  { icon: Droplet, title: <>Water<br />Resources</> },

  { icon: ChartNoAxesColumnIncreasing, title: <>Urban<br />Planning</> },

];

const featureQueries = [

  "Show satellite imagery",

  "Analyse land use",

  "Monitor disasters",

  "Explore water resources",

  "Explore urban planning",

];

function MapView() {

  useEffect(() => {

    const container = document.getElementById("map");

    if (!container || container._leaflet_id) return;

    const map = L.map(container, {

      center: [22.7, 79.0],

      zoom: 4.5,

      zoomControl: false,

      attributionControl: false,

      scrollWheelZoom: false,

      dragging: true,

    });

    L.tileLayer(

      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

      { maxZoom: 18 }

    ).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    return () => {

      map.remove();

    };

  }, []);

  return (

    <div

      id="map"

      className="map-canvas"

      aria-label="Satellite map of India"

    />

  );

}

export default function Home() {

  const navigate = useNavigate();

  const location = useLocation();

  const [query, setQuery] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  // Show the loading page only once per browser tab session.
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return false;

    const hasShownLoading = sessionStorage.getItem("bhuvanLoadingShown_v2");

    if (hasShownLoading) return false;

    sessionStorage.setItem("bhuvanLoadingShown_v2", "true");
    return true;
  });

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const navItems = [

    { name: "Home", path: "/" },

    { name: "Explore Map", path: "/map" },

    { name: "Services", path: "/service" },

    { name: "About", path: "/about" },

  ];

  const active =

    navItems.find((item) => item.path === location.pathname)?.name || "Home";

  const handleNavigation = (path) => {

    setMenuOpen(false);

    navigate(path);

  };

  const handleSearch = (e) => {

    e.preventDefault();

    if (query.trim()) {

      setSubmitted(true);

    }

  };

  const handleFeatureClick = (index) => {

    setQuery(featureQueries[index]);

    setSubmitted(false);

    if (index === 0) {

      navigate("/map");

    } else if (index === 3) {

      navigate("/service");

    } else {

      navigate("/map");

    }

  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (

    <main className="app-viewport h-dvh min-h-[600px] w-full overflow-hidden bg-[#eaf1f8]">

      <section className="site-shell relative flex h-full w-full flex-col overflow-hidden rounded-none border-0 bg-white shadow-none">

        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">

          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">

            <button

              type="button"

              onClick={() => handleNavigation("/")}

              className="flex items-center gap-3 text-left"

              aria-label="Bhuvan GPT home"

            >

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-sm">

                <Globe2 size={23} />

              </span>

              <span>

                <span className="block text-[19px] font-bold tracking-tight text-slate-900">

                  Bhuvan <span className="text-blue-700">GPT</span>

                </span>

                <span className="block text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-500">

                  Geospatial Intelligence

                </span>

              </span>

            </button>

            <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">

              {navItems.map(({ name, path }) => (

                <button

                  key={name}

                  type="button"

                  onClick={() => handleNavigation(path)}

                  className={`relative py-2 text-sm transition ${

                    active === name

                      ? "font-semibold text-blue-700 after:absolute after:-bottom-[27px] after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-blue-700"

                      : "font-medium text-slate-600 hover:text-blue-700"

                  }`}

                >

                  {name}

                </button>

              ))}

            </nav>

            <div className="hidden items-center gap-3 sm:flex">

              <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 lg:flex">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                Geospatial AI

              </span>

              <button

                type="button"

                onClick={() => handleNavigation("/map")}

                className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"

              >

                Open Map <Plus size={16} />

              </button>

            </div>

            <button

              type="button"

              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"

              aria-label="Toggle navigation"

              aria-expanded={menuOpen}

              onClick={() => setMenuOpen((value) => !value)}

            >

              <Menu size={22} />

            </button>

          </div>

          {menuOpen && (

            <div className="border-t border-slate-100 bg-white px-5 py-3 md:hidden">

              <div className="flex flex-col gap-1">

                {navItems.map(({ name, path }) => (

                  <button

                    key={name}

                    type="button"

                    onClick={() => handleNavigation(path)}

                    className={`rounded-lg px-3 py-2 text-left text-sm ${

                      active === name

                        ? "bg-blue-50 font-semibold text-blue-700"

                        : "text-slate-600 hover:bg-slate-50"

                    }`}

                  >

                    {name}

                  </button>

                ))}

                <button

                  type="button"

                  onClick={() => handleNavigation("/map")}

                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white"

                >

                  Open Map <Plus size={16} />

                </button>

              </div>

            </div>

          )}

        </header>

        <div className="hero relative min-h-0 flex-1 overflow-hidden" id="home">

          <div className="map-backdrop" />

          <div className="map-wash" />

          <div className="map-frame" id="map-section">

            <MapView />

            <div className="map-edge-fade" />

            <div className="map-tools" aria-label="Map controls">

              <button

                title="Layers"

                onClick={() => handleNavigation("/map")}

              >

                <Layers size={17} />

              </button>

              <button

                title="Download map"

                onClick={() => setSubmitted(false)}

              >

                <Download size={16} />

              </button>

              <button

                title="Locate"

                onClick={() => handleNavigation("/map")}

              >

                <LocateFixed size={17} />

              </button>

              <button

                title="Globe view"

                onClick={() => handleNavigation("/map")}

              >

                <Globe2 size={16} />

              </button>

              <button

                title="More map options"

                onClick={() => handleNavigation("/map")}

              >

                <Plus size={17} />

              </button>

            </div>

            <div className="map-attribution">

              <span>India</span>

              <span>20.5507° N, 79.9679° E</span>

              <span>— 270 km —</span>

            </div>

          </div>

          <div className="hero-copy relative z-20 px-6 pt-12 sm:px-10 sm:pt-[62px] lg:px-[60px]">

            <div className="eyebrow">

              <span className="eyebrow-dot" />

              GEOSPATIAL AI ASSISTANT

            </div>

            <h1>

              Smarter Insights

              <br />

              for a <span>Better Earth</span>

            </h1>

            <p className="hero-description">

              Bhuvan GPT helps you explore, analyse and

              <br className="hidden sm:block" /> understand geospatial data

              using natural language.

            </p>

            <form className="search-box" onSubmit={handleSearch}>

              <Search size={17} className="search-icon" />

              <input

                value={query}

                onChange={(e) => {

                  setQuery(e.target.value);

                  setSubmitted(false);

                }}

                placeholder="Ask about any place, data or geospatial analysis..."

                aria-label="Ask Bhuvan GPT"

              />

              <button aria-label="Search" type="submit">

                <Search size={17} />

              </button>

            </form>

            {submitted && (

              <div className="search-feedback">

                <Sparkles size={14} />

                Ready to explore: “{query}”

              </div>

            )}

            <div className="feature-row" id="use-cases">

              {features.map(({ icon: Icon, title }, index) => (

                <button

                  type="button"

                  className="feature"

                  key={index}

                  onClick={() => handleFeatureClick(index)}

                >

                  <span className="feature-icon">

                    <Icon size={23} strokeWidth={2.1} />

                  </span>

                  <span className="feature-title">{title}</span>

                </button>

              ))}

            </div>

          </div>

        </div>

        <footer className="stats-bar relative z-20 grid grid-cols-2 gap-y-4 border-t border-[#e4edf7] bg-white px-5 py-5 sm:grid-cols-4 sm:px-9 sm:py-6">

          <div className="stat">

            <div className="stat-top">

              <span className="stat-symbol">⌁</span>

              <strong>10+</strong>

            </div>

            <span className="stat-label">Satellite Datasets</span>

          </div>

          <div className="stat">

            <div className="stat-top">

              <span className="stat-symbol">⌁</span>

              <strong>50+</strong>

            </div>

            <span className="stat-label">Geospatial Tools</span>

          </div>

          <div className="stat">

            <div className="stat-top">

              <span className="stat-symbol">✳</span>

              <strong>AI</strong>

            </div>

            <span className="stat-label">Powered Queries</span>

          </div>

          <div className="stat">

            <div className="stat-top">

              <strong>Pan India</strong>

            </div>

            <span className="stat-label">Coverage</span>

          </div>

        </footer>

      </section>

    </main>

  );

}
