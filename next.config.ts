import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
    dynamicIO: true,
  },
};

export default nextConfig;
