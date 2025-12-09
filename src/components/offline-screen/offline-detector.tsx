"use client";

import { useEffect, useState } from "react";
import OfflineScreen from "./offline-screen";

const OfflineDetector = ({ children }: { children: React.ReactNode }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine);

    // Listen for online event
    const handleOnline = () => {
      setIsOnline(true);
    };

    // Listen for offline event
    const handleOffline = () => {
      setIsOnline(false);
    };

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Show offline screen when offline
  if (!isOnline) {
    return <OfflineScreen />;
  }

  // Show normal content when online
  return <>{children}</>;
};

export default OfflineDetector;
