"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { CONTACT_LINK, NAV_LINKS } from "@/config/navigation";

export { NAV_LINKS, CONTACT_LINK };

export default function SiteNav({
  animate = false,
  variant = "dark",
  className = "",
}: {
  animate?: boolean;
  variant?: "dark" | "light";
  className?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const isLight = variant === "light";
  const logoColor = isLight ? "text-[#003B8C]" : "text-white";
  const itemClass = animate
    ? "hero-header-item will-change-[transform,opacity] "
    : "";
  const lineColor = isLight ? "bg-[#003B8C]" : "bg-white";

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, menuOpen]);

  return (
    <header
      className={`relative flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8 lg:px-16 lg:pt-10 ${className}`}
    >
      <Link
        href="/"
        className={`${itemClass}text-sm font-semibold tracking-[0.2em] uppercase lg:text-base ${logoColor}`}
        onClick={closeMenu}
      >
        NEXIFY AFRICA
      </Link>

      <nav
        className={`${itemClass}hidden items-center gap-6 text-sm lg:flex lg:gap-8 ${logoColor}`}
        aria-label="Main navigation"
      >
        {NAV_LINKS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="transition-opacity duration-300 hover:opacity-60"
          >
            {item.label}
          </Link>
        ))}
        <span
          className={`h-4 w-px ${isLight ? "bg-neutral-300" : "bg-white/30"}`}
          aria-hidden="true"
        />
        <Link
          href={CONTACT_LINK.href}
          className="transition-opacity duration-300 hover:opacity-60"
        >
          {CONTACT_LINK.label}
        </Link>
      </nav>

      <div className={`${itemClass}flex items-center gap-5 lg:hidden`}>
        <Link
          href={CONTACT_LINK.href}
          className={`text-sm transition-opacity duration-300 hover:opacity-60 ${logoColor}`}
          onClick={closeMenu}
        >
          {CONTACT_LINK.label}
        </Link>
        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center p-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`absolute block h-px w-6 transition-transform duration-300 ${lineColor} ${menuOpen ? "rotate-45" : "-translate-y-[3.5px]"}`}
            aria-hidden="true"
          />
          <span
            className={`absolute block h-px w-6 transition-transform duration-300 ${lineColor} ${menuOpen ? "-rotate-45" : "translate-y-[3.5px]"}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {menuOpen ? (
        <div
          id={menuId}
          className="fixed inset-0 z-50 bg-[#003B8C] px-6 pt-24 sm:px-8 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav
            className="flex flex-col gap-6 text-lg text-white"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-opacity duration-300 hover:opacity-70"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={CONTACT_LINK.href}
              className="transition-opacity duration-300 hover:opacity-70"
              onClick={closeMenu}
            >
              {CONTACT_LINK.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
