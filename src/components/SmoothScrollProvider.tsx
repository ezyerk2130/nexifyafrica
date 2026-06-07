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
  const isStudio = pathname.startsWith("/studio");
  useSmoothScroll(!isStudio);

  useEffect(() => {
    if (!isStudio) ScrollTrigger.refresh();
  }, [pathname, isStudio]);

  return children;
}
