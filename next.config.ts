import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  // Allow phone/LAN access in dev so /_next/* scripts load (not just the blue shell)
  allowedDevOrigins: [
    "192.168.1.221",
    "192.168.1.*",
    "192.168.0.*",
    "10.0.0.*",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes except the embedded Studio,
        // which needs framing/eval freedom that these headers would restrict.
        source: "/((?!studio).*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
