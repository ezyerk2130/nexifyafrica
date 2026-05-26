import type { Metadata } from "next";
import CaseStudiesPage from "@/components/CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore how Nexify Africa helps companies succeed through strategy, brand systems, and digital products.",
};

export default function CaseStudiesRoute() {
  return <CaseStudiesPage />;
}
