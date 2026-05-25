"use client";

import dynamic from "next/dynamic";

const CaseStudiesPage = dynamic(
  () => import("@/components/CaseStudiesPage"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#F4F6F8]" aria-hidden="true" />
    ),
  },
);

export default CaseStudiesPage;
