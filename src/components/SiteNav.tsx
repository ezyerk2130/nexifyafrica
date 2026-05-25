import Link from "next/link";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Manifesto", href: "/#manifesto" },
  { label: "Team", href: "/#team" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Careers", href: "/#careers" },
] as const;

export default function SiteNav({
  animate = false,
  variant = "dark",
  className = "",
}: {
  animate?: boolean;
  variant?: "dark" | "light";
  className?: string;
}) {
  const isLight = variant === "light";
  const logoColor = isLight ? "text-[#003B8C]" : "text-white";
  const itemClass = animate
    ? "hero-header-item will-change-[transform,opacity] "
    : "";

  return (
    <header
      className={`flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8 lg:px-16 lg:pt-10 ${className}`}
    >
      <Link
        href="/"
        className={`${itemClass}text-sm font-semibold tracking-[0.2em] uppercase lg:text-base ${logoColor}`}
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
          href="/#contact"
          className="transition-opacity duration-300 hover:opacity-60"
        >
          Contact
        </Link>
      </nav>

      <div className={`${itemClass}flex items-center gap-5 lg:hidden`}>
        <Link
          href="/#contact"
          className={`text-sm transition-opacity duration-300 hover:opacity-60 ${logoColor}`}
        >
          Contact
        </Link>
        <button
          type="button"
          className="flex flex-col justify-center gap-[7px] p-1"
          aria-label="Open menu"
        >
          <span
            className={`block h-px w-6 ${isLight ? "bg-[#003B8C]" : "bg-white"}`}
            aria-hidden="true"
          />
          <span
            className={`block h-px w-6 ${isLight ? "bg-[#003B8C]" : "bg-white"}`}
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}
