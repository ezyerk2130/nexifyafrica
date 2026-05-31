import Link from "next/link";
import NotFoundIllustration from "@/components/NotFoundIllustration";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <NotFoundIllustration />
      <p className="not-found-code">404</p>
      <h1 className="not-found-message">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </h1>
      <Link
        href="/"
        className="site-button mt-10 border border-solid border-white bg-transparent"
      >
        Return Home
      </Link>
    </main>
  );
}
