import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";



import L from "leaflet";



import "leaflet/dist/leaflet.css";



import {



  ArrowUp, Globe2, Satellite, Layers3, Mountain, Waves, Trees,



  Building2, Flame, Sparkles, MapPinned, LocateFixed, Plus, Minus,



  PanelLeftOpen, X, MessageSquare, Compass, Info,



  RotateCcw, History



} from "lucide-react";







const TILE_URLS = {



  satellite:



    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",



  streets: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",



  terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",



};







const PLACES = [



  { name: "Meerut, Uttar Pradesh", aliases: ["meerut"], center: [28.9845, 77.7064], zoom: 11 },



  { name: "Delhi, India", aliases: ["delhi", "new delhi", "ncr"], center: [28.6139, 77.209], zoom: 10 },



  { name: "Mumbai, Maharashtra", aliases: ["mumbai", "bombay"], center: [19.076, 72.8777], zoom: 10 },



  { name: "Uttarakhand, India", aliases: ["uttarakhand", "dehradun"], center: [30.0668, 79.0193], zoom: 7 },



  { name: "India", aliases: ["india", "pan india"], center: [22.7, 79], zoom: 5 },



  { name: "Chennai, Tamil Nadu", aliases: ["chennai"], center: [13.0827, 80.2707], zoom: 10 },



  { name: "Kolkata, West Bengal", aliases: ["kolkata"], center: [22.5726, 88.3639], zoom: 10 },



];







const TOPICS = [



  { id: "satellite", label: "Satellite imagery", icon: Satellite, keywords: ["satellite", "imagery", "image", "earth observation"] },



  { id: "landuse", label: "Land use", icon: Trees, keywords: ["land use", "land cover", "forest", "vegetation", "deforestation"] },



  { id: "water", label: "Water resources", icon: Waves, keywords: ["water", "river", "lake", "water body", "watershed"] },



  { id: "urban", label: "Urban growth", icon: Building2, keywords: ["urban", "city growth", "urban growth", "built-up", "development"] },



  { id: "disaster", label: "Disaster monitoring", icon: Flame, keywords: ["disaster", "flood", "flooding", "fire", "landslide", "cyclone", "hazard", "risk"] },



];







export default function Map({ onSubmitQuery, onHistoricalImagery }) {

  const navigate = useNavigate();



  const mapNode = useRef(null);



  const mapRef = useRef(null);



  const tileRef = useRef(null);



  const markerLayerRef = useRef(null);



  const [query, setQuery] = useState("");



  const [sidebarOpen, setSidebarOpen] = useState(false);



  const [activeLayer, setActiveLayer] = useState("satellite");



  const [activeTopic, setActiveTopic] = useState("");



  const [searchOpen, setSearchOpen] = useState(false);



  const [loading, setLoading] = useState(false);



  const [result, setResult] = useState(null);



  const [history, setHistory] = useState([]);



  const [error, setError] = useState("");



  const [historicalMode, setHistoricalMode] = useState(false);



  const [historicalYear, setHistoricalYear] = useState(String(new Date().getFullYear() - 10));







  useEffect(() => {



    if (!mapNode.current || mapRef.current) return;



    const map = L.map(mapNode.current, {



      center: [22.7, 79],



      zoom: 5,



      zoomControl: false,



      worldCopyJump: true,



      preferCanvas: true,



    });



    mapRef.current = map;



 tileRef.current = L.tileLayer(TILE_URLS.satellite, {
  maxZoom: 22,
  maxNativeZoom: 19,
  attribution: "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
}).addTo(map);



    markerLayerRef.current = L.layerGroup().addTo(map);



    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);



    const resize = () => map.invalidateSize();



    const timeout = window.setTimeout(resize, 180);



    window.addEventListener("resize", resize);



    return () => {



      window.clearTimeout(timeout);



      window.removeEventListener("resize", resize);



      map.remove();



      mapRef.current = null;



      tileRef.current = null;



    };



  }, []);







  useEffect(() => {



    const map = mapRef.current;



    if (!map) return;



    if (tileRef.current) map.removeLayer(tileRef.current);



    tileRef.current = L.tileLayer(TILE_URLS[activeLayer], {



      maxZoom: activeLayer === "satellite" ? 19 : 17,



      attribution:



        activeLayer === "satellite"



          ? "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics"



          : activeLayer === "streets"



          ? "© OpenStreetMap contributors"



          : "Map data © OpenTopoMap (CC-BY-SA)",



    }).addTo(map);



  }, [activeLayer]);







  const matchingPlaces = query.trim()



    ? PLACES.filter((place) =>



        `${place.name} ${place.aliases.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())



      ).slice(0, 4)



    : [];







  const matchingTopics = query.trim()



    ? TOPICS.filter((topic) =>



        `${topic.label} ${topic.keywords.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())



      ).slice(0, 3)



    : TOPICS.slice(0, 3);







  function addDemoDisasterMarkers() {



    const layer = markerLayerRef.current;



    if (!layer) return;



    layer.clearLayers();



    const alerts = [



      { point: [28.61, 77.21], place: "Delhi region", level: "High", event: "Illustrative heat / air-quality watch" },



      { point: [30.73, 76.78], place: "Chandigarh region", level: "Moderate", event: "Illustrative heavy-rainfall watch" },



      { point: [19.08, 72.88], place: "Mumbai region", level: "Moderate", event: "Illustrative coastal-rainfall watch" },



      { point: [26.85, 80.95], place: "Lucknow region", level: "Low", event: "Illustrative flood-risk watch" },



    ];



    alerts.forEach((alert) => {



      const color = alert.level === "High" ? "#dc2626" : alert.level === "Moderate" ? "#f97316" : "#eab308";



      L.circleMarker(alert.point, {



        radius: 9, color: "#fff", weight: 2, fillColor: color, fillOpacity: 0.95,



      })



        .bindPopup(`<strong>${alert.place}</strong><br/>${alert.event}<br/><b>Demo severity:</b> ${alert.level}<br/><small>Illustrative demo only — not a live emergency report.</small>`)



        .addTo(layer);



    });



  }







  function addDemoWaterMarkers() {



    const layer = markerLayerRef.current;



    if (!layer) return;



    layer.clearLayers();







    // Illustrative map points for UI demonstration only; connect authoritative hydrography data for production.



    const waterFeatures = [



      { point: [28.62, 77.24], name: "Yamuna River · Delhi region", kind: "River", note: "River corridor preview" },



      { point: [29.01, 77.72], name: "Upper Ganga Canal · Meerut region", kind: "Canal", note: "Canal corridor preview" },



      { point: [19.05, 72.88], name: "Mumbai coastal water", kind: "Coastal water", note: "Coastal water preview" },



      { point: [30.11, 78.29], name: "Ganga river corridor · Rishikesh region", kind: "River", note: "River corridor preview" },



    ];







    waterFeatures.forEach((feature) => {



      L.circleMarker(feature.point, {



        radius: 8,



        color: "#ffffff",



        weight: 2,



        fillColor: "#0284c7",



        fillOpacity: 0.95,



      })



        .bindPopup(



          `<strong>${feature.name}</strong><br/><b>Feature:</b> ${feature.kind}<br/>${feature.note}<br/><small>Illustrative demo marker — verify with authoritative water-resource data.</small>`



        )



        .addTo(layer);



    });



  }







  async function toggleHistoricalImagery(enabled = !historicalMode) {



    setHistoricalMode(enabled);



    const year = Number(historicalYear);



    const place = result?.place || "current map extent";



    setError("");



    if (onHistoricalImagery) {



      try {



        const response = await onHistoricalImagery({ enabled, year, place, map: mapRef.current });



        if (response?.tileUrl && mapRef.current) {



          if (tileRef.current) mapRef.current.removeLayer(tileRef.current);



          tileRef.current = L.tileLayer(response.tileUrl, {



            maxZoom: response.maxZoom || 19,



            attribution: response.attribution || "Historical imagery provider",



          }).addTo(mapRef.current);



        }



        setResult((current) => ({



          ...(current || {}),



          place,



          topic: enabled ? `Historical imagery · ${year}` : "Current satellite imagery",



          message: response?.message || (enabled



            ? `Historical imagery mode requested for ${place} in ${year}.`



            : "Returned to current satellite imagery."),



          historical: enabled,



          demo: !response?.tileUrl,



        }));



      } catch {



        setError("Historical imagery service could not be reached. Connect onHistoricalImagery to your imagery provider.");



      }



    } else {



      if (enabled) {



        setResult((current) => ({



          ...(current || {}),



          place,



          topic: `Historical imagery · ${year}`,



          message: `Historical imagery for ${year} is selected. To display the actual archived image tiles, connect the onHistoricalImagery prop to a historical imagery provider (for example, an Esri Wayback or Bhuvan archive service).`,



          historical: true,



          demo: true,



        }));



      } else {



        setActiveLayer("satellite");



        setResult((current) => ({



          ...(current || {}),



          place,



          topic: "Current satellite imagery",



          message: "Historical mode is off. The map is back in current satellite imagery mode.",



          historical: false,



          demo: false,



        }));



      }



    }



  }







  async function runQuery(value = query) {



    const text = value.trim();



    if (!text || loading) return;



    setQuery(text);



    setSearchOpen(false);



    setError("");



    setLoading(true);



    setHistory((items) => [text, ...items.filter((item) => item !== text)].slice(0, 5));







    const lower = text.toLowerCase();



    const place = PLACES.find((item) =>



      item.aliases.some((alias) => lower.includes(alias)) ||



      lower.includes(item.name.split(",")[0].toLowerCase())



    ) || PLACES.find((item) => item.name === "India");







    const topic = TOPICS.find((item) => item.keywords.some((keyword) => lower.includes(keyword))) || TOPICS[0];



    const map = mapRef.current;



    if (map && place) map.flyTo(place.center, place.zoom, { duration: 1.1 });







    if (topic.id === "disaster") {



      setHistoricalMode(false);



      setActiveTopic("disaster");



      addDemoDisasterMarkers();



    } else if (topic.id === "water") {



      setHistoricalMode(false);



      setActiveTopic("water");



      addDemoWaterMarkers();



    } else {



      setActiveTopic(topic.id);



      markerLayerRef.current?.clearLayers();



    }







    let answer = {



      message: `Showing the map around ${place.name} for ${topic.label.toLowerCase()}.`,



      place: place.name,



      topic: topic.label,



      layer: activeLayer,



      demo: true,



    };







    try {



      if (onSubmitQuery) {



        const response = await onSubmitQuery(text);



        if (typeof response === "string") answer.message = response;



        else if (response && typeof response === "object") {



          answer = {
            ...answer,
            ...response,
            message: response.message || answer.message,
            description:
              response.description ||
              response.placeDescription ||
              response.place_description ||
              response.placeSummary ||
              response.summary ||
              answer.description,
          };



          if (response.center && mapRef.current) {



            mapRef.current.flyTo(response.center, response.zoom || 10, { duration: 1.1 });



          }



          if (response.layer && TILE_URLS[response.layer]) setActiveLayer(response.layer);



        }



      }



      setResult(answer);



    } catch {



      setError("The AI service could not be reached. Showing a local map preview instead.");



      setResult(answer);



    } finally {



      setLoading(false);



    }



  }







  function chooseTopic(topicId) {



    const topic = TOPICS.find((item) => item.id === topicId);



    if (!topic) return;



    if (topicId === "satellite") setActiveLayer("satellite");



    if (topicId === "disaster") {



      setActiveTopic("disaster");



      addDemoDisasterMarkers();



    } else if (topicId === "water") {



      setActiveTopic("water");



      addDemoWaterMarkers();



    } else {



      setActiveTopic(topicId);



      markerLayerRef.current?.clearLayers();



    }



    setQuery(topic.label);



    setResult({



      message: `Map view prepared for ${topic.label.toLowerCase()}. Submit a location-specific question for a more focused view.`,



      topic: topic.label,



      place: "India",



      demo: true,



    });



  }







  function locateMe() {



    if (!navigator.geolocation) {



      setError("Location is not supported by this browser.");



      return;



    }



    setError("Finding your location…");



    navigator.geolocation.getCurrentPosition(



      ({ coords }) => {



        mapRef.current?.flyTo([coords.latitude, coords.longitude], 12, { duration: 1 });



        L.circleMarker([coords.latitude, coords.longitude], {



          radius: 7, color: "#fff", weight: 2, fillColor: "#2563eb", fillOpacity: 1,



        }).bindPopup("Your current location").addTo(markerLayerRef.current || mapRef.current).openPopup();



        setError("");



      },



      () => setError("Location permission was unavailable. You can still explore the map."),



      { enableHighAccuracy: true, timeout: 8000 }



    );



  }







  function resetMap() {



    mapRef.current?.flyTo([22.7, 79], 5, { duration: 0.8 });



    markerLayerRef.current?.clearLayers();



    setResult(null);



    setActiveTopic("");



    setQuery("");



  }







  return (



    <div className="relative h-screen min-h-[620px] w-full overflow-hidden bg-slate-100 font-sans text-slate-800">



      <div ref={mapNode} className="absolute inset-0 z-0" />







      {/* Light map scrim keeps the top search readable while leaving the map visible. */}



      <div className="pointer-events-none absolute inset-x-0 top-0 z-[400] h-44 bg-gradient-to-b from-white/95 via-white/65 to-transparent" />







      {sidebarOpen && (



        <aside className="absolute bottom-4 left-4 top-4 z-[600] flex w-[270px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur-xl max-md:bottom-3 max-md:left-3 max-md:top-3 max-md:w-[min(280px,calc(100vw-24px))]">



          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">



            <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2.5 text-left" aria-label="Go to Bhuvan GPT homepage">



              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-white"><Globe2 size={22} /></span>



              <span><span className="block text-base font-bold text-slate-900">Bhuvan <span className="text-blue-700">GPT</span></span><span className="block text-[10px] uppercase tracking-[.16em] text-slate-400">Geospatial AI</span></span>



            </button>



            <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Close sidebar"><X size={17} /></button>



          </div>



          <div className="p-3">



            <button onClick={resetMap} className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"><MessageSquare size={16} /> New exploration</button>



          </div>



          <div className="px-4 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">Explore by theme</div>



          <div className="space-y-1 px-2">



            {TOPICS.map(({ id, label, icon: Icon }) => (



              <button key={id} onClick={() => chooseTopic(id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition ${activeTopic === id ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}>



                <span className={`grid h-8 w-8 place-items-center rounded-lg ${activeTopic === id ? "bg-blue-100" : "bg-slate-100"}`}><Icon size={16} /></span>{label}



              </button>



            ))}



          </div>



          <div className="mx-4 my-4 border-t border-slate-100" />



          <div className="px-4 pb-2 text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">Recent explorations</div>



          <div className="space-y-1 px-2">



            {history.map((item) => <button key={item} onClick={() => runQuery(item)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[11px] text-slate-600 hover:bg-slate-50"><Compass size={14} className="shrink-0 text-slate-400" /><span className="truncate">{item}</span></button>)}



          </div>



          <div className="mt-auto p-3">



            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-3">



              <div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-blue-800"><Sparkles size={15} /> Ask in natural language</div>



              <p className="text-[11px] leading-5 text-slate-600">Search places, explore map layers, and investigate environmental patterns.</p>



            </div>



          </div>



        </aside>



      )}







      {/* Top GPT-style search bar */}



      <div className={`absolute left-1/2 top-4 z-[500] w-[min(820px,calc(100%-32px))] -translate-x-1/2 transition-all ${sidebarOpen ? "max-md:top-4" : ""}`}>



        <div className="mb-2 flex items-center justify-between px-1">



          <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">



            {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} className="mr-1 rounded-md p-0.5 hover:bg-slate-100" aria-label="Open sidebar"><PanelLeftOpen size={15} /></button>}



            <Sparkles size={14} className="text-blue-700" /> Bhuvan GPT <span className="font-normal text-slate-400">· Map intelligence</span>



          </div>



          <div className="flex items-center gap-1.5">



            <button onClick={locateMe} className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur hover:text-blue-700"><LocateFixed size={14} /><span className="hidden sm:inline">My location</span></button>



            <button onClick={resetMap} className="rounded-full border border-white/80 bg-white/90 p-2 text-slate-600 shadow-sm backdrop-blur hover:text-blue-700" title="Reset map"><RotateCcw size={15} /></button>



          </div>



        </div>



        <form onSubmit={(event) => { event.preventDefault(); runQuery(); }} className="relative rounded-[22px] border border-slate-200/90 bg-white shadow-[0_12px_45px_rgba(15,23,42,.16)] focus-within:border-blue-300 focus-within:shadow-[0_12px_45px_rgba(37,99,235,.18)]">



          <div className="flex items-start gap-3 px-4 pt-3.5">



            <Globe2 size={21} className="mt-1 shrink-0 text-blue-700" />



            <textarea value={query} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true); }} onFocus={() => setSearchOpen(true)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); runQuery(); } if (event.key === "Escape") setSearchOpen(false); }} rows={2} placeholder="Ask about a place, satellite imagery, land use, water or disasters…" className="max-h-32 min-h-[56px] w-full resize-y bg-transparent py-1 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 sm:text-[15px]" />



            <button type="submit" disabled={!query.trim() || loading} aria-label="Search map" className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-700 text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"><ArrowUp size={19} /></button>



          </div>



          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-3 py-2">



            <div className="flex flex-wrap items-center gap-1">



              {[{ id: "satellite", label: "Satellite", icon: Satellite }, { id: "streets", label: "Roads & places", icon: Layers3 }, { id: "terrain", label: "Terrain", icon: Mountain }].map(({ id, label, icon: Icon }) => (



                <button key={id} type="button" onClick={() => setActiveLayer(id)} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${activeLayer === id ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-100"}`}><Icon size={14} />{label}</button>



              ))}



            </div>



            <div className="flex flex-wrap items-center gap-1.5">



              <button type="button" onClick={() => toggleHistoricalImagery(true)} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${historicalMode ? "bg-amber-100 text-amber-800" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}>



                <History size={14} /> 10 years ago



              </button>



              {historicalMode && (



                <select aria-label="Historical imagery year" value={historicalYear} onChange={(event) => { setHistoricalYear(event.target.value); if (onHistoricalImagery) onHistoricalImagery({ enabled: true, year: Number(event.target.value), place: result?.place || "current map extent", map: mapRef.current }); setResult((current) => ({ ...(current || {}), topic: `Historical imagery · ${event.target.value}`, historical: true, demo: !onHistoricalImagery, message: onHistoricalImagery ? `Requesting archived imagery for ${event.target.value}.` : `Year ${event.target.value} selected. Connect onHistoricalImagery to display archived satellite tiles for this date.` })); }} className="max-w-[112px] rounded-lg border border-amber-200 bg-white px-2 py-1.5 text-[11px] text-slate-700 outline-none focus:border-amber-400">



                  {Array.from({ length: 21 }, (_, index) => new Date().getFullYear() - 10 - index).map((year) => (



                    <option key={year} value={String(year)}>{year}</option>



                  ))}



                </select>



              )}



              {historicalMode && (



                <button type="button" onClick={() => toggleHistoricalImagery(false)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100" title="Return to current imagery" aria-label="Return to current imagery"><RotateCcw size={14} /></button>



              )}



            </div>



            <span className="hidden text-[10px] text-slate-400 sm:inline">Enter to explore · Shift + Enter for a new line</span>



          </div>







          {searchOpen && (matchingPlaces.length > 0 || matchingTopics.length > 0) && query.trim() && (



            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[700] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">



              {matchingPlaces.length > 0 && <div className="p-2"><div className="px-2 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Locations</div>{matchingPlaces.map((place) => <button key={place.name} type="button" onClick={() => { setQuery(`Explore ${place.name}`); setSearchOpen(false); runQuery(`Explore ${place.name}`); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-blue-50"><MapPinned size={16} className="text-blue-700" /><span><span className="block text-sm font-medium text-slate-800">{place.name}</span><span className="block text-[11px] text-slate-400">Zoom to location</span></span></button>)}</div>}



              {matchingTopics.length > 0 && <div className="border-t border-slate-100 p-2"><div className="px-2 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Geospatial topics</div>{matchingTopics.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => { setSearchOpen(false); chooseTopic(id); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-blue-50"><Icon size={16} className="text-blue-700" /><span className="text-sm font-medium text-slate-700">{label}</span></button>)}</div>}



            </div>



          )}



        </form>



        {error && <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 shadow-sm">{error}</div>}



      </div>







      {/* Map controls */}



      <div className={`absolute right-4 top-1/2 z-[450] flex -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-white/80 bg-white/95 shadow-lg backdrop-blur transition-all ${sidebarOpen ? "max-md:right-3" : ""}`}>



        <button onClick={() => mapRef.current?.zoomIn()} className="p-3 text-slate-600 hover:bg-blue-50 hover:text-blue-700" aria-label="Zoom in"><Plus size={18} /></button>



        <div className="mx-2 border-t border-slate-100" />



        <button onClick={() => mapRef.current?.zoomOut()} className="p-3 text-slate-600 hover:bg-blue-50 hover:text-blue-700" aria-label="Zoom out"><Minus size={18} /></button>



      </div>







      {/* Results card is anchored over the map and updates for each query. */}



      {result && (



        <div className={`absolute bottom-5 z-[500] w-[min(390px,calc(100%-24px))] transition-all ${sidebarOpen ? "left-[300px] max-md:left-3" : "left-4"}`}>



          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur">



            <div className="flex items-start justify-between border-b border-slate-100 px-4 py-3">



              <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-700"><Sparkles size={16} /></span><div><div className="text-sm font-bold text-slate-900">Map insights</div><div className="text-[10px] text-slate-400">Bhuvan GPT response</div></div></div>



              <button onClick={() => setResult(null)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" aria-label="Close insights"><X size={16} /></button>



            </div>



            <div className="space-y-3 p-4">



              <div className="flex flex-wrap gap-1.5">{result.place && <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">{result.place}</span>}{result.topic && <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${result.historical ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"}`}>{result.historical && <History size={11} className="mr-1 inline" />}{result.topic}</span>}</div>



              <p className="text-[13px] leading-5 text-slate-600">{result.message}</p>

              <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3">
                <div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-blue-900">
                  <Info size={14} /> About this place
                </div>
                <p className="text-[12px] leading-5 text-slate-700">
                  {result.description ||
                    (result.place
                      ? `${result.place} is the selected area for this geospatial exploration. Use the map layers to explore its satellite imagery, land use, water resources, or other geographic features.`
                      : "Explore the selected location and its geographic features using the map and available layers.")}
                </p>
              </div>



              {result.topic === "Water resources" && (



                <div className="rounded-xl border border-sky-100 bg-sky-50 p-3">



                  <div className="mb-2 flex items-center gap-2 text-xs font-bold text-sky-900"><Waves size={15} /> Water resources layer</div>



                  <div className="flex flex-wrap gap-2 text-[10px] text-sky-800">



                    <span className="rounded-full bg-white px-2 py-1">Rivers & canals</span>



                    <span className="rounded-full bg-white px-2 py-1">Water bodies</span>



                    <span className="rounded-full bg-white px-2 py-1">Watersheds*</span>



                  </div>



                  <p className="mt-2 text-[10px] leading-4 text-sky-800">Select a marker on the map for its preview details. *Watershed boundaries need a connected GIS dataset.</p>



                </div>



              )}



              {result.topic === "Disaster monitoring" && (



                <div className="rounded-xl border border-rose-100 bg-rose-50 p-3">



                  <div className="mb-2 flex items-center gap-2 text-xs font-bold text-rose-900"><Flame size={15} /> Disaster monitoring layer</div>



                  <div className="flex flex-wrap gap-2 text-[10px] text-rose-800">



                    <span className="rounded-full bg-white px-2 py-1">High severity</span>



                    <span className="rounded-full bg-white px-2 py-1">Moderate</span>



                    <span className="rounded-full bg-white px-2 py-1">Low</span>



                  </div>



                  <p className="mt-2 text-[10px] leading-4 text-rose-800">Demo alert markers only. Connect official feeds for live floods, fires, cyclones and other hazards.</p>



                </div>



              )}



              {result.demo && <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-[10px] leading-4 text-amber-800"><Info size={14} className="mt-0.5 shrink-0" />Preview uses illustrative sample data. Connect authoritative geospatial services for real analysis and current alerts.</div>}



              



            </div>



          </div>



        </div>



      )}







      {loading && <div className="absolute bottom-5 right-5 z-[500] flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 py-2.5 text-xs font-medium text-slate-600 shadow-lg"><span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />Processing geospatial query…</div>}







      {!result && !sidebarOpen && <button onClick={() => setSidebarOpen(true)} className="absolute bottom-5 left-4 z-[450] flex items-center gap-2 rounded-xl border border-white/80 bg-white/95 px-3 py-2.5 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur"><PanelLeftOpen size={16} /> Explore themes</button>}







      <div className="absolute bottom-4 right-4 z-[400] hidden rounded-lg bg-white/85 px-2.5 py-1.5 text-[10px] text-slate-500 shadow-sm backdrop-blur sm:block">Map tiles © Esri / OpenStreetMap</div>



    </div>



  );



}
