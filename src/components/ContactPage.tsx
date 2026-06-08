"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import ContactHero from "@/components/ContactHero";
import ContactPhoneField from "@/components/ContactPhoneField";
import Footer from "@/components/Footer";
import { CONTACT_DETAILS, CONTACT_VISUAL } from "@/data/contact";
import { isSafeHref } from "@/lib/url";

type ContactIconType = "email" | "phone" | "address";
type ContactDetail = { id: string; title: string; lines: readonly string[]; href?: string };
type ContactVisual = { imageSrc: string; headline: string; description: string };
type ContactForm = {
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  companyLabel?: string;
  companyPlaceholder?: string;
  detailsLabel?: string;
  detailsPlaceholder?: string;
  submitText?: string;
  submitSentText?: string;
};

const DEFAULT_FORM: Required<ContactForm> = {
  nameLabel: "Name",
  namePlaceholder: "John Carter",
  emailLabel: "Email",
  emailPlaceholder: "example@nexifyafrica.com",
  companyLabel: "Company",
  companyPlaceholder: "Your company",
  detailsLabel: "Project details",
  detailsPlaceholder: "Tell us about your project",
  submitText: "Send Message",
  submitSentText: "Message sent",
};

type Props = {
  heroLines?: readonly string[];
  heroRevealLines?: readonly string[];
  visual?: ContactVisual;
  details?: ContactDetail[];
  form?: ContactForm;
};

function ContactIcon({ type }: { type: "email" | "phone" | "address" }) {
  if (type === "email") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="m5 7 7 5 7-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8.5 5.5h2l1.2 3.6-1.8 1.2a11.5 11.5 0 0 0 5 5l1.2-1.8 3.6 1.2v2A2.5 2.5 0 0 1 17 19.5C10.6 19.5 5 13.9 5 7.5A2.5 2.5 0 0 1 8.5 5.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function ContactPage({ heroLines, heroRevealLines, visual, details, form }: Props = {}) {
  const VISUAL = visual ?? CONTACT_VISUAL;
  const DETAILS = details ?? CONTACT_DETAILS;
  const FORM = { ...DEFAULT_FORM, ...(form ?? {}) };
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <ContactHero lines={heroLines} revealLines={heroRevealLines} />

      <section className="contact-page text-neutral-900">
        <div className="contact-layout mx-auto w-full max-w-[1400px] px-6 pb-24 pt-16 sm:px-8 lg:px-12 lg:pb-32 lg:pt-20">
          <aside className="contact-visual">
            <Image
              src={VISUAL.imageSrc}
              alt=""
              fill
              className="contact-visual-image object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
            />
            <div className="contact-visual-overlay" aria-hidden="true" />
            <div className="contact-visual-copy">
              <h2 className="contact-visual-headline">{VISUAL.headline}</h2>
              <p className="contact-visual-description">{VISUAL.description}</p>
            </div>
          </aside>

          <div className="contact-panel">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <label className="contact-field">
                  <span className="contact-label">{FORM.nameLabel}</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder={FORM.namePlaceholder}
                    className="contact-input"
                    required
                  />
                </label>
                <label className="contact-field">
                  <span className="contact-label">{FORM.emailLabel}</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={FORM.emailPlaceholder}
                    className="contact-input"
                    required
                  />
                </label>
              </div>

              <div className="contact-form-row">
                <ContactPhoneField />
                <label className="contact-field">
                  <span className="contact-label">{FORM.companyLabel}</span>
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder={FORM.companyPlaceholder}
                    className="contact-input"
                  />
                </label>
              </div>

              <label className="contact-field">
                <span className="contact-label">{FORM.detailsLabel}</span>
                <textarea
                  name="details"
                  rows={6}
                  placeholder={FORM.detailsPlaceholder}
                  className="contact-input contact-textarea"
                  required
                />
              </label>

              <button
                type="submit"
                className="site-button site-button--blue self-start"
                disabled={submitted}
              >
                {submitted ? FORM.submitSentText : FORM.submitText}
              </button>
            </form>

            <dl className="contact-details">
              {DETAILS.map((item) => {
                const lines = item.lines ?? [];
                const linkable = "href" in item && isSafeHref(item.href);
                return (
                  <div key={item.id} className="contact-detail">
                    <span className="contact-detail-icon">
                      <ContactIcon type={item.id as ContactIconType} />
                    </span>
                    <div className="contact-detail-copy">
                      <dt className="contact-detail-label">{item.title}</dt>
                      <dd className="contact-detail-value">
                        {linkable ? (
                          <a href={item.href} className="contact-detail-link">
                            {lines.map((line) => (
                              <span key={line} className="contact-detail-line">
                                {line}
                              </span>
                            ))}
                          </a>
                        ) : (
                          lines.map((line) => (
                            <span key={line} className="contact-detail-line">
                              {line}
                            </span>
                          ))
                        )}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
