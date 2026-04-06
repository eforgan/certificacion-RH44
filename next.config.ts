import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Removed for standard Vercel deployment (Dynamic)
  images: {
    unoptimized: true,
  },
  transpilePackages: ["lucide-react"]
};

export default nextConfig;
