import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, LocateFixed, MapPin } from "lucide-react";

// Fix Leaflet default icon asset paths for Vite bundler
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Unity University, Gerji Campus, Addis Ababa coordinates
const UNITY_UNIVERSITY_COORDS = [9.0002, 38.8089];

const LocationMap = ({ className = "" }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent re-initialization if already created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: UNITY_UNIVERSITY_COORDS,
        zoom: 16,
        scrollWheelZoom: false,
        zoomControl: false, // Custom positioned zoom control
      });

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add custom zoom control in bottom-right so it doesn't collide with overlays
      L.control
        .zoom({
          position: "bottomright",
        })
        .addTo(map);

      // Custom pulse marker for TK Furniture at Unity University
      const customIcon = L.divIcon({
        className: "custom-tk-marker",
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; margin-left: -20px; margin-top: -40px;">
            <span style="position: absolute; width: 34px; height: 34px; border-radius: 9999px; background-color: rgba(138, 83, 51, 0.45); animation: tk-marker-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background-color: #8A5333; color: white; border-radius: 9999px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2.5px solid white;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div style="position: absolute; bottom: -4px; width: 8px; height: 8px; background-color: #8A5333; transform: rotate(45deg);"></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -42],
      });

      // Create marker & popup
      const marker = L.marker(UNITY_UNIVERSITY_COORDS, { icon: customIcon }).addTo(map);

      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; padding: 2px 4px; min-width: 210px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #8A5333; background: #FAF3EE; padding: 2px 6px; border-radius: 4px;">
              Showroom & Studio
            </span>
          </div>
          <h4 style="font-size: 15px; font-weight: 700; color: #1C1917; margin: 0 0 4px 0;">
            TK Furniture
          </h4>
          <p style="font-size: 12px; color: #57534E; margin: 0 0 8px 0; line-height: 1.4;">
            <strong>Unity University Campus Area</strong><br/>
            Gerji, Addis Ababa, Ethiopia
          </p>
          <div style="font-size: 11px; color: #78716C; margin-bottom: 10px; font-family: monospace;">
            📍 9.0002° N, 38.8089° E
          </div>
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=9.0002,38.8089" 
            target="_blank" 
            rel="noopener noreferrer" 
            style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; width: 100%; box-sizing: border-box; background-color: #8A5333; color: #ffffff; padding: 8px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none;"
          >
            <span>Get Directions &rarr;</span>
          </a>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: true,
        className: "tk-leaflet-popup",
      });

      // Automatically open the popup
      marker.openPopup();

      mapInstanceRef.current = map;
      setIsMapReady(true);

      // Invalidate size to ensure full tile coverage
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(UNITY_UNIVERSITY_COORDS, 16, {
        duration: 1.2,
      });
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[340px] rounded-3xl overflow-hidden border border-[#E7E2D9] shadow-sm bg-[#F5F1EB] ${className}`}>
      {/* Leaflet Map DOM Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full absolute inset-0 z-0"
        style={{ minHeight: "340px" }}
      />

      {/* Floating Top Bar: Location Badge & Action Buttons */}
      <div className="absolute top-3 left-3 right-3 z-10 pointer-events-none flex flex-wrap items-center justify-between gap-2">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E7E2D9] shadow-xs flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs">
            <span className="font-bold text-[#1C1917] block leading-none">
              Unity University Campus
            </span>
            <span className="text-[10px] text-[#78716C] font-mono">
              9.0002° N, 38.8089° E · Gerji
            </span>
          </div>
        </div>

        {/* Recenter & External Directions Buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleRecenter}
            title="Recenter on Unity University"
            className="px-2.5 py-1.5 bg-white/95 hover:bg-white text-[#1C1917] rounded-xl border border-[#E7E2D9] shadow-xs hover:text-[#8A5333] transition-all flex items-center gap-1 text-xs font-semibold"
          >
            <LocateFixed className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Recenter</span>
          </button>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=9.0002,38.8089"
            target="_blank"
            rel="noopener noreferrer"
            title="Open directions in Google Maps"
            className="px-3 py-1.5 bg-[#8A5333] hover:bg-[#6E3F24] text-white rounded-xl shadow-xs transition-all flex items-center gap-1 text-xs font-semibold"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Directions</span>
          </a>
        </div>
      </div>

      {/* Subtle overlay hint at bottom left */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-none hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded-lg border border-[#E7E2D9] text-[10px] text-[#57534E] shadow-2xs">
        <MapPin className="w-3 h-3 text-[#8A5333]" />
        <span>Scroll to zoom · Drag to pan</span>
      </div>
    </div>
  );
};

export default LocationMap;
