"use client";

import { requestNotificationPermission } from "@/src/firebase.config";

export default function NotificationPermissionButton() {
  const askPermission = async () => {
    const token = await requestNotificationPermission();
    console.log("FCM TOKEN:", token);
    // Save token to Firestore / your backend
  };

  return (
    <button
      onClick={askPermission}
      className="p-3 bg-blue-500 text-white rounded"
    >
      Enable Notifications
    </button>
  );
}
