"use client";

import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  ssr: false,
  loading: () => (
    <div
      className="h-screen w-full"
      style={{
        background: "#003B8C",
      }}
    />
  ),
});

export default HeroSection;
