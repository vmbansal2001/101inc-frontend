importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBbtWbddaBxb6ykx2dvKS2hD8uvt_QAXrM",
  authDomain: "handyman-2f5a2.firebaseapp.com",
  projectId: "handyman-2f5a2",
  messagingSenderId: "838131927052",
  appId: "1:838131927052:web:672c058f00508c2574c629",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // When the payload already contains `notification`, the browser shows it.
  if (payload.notification) {
    return;
  }

  const title = payload.data?.title ?? "Notification";
  const options = {
    body: payload.data?.body,
    icon: payload.data?.icon ?? "/icons/icon-192x192.png",
  };

  self.registration.showNotification(title, options);
});
