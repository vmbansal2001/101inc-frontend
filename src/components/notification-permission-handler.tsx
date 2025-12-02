"use client";

import { requestNotificationPermission } from "@/src/firebase.config";
import { useEffect } from "react";
import useUserData from "./use-user-data/use-user-data";

export default function NotificationPermissionHandler() {
  const { userData } = useUserData();

  const userId = userData?.id;

  const askPermission = async () => {
    const token = await requestNotificationPermission();

    if (token && userId) {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/user_devices/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, fcm_token: token }),
        }
      );
    }
  };

  useEffect(() => {
    if (userId) {
      askPermission();
    }
  }, [userId]);

  return null;
}
