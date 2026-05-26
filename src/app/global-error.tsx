"use client";

import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#003B8C] font-sans text-white antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl tracking-[-0.03em]">Something went wrong</h1>
          <p className="mt-4 max-w-md text-sm text-white/80">
            A critical error occurred. Please refresh the page.
          </p>
          <button
            type="button"
            onClick={reset}
            className="site-button mt-8 border border-solid border-white bg-transparent"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
