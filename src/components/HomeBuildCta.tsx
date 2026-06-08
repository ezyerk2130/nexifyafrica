import Image from "next/image";
import Link from "next/link";
import { safeHref } from "@/lib/url";

const DEFAULT_HEADING = "Have an idea?";
const DEFAULT_DESCRIPTION =
  "We've solved problems in over 15 industries. If you've got a challenge, we've likely tackled something similar.";
const DEFAULT_CTA_TEXT = "Let's Build Together";
const DEFAULT_CTA_HREF = "/contact";

type Props = {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
};

export default function HomeBuildCta({
  heading,
  description,
  ctaText,
  ctaHref,
}: Props = {}) {
  const displayHeading = heading?.trim() || DEFAULT_HEADING;
  const displayDescription = description?.trim() || DEFAULT_DESCRIPTION;
  const buttonText = ctaText?.trim() || DEFAULT_CTA_TEXT;
  const buttonHref = safeHref(ctaHref || DEFAULT_CTA_HREF, DEFAULT_CTA_HREF);

  return (
    <section className="home-build" aria-labelledby="home-build-heading">
      <div className="home-section-inner home-section-inner--build">
        <div className="home-build-band">
          <div className="home-build-content">
            <h2 id="home-build-heading" className="home-build-heading">
              {displayHeading}
            </h2>
            <p className="home-build-description">{displayDescription}</p>
            <Link
              href={buttonHref}
              className="site-button border border-solid border-white bg-transparent"
            >
              {buttonText}
            </Link>
          </div>

          <div className="home-build-media">
            <Image
              src="/images/home/wanna-build.png"
              alt="Two Nexify Africa team members collaborating, one working on a laptop"
              width={507}
              height={321}
              className="home-build-img"
              sizes="(min-width: 768px) 45vw, 90vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
