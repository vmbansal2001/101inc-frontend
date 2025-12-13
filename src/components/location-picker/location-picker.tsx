"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Copy,
  Loader2,
  LocateFixed,
  MapPin,
  RefreshCcw,
  Search,
} from "lucide-react";

export type LocationDetails = {
  latitude: number;
  longitude: number;
  link: string;
};

type Landmark = {
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
  category?: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

type SearchResult = {
  name: string;
  displayName: string;
  latitude: number;
  longitude: number;
  address?: string;
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
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [landmarksStatus, setLandmarksStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [landmarksError, setLandmarksError] = useState("");
  const hasAttemptedAutoLocateRef = useRef(false);

  // Cache for landmarks to avoid redundant API calls
  const landmarksCacheRef = useRef<
    Map<string, { landmarks: Landmark[]; timestamp: number }>
  >(new Map());

  // Debounce timer for landmarks fetch
  const landmarksDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [searchError, setSearchError] = useState("");
  const searchDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const searchAbortControllerRef = useRef<AbortController | null>(null);

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

  // Auto-attempt current location once on mount (do not override if already set)
  useEffect(() => {
    if (
      !hasAttemptedAutoLocateRef.current &&
      !coordinates &&
      !shareableLink &&
      !isFetchingLocation
    ) {
      hasAttemptedAutoLocateRef.current = true;
      handleUseCurrentLocation();
    }
  }, [coordinates, shareableLink, isFetchingLocation]);

  // Fetch nearby landmarks when coordinates are available (with caching and debouncing)
  useEffect(() => {
    if (!coordinates) {
      setLandmarks([]);
      setLandmarksStatus("idle");
      setLandmarksError("");
      return;
    }

    // Clear any pending debounce timer
    if (landmarksDebounceTimerRef.current) {
      clearTimeout(landmarksDebounceTimerRef.current);
    }

    // Create cache key from coordinates (rounded to ~100m precision)
    const cacheKey = `${coordinates.latitude.toFixed(
      3
    )},${coordinates.longitude.toFixed(3)}`;
    const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes
    const now = Date.now();

    // Check cache first
    const cached = landmarksCacheRef.current.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_DURATION_MS) {
      setLandmarks(cached.landmarks);
      setLandmarksStatus("success");
      setLandmarksError("");
      return;
    }

    // Debounce the API call (wait 500ms after last coordinate change)
    landmarksDebounceTimerRef.current = setTimeout(() => {
      const controller = new AbortController();
      const fetchLandmarks = async () => {
        try {
          setLandmarksStatus("loading");
          setLandmarksError("");

          const radiusMeters = 800;
          const query = `[out:json][timeout:10];
            (
              node(around:${radiusMeters},${coordinates.latitude},${coordinates.longitude})["name"]["amenity"];
              way(around:${radiusMeters},${coordinates.latitude},${coordinates.longitude})["name"]["amenity"];
              relation(around:${radiusMeters},${coordinates.latitude},${coordinates.longitude})["name"]["amenity"];
            );
            out center 5;`;

          const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
            query
          )}`;

          const response = await fetch(url, {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          });

          // Handle specific HTTP status codes
          if (response.status === 429) {
            throw new Error(
              "Too many requests. Please wait a moment and try again."
            );
          }

          if (response.status === 504) {
            throw new Error(
              "Request timed out. The service may be busy. Please try again."
            );
          }

          if (!response.ok) {
            throw new Error(
              `Unable to load landmarks (${response.status}). Please try again later.`
            );
          }

          const data = (await response.json()) as {
            elements?: Array<{
              type: string;
              lat?: number;
              lon?: number;
              center?: { lat: number; lon: number };
              tags?: {
                name?: string;
                amenity?: string;
                ["addr:street"]?: string;
                ["addr:city"]?: string;
                ["addr:postcode"]?: string;
                ["addr:suburb"]?: string;
                ["addr:place"]?: string;
                ["addr:state"]?: string;
              };
            }>;
          };

          const parsed: Landmark[] =
            data.elements
              ?.map<Landmark | null>((el) => {
                const name = el.tags?.name;
                const category = el.tags?.amenity;
                const lat = el.lat ?? el.center?.lat;
                const lon = el.lon ?? el.center?.lon;
                if (!name || lat === undefined || lon === undefined)
                  return null;

                const street = el.tags?.["addr:street"];
                const city = el.tags?.["addr:city"] ?? el.tags?.["addr:place"];
                const suburb = el.tags?.["addr:suburb"];
                const postcode = el.tags?.["addr:postcode"];
                const state = el.tags?.["addr:state"];

                const addressParts = [
                  street,
                  suburb,
                  city,
                  state,
                  postcode,
                ].filter(Boolean);

                return {
                  name,
                  address:
                    addressParts.length > 0
                      ? addressParts.join(", ")
                      : undefined,
                  category: category ?? undefined,
                  latitude: lat,
                  longitude: lon,
                };
              })
              .filter((item): item is Landmark => item !== null)
              .slice(0, 5) ?? [];

          // Store in cache
          landmarksCacheRef.current.set(cacheKey, {
            landmarks: parsed,
            timestamp: now,
          });

          // Clean up old cache entries (keep only last 20)
          if (landmarksCacheRef.current.size > 20) {
            const entries = Array.from(landmarksCacheRef.current.entries());
            entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
            landmarksCacheRef.current.clear();
            entries.slice(0, 20).forEach(([key, value]) => {
              landmarksCacheRef.current.set(key, value);
            });
          }

          setLandmarks(parsed);
          setLandmarksStatus("success");
        } catch (err) {
          if (controller.signal.aborted) return;
          setLandmarksStatus("error");
          setLandmarksError(
            err instanceof Error
              ? err.message
              : "Failed to load landmarks. Please try again."
          );
        }
      };

      fetchLandmarks();
    }, 500); // 500ms debounce

    return () => {
      if (landmarksDebounceTimerRef.current) {
        clearTimeout(landmarksDebounceTimerRef.current);
      }
    };
  }, [coordinates]);

  // Geocoding search (Nominatim) with debounce
  useEffect(() => {
    if (searchDebounceTimerRef.current) {
      clearTimeout(searchDebounceTimerRef.current);
    }
    // Clear results for short queries
    if (searchQuery.trim().length < 3) {
      setSearchResults([]);
      setSearchStatus("idle");
      setSearchError("");
      return;
    }

    searchDebounceTimerRef.current = setTimeout(() => {
      // Abort previous request if any
      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort();
      }
      const controller = new AbortController();
      searchAbortControllerRef.current = controller;

      const fetchSearch = async () => {
        try {
          setSearchStatus("loading");
          setSearchError("");
          const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
            searchQuery
          )}&limit=5`;

          const response = await fetch(url, {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
              // Nominatim usage policy recommends identifying the app
              "User-Agent": "101inc-frontend/1.0",
              Referer:
                typeof window !== "undefined" ? window.location.origin : "",
            },
          });

          if (!response.ok) {
            if (response.status === 429) {
              throw new Error(
                "Search rate limit reached. Please wait a moment and try again."
              );
            }
            throw new Error(
              `Search failed (${response.status}). Please try again.`
            );
          }

          const data = (await response.json()) as Array<{
            display_name?: string;
            lat?: string;
            lon?: string;
            name?: string;
          }>;

          const results: SearchResult[] =
            data
              ?.map<SearchResult | null>((item) => {
                const lat = item.lat ? Number(item.lat) : undefined;
                const lon = item.lon ? Number(item.lon) : undefined;
                if (!lat || !lon) return null;
                return {
                  name: item.name ?? item.display_name ?? "Unknown place",
                  displayName: item.display_name ?? "Unknown place",
                  latitude: lat,
                  longitude: lon,
                  address: item.display_name,
                };
              })
              .filter((r): r is SearchResult => r !== null) ?? [];

          setSearchResults(results);
          setSearchStatus("success");
        } catch (err) {
          if (controller.signal.aborted) return;
          setSearchStatus("error");
          setSearchError(
            err instanceof Error
              ? err.message
              : "Unable to search right now. Please try again."
          );
        }
      };

      fetchSearch();
    }, 400); // 400ms debounce

    return () => {
      if (searchDebounceTimerRef.current) {
        clearTimeout(searchDebounceTimerRef.current);
      }
      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort();
      }
    };
  }, [searchQuery]);

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

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Search location
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search address or place"
            className="w-full rounded-lg border border-gray-200 px-9 py-2 text-sm text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        {searchStatus === "loading" ? (
          <p className="text-xs text-gray-500">Searching…</p>
        ) : null}
        {searchStatus === "error" ? (
          <p className="text-xs text-red-500">
            {searchError || "Unable to search right now."}
          </p>
        ) : null}
        {searchStatus === "success" && searchResults.length === 0 ? (
          <p className="text-xs text-gray-500">No results found.</p>
        ) : null}
        {searchResults.length > 0 ? (
          <div className="space-y-2">
            {searchResults.map((result) => (
              <button
                key={`${result.displayName}-${result.latitude}-${result.longitude}`}
                type="button"
                onClick={() => {
                  setSearchQuery(result.displayName);
                  setSearchResults([]);
                  applyCoordinates(result.latitude, result.longitude);
                }}
                className="flex w-full items-start gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <div className="border border-gray-200 rounded-full p-2">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="flex flex-col">
                  <span className="font-semibold text-gray-900">
                    {result.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {result.address ?? result.displayName}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ) : null}
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

        {statusMessage && !errorMessage ? (
          <p className="text-sm font-medium text-emerald-600">
            {statusMessage}
          </p>
        ) : null}

        {errorMessage ? (
          <p className="text-sm font-medium text-red-500">{errorMessage}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Nearby landmarks
        </label>
        {landmarksStatus === "loading" ? (
          <p className="text-xs text-gray-500">Finding landmarks near you…</p>
        ) : null}
        {landmarksStatus === "error" ? (
          <p className="text-xs text-red-500">
            {landmarksError || "Could not load nearby landmarks."}
          </p>
        ) : null}
        {landmarksStatus === "success" && landmarks.length === 0 ? (
          <p className="text-xs text-gray-500">No nearby landmarks found.</p>
        ) : null}
        {landmarks.length > 0 ? (
          <div className="space-y-2">
            {landmarks.map((landmark) => (
              <button
                key={`${landmark.name}-${landmark.latitude}-${landmark.longitude}`}
                type="button"
                onClick={() =>
                  applyCoordinates(landmark.latitude, landmark.longitude)
                }
                className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <div className="border border-gray-200 rounded-full p-2">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="flex flex-col">
                  <span className="font-semibold text-gray-900">
                    {landmark.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {landmark.address
                      ? landmark.address
                      : `${landmark.latitude.toFixed(
                          4
                        )}, ${landmark.longitude.toFixed(4)}`}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

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
