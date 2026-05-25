import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
  title: "New Genre — Design & Technology Studio",
  description:
    "New Genre is a global design & technology studio accelerating tomorrow's ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${polymathDisplay.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[#003B8C] font-sans text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
