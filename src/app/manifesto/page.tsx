import type { Metadata } from "next";
import ManifestoPage from "@/components/ManifestoPage";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Where did Africa's digital promise go? Read the Nexify Africa manifesto on building software that matches the continent's ambition.",
};

export default function ManifestoRoute() {
  return <ManifestoPage />;
}
