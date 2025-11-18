import withPWA from "next-pwa";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
}) as (config: NextConfig) => NextConfig;

export default pwaConfig(nextConfig);
