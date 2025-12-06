"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L, { LatLngExpression, LeafletMouseEvent, LeafletEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type MapSelectorProps = {
  coordinates: Coordinates | null;
  onSelect: (coordinates: Coordinates) => void;
  defaultCenter: Coordinates;
};

const resolveAssetUrl = (asset: string | { src: string }): string => {
  if (typeof asset === "string") {
    return asset;
  }

  if (asset && typeof asset.src === "string") {
    return asset.src;
  }

  return "";
};

const pinIcon = L.icon({
  iconRetinaUrl: resolveAssetUrl(markerIcon2x),
  iconUrl: resolveAssetUrl(markerIcon),
  shadowUrl: resolveAssetUrl(markerShadow),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const toLatLng = (coords: Coordinates): LatLngExpression => [
  coords.latitude,
  coords.longitude,
];

const MapClickHandler = ({
  onSelect,
}: {
  onSelect: MapSelectorProps["onSelect"];
}) => {
  useMapEvents({
    click(event: LeafletMouseEvent) {
      onSelect({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
};

const MapViewUpdater = ({
  coordinates,
  defaultCenter,
}: {
  coordinates: Coordinates | null;
  defaultCenter: Coordinates;
}) => {
  const map = useMap();

  useEffect(() => {
    const target = coordinates ?? defaultCenter;
    const zoomLevel = coordinates ? 16 : 13;
    map.flyTo(toLatLng(target), zoomLevel, {
      duration: 0.4,
    });
  }, [coordinates, defaultCenter, map]);

  return null;
};

const MapSelector = ({
  coordinates,
  onSelect,
  defaultCenter,
}: MapSelectorProps) => {
  const initialCenter = coordinates ?? defaultCenter;

  // Generate a unique key per component instance to prevent map re-initialization errors
  // This ensures each MapContainer instance has its own identity and proper cleanup
  const instanceIdRef = useRef(
    `map-selector-${Math.random().toString(36).slice(2, 11)}`
  );
  const mapKey = instanceIdRef.current;

  return (
    <MapContainer
      key={mapKey}
      center={toLatLng(initialCenter)}
      zoom={coordinates ? 16 : 13}
      scrollWheelZoom
      className="h-64 w-full rounded-xl border border-gray-200"
      style={{ minHeight: "16rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onSelect={onSelect} />
      <MapViewUpdater coordinates={coordinates} defaultCenter={defaultCenter} />
      {coordinates ? (
        <Marker
          position={toLatLng(coordinates)}
          draggable
          icon={pinIcon}
          eventHandlers={{
            dragend(event: LeafletEvent) {
              const marker = event.target as L.Marker;
              const next = marker.getLatLng();
              onSelect({ latitude: next.lat, longitude: next.lng });
            },
          }}
        />
      ) : null}
    </MapContainer>
  );
};

export default MapSelector;
