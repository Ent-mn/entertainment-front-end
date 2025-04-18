// components/LeafletMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LocateFixed, Plus, Minus } from "lucide-react";

type VenueType =
  | "A Area"
  | "B Area"
  | "C Area"
  | "Ресторан"
  | "Event Hall"
  | "Гэр Талбай";

interface Venue {
  id: number;
  name: string;
  type: VenueType;
  location: [number, number];
  stars: number;
  image: string;
  capacity: number;
  price: number;
  date: string;
  sale?: number;
}

interface VenueTypeConfig {
  color: string;
  icon?: string;
  label?: string;
}

interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  style: React.CSSProperties;
  venues: Venue[];
  selectedVenue: Venue | null;
  onVenueClick: (venue: Venue) => void;
  venueTypeConfig: Record<VenueType, VenueTypeConfig>;
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
}

function ZoomControls({ isFullscreen }: { isFullscreen: boolean }) {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  const handleLocate = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 15);
          setUserLocation([latitude, longitude]);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLocating(false);
    }
  };

  return (
    <div className="absolute bottom-20 right-4 z-[1000] flex flex-col gap-2">
      <Button
        variant="outline"
        className="bg-[#121212C7]/80 backdrop-blur-4xl"
        onClick={handleLocate}
        disabled={isLocating}
      >
        <LocateFixed
          className={`h-4 w-4 ${
            isLocating ? "text-yellow-400 animate-pulse" : "text-white"
          }`}
        />
      </Button>
      {userLocation && (
        <Marker
          position={userLocation}
          icon={L.divIcon({
            className: "user-location-marker",
            html: `<div class="bg-black rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>`,
            iconSize: [48, 48],
          })}
        />
      )}
      <div className="bg-[#121212C7]/80 backdrop-blur-4xl rounded-lg shadow-lg p- mat-1">
        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg"
          onClick={() => map.zoomIn()}
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg"
          onClick={() => map.zoomOut()}
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function MapController({ selectedVenue }: { selectedVenue: Venue | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedVenue && selectedVenue.location) {
      map.setView(selectedVenue.location, 15);
    }
  }, [selectedVenue, map]);

  return null;
}

const createCustomIcon = (
  type: VenueType,
  venueTypeConfig: Record<VenueType, VenueTypeConfig>
) => {
  const config = venueTypeConfig[type];
  if (!config) {
    return new L.DivIcon({
      html: `<div style="background-color: #ef4444; width: 32px; height: 32px; border-radius: 50%;"></div>`,
      className: "custom-div-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }

  const iconHtml = `
    <div style="
      background-color: ${config.color}; 
      width: 32px; 
      height: 32px; 
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      border: 2px solid white;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    </div>
  `;

  return new L.DivIcon({
    html: iconHtml,
    className: "custom-div-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export default function LeafletMap({
  center,
  zoom,
  style,
  venues,
  selectedVenue,
  onVenueClick,
  venueTypeConfig,
  isFullscreen,
  setIsFullscreen,
}: LeafletMapProps) {
  const markerRefs = useRef<Record<number, any>>({});

  return (
    <MapContainer center={center} zoom={zoom} style={style} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControls isFullscreen={isFullscreen} />
      <MapController selectedVenue={selectedVenue} />
      {venues.map((venue) => (
        <Marker
          key={venue.id}
          position={venue.location}
          icon={createCustomIcon(venue.type, venueTypeConfig)} // Pass venueTypeConfig
          ref={(ref) => {
            if (ref) {
              markerRefs.current[venue.id] = ref;
            }
          }}
          eventHandlers={{
            click: () => {
              onVenueClick(venue);
              if (markerRefs.current[venue.id]) {
                markerRefs.current[venue.id].openPopup();
              }
            },
          }}
        >
          <Popup className="w-[250px]" closeButton={false}>
            <div className="relative p-0">
              {venue.image && (
                <div className="w-full h-[200px] relative">
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-lg font-semibold text-white">
                        {venue.name}
                      </h3>
                      <div className="text-gray-200 text-sm">{venue.type}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-amber-500">★</span>
                        <span className="text-white">
                          {venue.stars.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
