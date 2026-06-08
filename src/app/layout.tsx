import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "@/lib/siteSettings";
import { getSiteSettings } from "@/sanity/lib/queries";
import { imageUrl } from "@/sanity/lib/image";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const polymathDisplay = localFont({
  src: [
    {
      path: "../../fonts/PolymathDispDemo-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/PolymathDispDemo-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-polymath-display",
  display: "swap",
});

const FALLBACK_DESCRIPTION =
  "Strategy, brand systems, and digital products for Africa's most disruptive thinkers.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);

  const title = settings?.seoTitle ?? "Nexify Africa";
  const template = settings?.seoTitleTemplate ?? "%s — Nexify Africa";
  const description = settings?.seoDescription ?? FALLBACK_DESCRIPTION;
  const ogImage =
    imageUrl(settings?.ogImage?.asset) ?? "/nexify-africa-logo.png";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexifyafrica.com",
    ),
    title: { default: title, template },
    description,
    openGraph: {
      title,
      description,
      siteName: title,
      type: "website",
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings().catch(() => null);

  const siteSettings: SiteSettings = {
    brandName: settings?.brandName ?? DEFAULT_SITE_SETTINGS.brandName,
    footerWordmark:
      settings?.footerWordmark ?? DEFAULT_SITE_SETTINGS.footerWordmark,
    navLinks:
      settings?.navLinks && settings.navLinks.length > 0
        ? settings.navLinks
        : DEFAULT_SITE_SETTINGS.navLinks,
    contactLink: {
      label: settings?.contactLinkLabel ?? DEFAULT_SITE_SETTINGS.contactLink.label,
      href: settings?.contactLinkHref ?? DEFAULT_SITE_SETTINGS.contactLink.href,
    },
    subscribeLabel:
      settings?.subscribeLabel ?? DEFAULT_SITE_SETTINGS.subscribeLabel,
    subscribePlaceholder:
      settings?.subscribePlaceholder ?? DEFAULT_SITE_SETTINGS.subscribePlaceholder,
    subscribeButtonText:
      settings?.subscribeButtonText ?? DEFAULT_SITE_SETTINGS.subscribeButtonText,
    subscribeNote: settings?.subscribeNote ?? DEFAULT_SITE_SETTINGS.subscribeNote,
    subscribeSuccessMessage:
      settings?.subscribeSuccessMessage ??
      DEFAULT_SITE_SETTINGS.subscribeSuccessMessage,
    copyright: (settings?.copyright ?? DEFAULT_SITE_SETTINGS.copyright).replace(
      "{year}",
      String(new Date().getFullYear()),
    ),
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${polymathDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[#F4F6F8] font-sans text-neutral-900"
        suppressHydrationWarning
      >
        <noscript>
          <style>{`
            .hero-word,
            .hero-word-reveal,
            .reveal-word,
            .reveal-word-subtitle {
              transform: none !important;
            }
            .hero-header-item {
              opacity: 1 !important;
            }
            .hero-copy-reveal-layer {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteSettingsProvider value={siteSettings}>
          <SmoothScrollProvider>
            <div id="main-content" tabIndex={-1}>
              {children}
            </div>
          </SmoothScrollProvider>
        </SiteSettingsProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
