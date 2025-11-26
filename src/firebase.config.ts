import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

const requestNotificationPermission = async () => {
  if (!messaging) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Permission not granted");
    return null;
  }

  const vapidKey =
    "BJ10345CNhcRcG7K_tKLxIV4Y0-3HF_FQHBsGkraWWHYyG4MnA5eSiyMwxZTvJfeVxz-IBEgjvEbIkEzfUKBJ4U";

  const token = await getToken(messaging, { vapidKey });
  return token;
};

export { app, auth, messaging, requestNotificationPermission };
