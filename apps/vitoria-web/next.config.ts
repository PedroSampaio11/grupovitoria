import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khgivttziofskyftzunr.supabase.co",
      },
    ],
  },
};

export default nextConfig;
