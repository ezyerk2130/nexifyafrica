import type { Metadata } from "next";
import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nexify Africa.",
};

export default function ContactPage() {
  return (
    <ComingSoonPage
      title="Contact"
      description="Our contact page is on its way. Check back soon."
    />
  );
}
