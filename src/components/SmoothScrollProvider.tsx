"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ScrollTrigger } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  useSmoothScroll(true);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  return children;
}
