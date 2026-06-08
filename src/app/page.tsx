import HeroSection from "@/components/HeroSection";
import HomeBuildCta from "@/components/HomeBuildCta";
import HomeFaqSection from "@/components/HomeFaqSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import NextSection from "@/components/NextSection";
import Footer from "@/components/Footer";
import {
  getFaqItems,
  getServices,
  getPrinciples,
  getHomePage,
} from "@/sanity/lib/queries";

export default async function Home() {
  const [faqItems, services, principles, homePage] = await Promise.all([
    getFaqItems().catch(() => null),
    getServices().catch(() => null),
    getPrinciples().catch(() => null),
    getHomePage().catch(() => null),
  ]);

  const heroProps = {
    lines: homePage?.heroLines,
    revealLines: homePage?.heroRevealLines,
    ctaText: homePage?.heroCtaText,
    ctaHref: homePage?.heroCtaHref,
  };

  const faqProps =
    faqItems && faqItems.length > 0
      ? {
          items: faqItems.map((f) => ({ id: f._id, question: f.question, answer: f.answer })),
          headingItalic: homePage?.faqHeadingItalic,
          heading: homePage?.faqHeading,
        }
      : {
          headingItalic: homePage?.faqHeadingItalic,
          heading: homePage?.faqHeading,
        };

  const servicesProps =
    services && services.length > 0
      ? {
          services: services.map((s) => ({
            id: s._id,
            number: s.number,
            title: s.title,
            description: s.description,
          })),
          heading: homePage?.servicesHeading,
        }
      : {};

  const buildCtaProps = {
    heading: homePage?.buildCtaHeading,
    description: homePage?.buildCtaDescription,
    ctaText: homePage?.buildCtaButtonText,
    ctaHref: homePage?.buildCtaButtonHref,
  };

  const principlesProps =
    principles && principles.length > 0
      ? {
          principles: principles.map((p) => ({
            id: p._id,
            icon: p.icon,
            title: p.title,
            description: p.description,
          })),
          headingBefore: homePage?.principlesHeadingBefore,
          headingHighlight: homePage?.principlesHeadingHighlight,
          headingAfter: homePage?.principlesHeadingAfter,
        }
      : {};

  return (
    <>
      <HeroSection {...heroProps} />
      <NextSection {...principlesProps} />
      <HomeServicesSection {...servicesProps} />
      <HomeBuildCta {...buildCtaProps} />
      <HomeFaqSection {...faqProps} />
      <Footer />
    </>
  );
}
