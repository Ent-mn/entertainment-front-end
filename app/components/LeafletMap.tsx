"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Venue } from "@/types/venue";
import { Button } from "@/components/ui/button";
import { Plus, Minus, LocateFixed } from "lucide-react";
import "leaflet/dist/leaflet.css";

export interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  style: React.CSSProperties;
  zoomControl: boolean;
  venues: Venue[];
  selectedVenue: Venue | null;
  onVenueClick: (venue: Venue | null) => void;
  createCustomIcon: (venue: Venue) => L.DivIcon;
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
}

function ZoomControls({
  isFullscreen,
  setIsFullscreen,
}: {
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
}) {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

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
      <div className="bg-[#121212C7]/80 backdrop-blur-4xl rounded-lg shadow-lg p-1">
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

export default function LeafletMap({
  center,
  zoom,
  style,
  zoomControl,
  venues,
  selectedVenue,
  onVenueClick,
  createCustomIcon,
  isFullscreen,
  setIsFullscreen,
}: LeafletMapProps) {
  const markerRefs = useRef<Record<number, L.Marker>>({});

  return (
    <MapContainer center={center} zoom={zoom} style={style} zoomControl={zoomControl}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControls isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen} />
      <MapController selectedVenue={selectedVenue} />
      {venues.map((venue) => (
        <Marker
          key={venue.id}
          position={venue.location}
          icon={createCustomIcon(venue)}
          ref={(ref) => {
            if (ref) {
              markerRefs.current[venue.id] = ref;
            }
          }}
          eventHandlers={{
            click: () => onVenueClick(venue),
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