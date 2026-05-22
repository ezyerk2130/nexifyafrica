"use client";

import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  ssr: false,
  loading: () => (
    <div
      className="h-screen w-full"
      style={{
        background: "linear-gradient(180deg, #0D0D12 0%, #003B8C 100%)",
      }}
    />
  ),
});

export default HeroSection;
