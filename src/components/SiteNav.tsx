"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CONTACT_LINK, NAV_LINKS } from "@/config/navigation";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

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
  const { brandName, navLinks, contactLink } = useSiteSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
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

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const toggle = toggleRef.current;

    const getFocusable = () =>
      dialog
        ? Array.from(
            dialog.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    // Move focus into the dialog when it opens.
    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !dialog?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      // Return focus to the toggle when the menu closes.
      (toggle ?? previouslyFocused)?.focus?.();
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
        {brandName}
      </Link>

      <nav
        className={`${itemClass}hidden items-center gap-6 text-sm lg:flex lg:gap-8 ${logoColor}`}
        aria-label="Main navigation"
      >
        {navLinks.map((item) => (
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
          href={contactLink.href}
          className="transition-opacity duration-300 hover:opacity-60"
        >
          {contactLink.label}
        </Link>
      </nav>

      <div className={`${itemClass}flex items-center gap-5 lg:hidden`}>
        <Link
          href={contactLink.href}
          className={`text-sm transition-opacity duration-300 hover:opacity-60 ${logoColor}`}
          onClick={closeMenu}
        >
          {contactLink.label}
        </Link>
        <button
          ref={toggleRef}
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
          ref={dialogRef}
          id={menuId}
          className="fixed inset-0 z-50 bg-[#003B8C] px-6 pt-24 sm:px-8 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center text-white sm:right-8"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <span className="absolute block h-px w-6 rotate-45 bg-white" aria-hidden="true" />
            <span className="absolute block h-px w-6 -rotate-45 bg-white" aria-hidden="true" />
          </button>
          <nav
            className="flex flex-col gap-6 text-lg text-white"
            aria-label="Mobile navigation"
          >
            {navLinks.map((item) => (
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
              href={contactLink.href}
              className="transition-opacity duration-300 hover:opacity-70"
              onClick={closeMenu}
            >
              {contactLink.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
