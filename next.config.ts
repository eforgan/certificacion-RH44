// @ts-ignore
import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  transpilePackages: ["lucide-react"],
  turbopack: {}
};

export default withPWA(nextConfig);
