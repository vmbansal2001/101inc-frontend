"use client";

import { requestNotificationPermission } from "@/src/firebase.config";
import { useState } from "react";

export default function NotificationPermissionButton() {
  const [token, setToken] = useState<string | null>(null);

  const askPermission = async () => {
    const token = await requestNotificationPermission();
    console.log("FCM TOKEN:", token);
    setToken(token || null);
    // Save token to Firestore / your backend
  };

  return (
    <div>
      <button
        onClick={askPermission}
        className="p-3 bg-blue-500 text-white rounded"
      >
        Enable Notifications
      </button>
      {token && <p>Token: {token}</p>}
    </div>
  );
}
