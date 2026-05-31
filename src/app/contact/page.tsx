import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Nexify Africa — strategy, brand systems, and digital products for Africa's most ambitious teams.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
