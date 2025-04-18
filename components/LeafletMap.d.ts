import { Venue } from "@/types/venue";
import L from "leaflet";
import { ReactNode } from "react";

declare module "@/components/LeafletMap" {
  interface LeafletMapProps {
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

  const LeafletMap: React.FC<LeafletMapProps>;
  export default LeafletMap;
} 