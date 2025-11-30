import withPWA from "next-pwa";
import withSVGR from "next-svgr";
import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
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

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(svgrConfig(pwaConfig(nextConfig)));
