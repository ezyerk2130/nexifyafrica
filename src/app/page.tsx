import HeroSection from "@/components/HeroSection";
import HomeFaqSection from "@/components/HomeFaqSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import NextSection from "@/components/NextSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NextSection />
      <HomeServicesSection />
      <HomeFaqSection />
      <Footer />
    </>
  );
}
