import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { getContactPage } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Nexify Africa — strategy, brand systems, and digital products for Africa's most ambitious teams.",
};

export default async function ContactRoute() {
  const data = await getContactPage().catch(() => null);

  if (!data) {
    return <ContactPage />;
  }

  const visualProps =
    data.visualHeadline || data.visualDescription
      ? {
          visual: {
            imageSrc: data.visualImage?.asset
              ? urlFor(data.visualImage.asset).url()
              : "/images/contact/hero-bg.avif",
            headline: data.visualHeadline ?? "",
            description: data.visualDescription ?? "",
          },
        }
      : {};

  const detailsProps =
    data.details && data.details.length > 0
      ? { details: data.details.map((d) => ({ ...d, lines: d.lines as readonly string[] })) }
      : {};

  return (
    <ContactPage
      heroLines={data.heroLines}
      heroRevealLines={data.heroRevealLines}
      {...visualProps}
      {...detailsProps}
    />
  );
}
