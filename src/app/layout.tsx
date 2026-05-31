import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexifyafrica.com",
  ),
  title: {
    default: "Nexify Africa",
    template: "%s — Nexify Africa",
  },
  description:
    "Strategy, brand systems, and digital products for Africa's most disruptive thinkers.",
  openGraph: {
    title: "Nexify Africa",
    description:
      "Strategy, brand systems, and digital products for Africa's most disruptive thinkers.",
    siteName: "Nexify Africa",
    type: "website",
    images: [{ url: "/nexify-africa-logo.png", alt: "Nexify Africa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexify Africa",
    description:
      "Strategy, brand systems, and digital products for Africa's most disruptive thinkers.",
    images: ["/nexify-africa-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${polymathDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[#003B8C] font-sans text-white"
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
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
