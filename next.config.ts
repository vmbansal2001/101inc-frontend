import withPWA from "next-pwa";
import withSVGR from "next-svgr";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
}) as (config: NextConfig) => NextConfig;

const svgrConfig = withSVGR as (config: NextConfig) => NextConfig;

export default svgrConfig(pwaConfig(nextConfig));
