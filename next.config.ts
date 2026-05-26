import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone/LAN access in dev so /_next/* scripts load (not just the blue shell)
  allowedDevOrigins: [
    "192.168.1.221",
    "192.168.1.*",
    "192.168.0.*",
    "10.0.0.*",
  ],
};

export default nextConfig;
