import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Authenticator from "@/src/components/authenticator/authenticator";
import StoreProvider from "@/src/store/store-provider";
import { Toaster } from "react-hot-toast";
import NotificationPermissionHandler from "@/src/components/notification-permission-handler";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "101 Inc",
  description: "101 Inc",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <StoreProvider>
          <Authenticator />
          <Toaster />
          <NotificationPermissionHandler />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
