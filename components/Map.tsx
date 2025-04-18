"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { MapContainerProps } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";

interface MapProps extends MapContainerProps {
  children: React.ReactNode;
}

const Map = ({ children, ...props }: MapProps) => {
  return (
    <MapContainer {...props}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {children}
    </MapContainer>
  );
};

export default Map;
export { useMap, Marker, Popup }; 