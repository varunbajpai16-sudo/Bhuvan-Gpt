import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Globe2, Satellite, Sparkles, MapPin } from "lucide-react";

export default function Loading() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  // Initialize the full-screen satellite map
  useEffect(() => {
    const container = document.getElementById("loading-map");

    if (!container || container._leaflet_id) return;

    const map = L.map(container, {
      center: [22.7, 79.0],
      zoom: 5,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
    });

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 18,
        crossOrigin: true,
      },
    ).addTo(map);

    // Add subtle geographic reference markers
    L.circleMarker([28.6139, 77.209], {
      radius: 5,
      color: "#ffffff",
      weight: 2,
      fillColor: "#0284c7",
      fillOpacity: 1,
    }).addTo(map);

    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
    };
  }, []);

  // Animate the progress bar and open the homepage

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return Math.min(prev + 1, 100);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <main className="loading-screen">
      {/* Full-screen satellite map */}
      <div id="loading-map" className="loading-map" />

      {/* Map overlays */}
      <div className="loading-map-tint" />
      <div className="loading-grid" />

      {/* Top branding */}
      <header className="loading-header">
        <div className="loading-brand">
          <div className="loading-logo">
            <Globe2 size={26} strokeWidth={1.8} />
          </div>

          <div>
            <h2>
              Bhuvan <span>GPT</span>
            </h2>
            <p>GEOSPATIAL INTELLIGENCE</p>
          </div>
        </div>

        <div className="loading-status">
          <span className="status-dot" />
          INITIALIZING SYSTEM
        </div>
      </header>

      {/* Center loading content */}
      <section className="loading-content">
        <div className="loading-orbit">
          <div className="orbit-ring orbit-ring-one" />
          <div className="orbit-ring orbit-ring-two" />

          <div className="orbit-icon">
            <Satellite size={34} strokeWidth={1.5} />
          </div>

          <span className="orbit-point orbit-point-one" />
          <span className="orbit-point orbit-point-two" />
        </div>

        <div className="loading-eyebrow">
          <Sparkles size={15} />
          YOUR PLANET. YOUR DATA. YOUR INTELLIGENCE.
        </div>

        <h1>
          Mapping a smarter
          <br />
          <span>future for Earth.</span>
        </h1>

        <p className="loading-description">
          Preparing satellite imagery, geographic layers,
          <br className="desktop-break" />
          and AI-powered geospatial insights.
        </p>

        {/* Progress */}
        <div className="loading-progress">
          <div className="progress-heading">
            <span>Loading Bhuvan GPT</span>
            <span className="progress-number">{progress}%</span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Loading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="progress-footer">
            <span className="loading-spinner" />
            {progress < 35
              ? "Initializing geospatial engine..."
              : progress < 70
                ? "Preparing satellite data..."
                : progress < 100
                  ? "Loading intelligence interface..."
                  : "Ready to explore"}
          </div>
        </div>

        <div className="loading-coordinates">
          <MapPin size={14} />
          <span>INDIA</span>
          <span className="coordinate-divider">/</span>
          <span>22.70° N, 79.00° E</span>
        </div>
      </section>

      {/* Bottom information */}
      <footer className="loading-footer">
        <span>GEOSPATIAL INTELLIGENCE PLATFORM</span>
        <span className="footer-separator" />
        <span>EXPLORING EARTH, ONE INSIGHT AT A TIME</span>
      </footer>
    </main>
  );
}
