import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Authenticator from "@/src/components/authenticator/authenticator";
import StoreProvider from "@/src/store/store-provider";
import { Toaster } from "react-hot-toast";
import NotificationPermissionHandler from "@/src/components/notification-permission-handler";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Analytics from "@/src/components/analytics/Analytics";
import OfflineDetector from "@/src/components/offline-screen/offline-detector";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "101 Inc",
  description: "101 Inc",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${inter.variable} antialiased`}>
        <Analytics />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            <OfflineDetector>
              <Authenticator />
              <Toaster />
              <NotificationPermissionHandler />
              {children}
            </OfflineDetector>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
