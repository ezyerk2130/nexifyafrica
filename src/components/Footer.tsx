"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FOOTER_NAV } from "@/config/navigation";

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

    if (container) {
      resizeObserver?.observe(container);
    }
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

type SubscribeStatus = "idle" | "success" | "error";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setMessage("");

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    const input = event.currentTarget.elements.namedItem(
      "footer-email",
    ) as HTMLInputElement | null;

    if (input && !input.checkValidity()) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("success");
    setMessage("Thanks for subscribing. We'll be in touch soon.");
    setEmail("");
  };

  return (
    <footer className="footer bg-[#003B8C] text-white">
      <div className="footer-inner mx-auto w-full max-w-[1400px] px-6 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="footer-top flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="footer-brand-nav flex flex-col gap-6 sm:gap-8">
            <Link href="/" aria-label="Nexify Africa home">
              <AfricaLogo />
            </Link>

            <nav
              className="footer-nav flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-6"
              aria-label="Footer navigation"
            >
              {FOOTER_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white transition-opacity duration-300 hover:opacity-70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-subscribe w-full max-w-md lg:max-w-lg lg:pt-1">
            <p className="mb-3 text-sm text-white">Subscribe</p>

            <form
              className="footer-subscribe-form flex flex-col gap-3 sm:flex-row sm:items-stretch"
              onSubmit={handleSubmit}
              noValidate
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                name="footer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="footer-input min-h-11 flex-1 border border-white bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/70 outline-none transition-colors focus:border-white/80"
                aria-describedby="footer-subscribe-feedback"
              />
              <button
                type="submit"
                className="site-button border border-solid border-white bg-transparent"
              >
                Subscribe
              </button>
            </form>

            <p
              id="footer-subscribe-feedback"
              className={`mt-3 max-w-md text-xs leading-relaxed sm:text-sm ${
                status === "error" ? "text-red-200" : "text-white/90"
              }`}
              aria-live="polite"
            >
              {message ||
                "By subscribing you agree to with our Privacy Policy."}
            </p>
          </div>
        </div>
      </div>

      <FooterWordmark />

      <div className="footer-inner mx-auto w-full max-w-[1400px] px-6 pb-12 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
        <div className="footer-divider my-8 h-px w-full bg-white/90 sm:my-10" />

        <div className="footer-bottom flex flex-col gap-4 text-xs text-white sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p className="text-white/95 sm:text-right">
            © 2026 Nexify Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
