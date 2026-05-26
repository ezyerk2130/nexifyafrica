"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#003B8C] px-6 text-center text-white">
      <h1 className="text-3xl tracking-[-0.03em] md:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/80 sm:text-base">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="site-button border border-solid border-white bg-transparent"
        >
          Try again
        </button>
        <Link href="/" className="site-button border border-solid border-white bg-transparent">
          Back to home
        </Link>
      </div>
    </main>
  );
}
