import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "edukurve-storage.t3.storageapi.dev",
        port: "",
      },
    ],
  },
};

export default nextConfig;
