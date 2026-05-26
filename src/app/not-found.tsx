import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#003B8C] px-6 text-center text-white">
      <p className="text-sm tracking-[0.2em] uppercase text-white/70">404</p>
      <h1 className="mt-3 text-3xl tracking-[-0.03em] md:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/80 sm:text-base">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="site-button border border-solid border-white bg-transparent">
          Back to home
        </Link>
        <Link
          href="/case-studies"
          className="site-button border border-solid border-white bg-transparent"
        >
          Case studies
        </Link>
      </div>
    </main>
  );
}
