"use client";

import { requestNotificationPermission } from "@/src/firebase.config";
import { useEffect } from "react";

export default function NotificationPermissionHandler() {
  const askPermission = async () => {
    const token = await requestNotificationPermission();
    console.log("FCM TOKEN:", token);
    // Save token to Firestore / your backend
  };

  useEffect(() => {
    askPermission();
  }, []);

  return null;
}
