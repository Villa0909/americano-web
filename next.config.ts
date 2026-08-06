import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.68.107",
    "192.168.68.107:3000",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uaoryfmlogtgpmafnlhv.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;