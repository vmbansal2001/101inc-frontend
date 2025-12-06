"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Copy, Loader2, LocateFixed, MapPin, RefreshCcw } from "lucide-react";

export type LocationDetails = {
  latitude: number;
  longitude: number;
  link: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

type LocationPickerProps = {
  setSelectedLocation: (link: string) => void;
  label?: string;
  description?: string;
  initialLocation?: LocationDetails;
  onLocationDetailsChange?: (location: LocationDetails | null) => void;
};

type MapSelectorProps = {
  coordinates: Coordinates | null;
  onSelect: (coordinates: Coordinates) => void;
  defaultCenter: Coordinates;
};

const DEFAULT_CENTER: Coordinates = {
  latitude: 27.7172,
  longitude: 85.324,
};

const MapSelector = dynamic<MapSelectorProps>(
  () => import("@/src/components/location-picker/map-selector"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500">
        Loading map…
      </div>
    ),
  }
);

const buildShareableLink = (latitude: number, longitude: number) =>
  `https://www.google.com/maps?q=${latitude},${longitude}`;

const isValidLatitude = (value: number) => value >= -90 && value <= 90;
const isValidLongitude = (value: number) => value >= -180 && value <= 180;

const LocationPicker = ({
  label,
  description,
  initialLocation,
  setSelectedLocation,
  onLocationDetailsChange,
}: LocationPickerProps) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(
    initialLocation
      ? {
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
        }
      : null
  );
  const [shareableLink, setShareableLink] = useState(
    initialLocation?.link ?? ""
  );
  const [statusMessage, setStatusMessage] = useState(
    initialLocation?.link ? "Location updated." : ""
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const emitLocationDetails = useCallback(
    (latitude: number, longitude: number, link: string) => {
      onLocationDetailsChange?.({
        latitude,
        longitude,
        link,
      });
    },
    [onLocationDetailsChange]
  );

  const clearSelection = useCallback(() => {
    setCoordinates(null);
    setShareableLink("");
    setStatusMessage("");
    setCopiedLink(false);
    setSelectedLocation("");
    onLocationDetailsChange?.(null);
  }, [onLocationDetailsChange, setSelectedLocation]);

  const applyCoordinates = useCallback(
    (latitude: number, longitude: number) => {
      if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
        setErrorMessage(
          "Unable to use that position. Please pick another spot on the map."
        );
        setStatusMessage("");
        clearSelection();
        return;
      }

      const link = buildShareableLink(latitude, longitude);
      setCoordinates({ latitude, longitude });
      setShareableLink(link);
      setStatusMessage("Location updated.");
      setErrorMessage("");
      setCopiedLink(false);
      setSelectedLocation(link);
      emitLocationDetails(latitude, longitude, link);
    },
    [clearSelection, emitLocationDetails, setSelectedLocation]
  );

  const handleUseCurrentLocation = () => {
    setStatusMessage("");
    setErrorMessage("");

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setErrorMessage("Location is not supported on this device.");
      return;
    }

    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        applyCoordinates(position.coords.latitude, position.coords.longitude);
        setIsFetchingLocation(false);
      },
      (geoError) => {
        const errorMessages: Record<number, string> = {
          1: "Permission denied. Please allow location access or drop the pin manually.",
          2: "Unable to fetch your location. Try again or drop the pin manually.",
          3: "Unable to fetch your location. Try again or drop the pin manually.",
        };

        setErrorMessage(
          errorMessages[geoError.code] ??
            "Unable to fetch your location. Try again or drop the pin manually."
        );
        setStatusMessage("");
        setIsFetchingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const handleMapSelection = (nextCoordinates: Coordinates) => {
    applyCoordinates(nextCoordinates.latitude, nextCoordinates.longitude);
  };

  const handleCopyLink = async () => {
    if (
      !shareableLink ||
      typeof navigator === "undefined" ||
      !navigator.clipboard
    ) {
      setErrorMessage("Couldn't copy the link. Please copy it manually.");
      return;
    }

    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      setErrorMessage("Couldn't copy the link. Please copy it manually.");
    }
  };

  const handleClearLocation = () => {
    clearSelection();
    setErrorMessage("");
  };

  return (
    <section className="space-y-4" aria-label={label ?? "Service location"}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gray-700" />
          <h2 className="text-base font-semibold text-gray-900 tracking-tight">
            {label ?? "Service location"}
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          {description ??
            "Share your location so the mechanic can reach you quickly."}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:border-gray-400 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isFetchingLocation}
        >
          {isFetchingLocation ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Fetching location…
            </>
          ) : (
            <>
              <LocateFixed className="h-4 w-4" />
              Use current location
            </>
          )}
        </button>
        <p className="text-xs text-gray-500">
          Drop the pin on the map if GPS can't detect your location.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Map picker
        </label>
        <MapSelector
          coordinates={coordinates}
          onSelect={handleMapSelection}
          defaultCenter={DEFAULT_CENTER}
        />
        <p className="text-xs text-gray-500">
          Tap anywhere on the map or drag the pin to fine-tune your pickup spot.
        </p>
      </div>

      {statusMessage && !errorMessage ? (
        <p className="text-sm font-medium text-emerald-600">{statusMessage}</p>
      ) : null}

      {errorMessage ? (
        <p className="text-sm font-medium text-red-500">{errorMessage}</p>
      ) : null}

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Shareable link
        </label>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={shareableLink}
            readOnly
            placeholder="A Google Maps link appears after you set your location."
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:border-gray-400 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!shareableLink}
            >
              <Copy className="h-4 w-4" />
              {copiedLink ? "Copied" : "Copy link"}
            </button>
            <button
              type="button"
              onClick={handleClearLocation}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!coordinates}
            >
              <RefreshCcw className="h-4 w-4" />
              Clear location
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationPicker;
