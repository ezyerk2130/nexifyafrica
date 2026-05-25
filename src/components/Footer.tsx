"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const FOOTER_NAV = [
  { label: "Home", href: "#" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Team", href: "#team" },
  { label: "Case Studies", href: "#work" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#privacy-policy" },
  { label: "Terms of Service", href: "#terms-of-service" },
  { label: "Cookies Settings", href: "#cookies-settings" },
] as const;

function AfricaLogo() {
  return (
    <Image
      src="/nexify-africa-logo.png"
      alt=""
      width={80}
      height={92}
      className="footer-logo h-14 w-auto mix-blend-screen sm:h-16"
      priority={false}
      aria-hidden="true"
    />
  );
}

function FooterWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fitWordmark = () => {
      const container = containerRef.current;
      const wrap = wrapRef.current;
      const text = textRef.current;
      if (!container || !wrap || !text) return;

      const viewportWidth = window.innerWidth;
      const buffer =
        viewportWidth < 768 ? 12 : viewportWidth < 1024 ? 10 : 6;
      const maxWidth = Math.max(0, wrap.clientWidth - buffer);

      let low = 12;
      let high = 320;
      let best = 12;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;

        if (text.scrollWidth <= maxWidth) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      text.style.fontSize = `${best}px`;
    };

    const scheduleFit = () => {
      window.requestAnimationFrame(fitWordmark);
    };

    scheduleFit();

    const container = containerRef.current;
    const resizeObserver =
      container && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleFit)
        : null;

    resizeObserver?.observe(container);
    window.addEventListener("resize", scheduleFit);
    window.visualViewport?.addEventListener("resize", scheduleFit);
    document.fonts?.ready.then(scheduleFit).catch(() => undefined);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleFit);
      window.visualViewport?.removeEventListener("resize", scheduleFit);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="footer-wordmark-wrap w-full px-6 sm:px-8 lg:px-12"
    >
      <h2 ref={wrapRef} className="footer-wordmark w-full">
        <span ref={textRef} className="footer-wordmark-text">
          Nexify Africa
        </span>
      </h2>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer bg-[#003B8C] text-white">
      <div className="footer-inner mx-auto w-full max-w-[1400px] px-6 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="footer-top flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="footer-brand-nav flex flex-col gap-6 sm:gap-8">
            <a href="#" aria-label="Nexify Africa home">
              <AfricaLogo />
            </a>

            <nav
              className="footer-nav flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-6"
              aria-label="Footer navigation"
            >
              {FOOTER_NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white transition-opacity duration-300 hover:opacity-70"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-subscribe w-full max-w-md lg:max-w-lg lg:pt-1">
            <p className="mb-3 text-sm text-white">Subscribe</p>

            <form
              className="footer-subscribe-form flex flex-col gap-3 sm:flex-row sm:items-stretch"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="footer-input min-h-11 flex-1 border border-white bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/70 outline-none transition-colors focus:border-white/80"
              />
              <button
                type="submit"
                className="site-button border border-solid border-white bg-transparent"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-3 max-w-md text-xs leading-relaxed text-white/90 sm:text-sm">
              By subscribing you agree to with our{" "}
              <a
                href="#privacy-policy"
                className="underline underline-offset-2 transition-opacity hover:opacity-70"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      <FooterWordmark />

      <div className="footer-inner mx-auto w-full max-w-[1400px] px-6 pb-12 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
        <div className="footer-divider my-8 h-px w-full bg-white/90 sm:my-10" />

        <div className="footer-bottom flex flex-col gap-4 text-xs text-white sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <nav
            className="footer-legal flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-6"
            aria-label="Legal links"
          >
            {LEGAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-opacity duration-300 hover:opacity-70"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <p className="text-white/95 sm:text-right">
            © 2025 Nexify Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
