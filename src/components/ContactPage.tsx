"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import ContactHero from "@/components/ContactHero";
import ContactPhoneField from "@/components/ContactPhoneField";
import Footer from "@/components/Footer";
import { CONTACT_DETAILS, CONTACT_VISUAL } from "@/data/contact";

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

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <ContactHero />

      <section className="contact-page text-neutral-900">
        <div className="contact-layout mx-auto w-full max-w-[1400px] px-6 pb-24 pt-16 sm:px-8 lg:px-12 lg:pb-32 lg:pt-20">
          <aside className="contact-visual">
            <Image
              src={CONTACT_VISUAL.imageSrc}
              alt=""
              fill
              className="contact-visual-image object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
            />
            <div className="contact-visual-overlay" aria-hidden="true" />
            <div className="contact-visual-copy">
              <h2 className="contact-visual-headline">{CONTACT_VISUAL.headline}</h2>
              <p className="contact-visual-description">{CONTACT_VISUAL.description}</p>
            </div>
          </aside>

          <div className="contact-panel">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <label className="contact-field">
                  <span className="contact-label">Name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="John Carter"
                    className="contact-input"
                    required
                  />
                </label>
                <label className="contact-field">
                  <span className="contact-label">Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="example@nexifyafrica.com"
                    className="contact-input"
                    required
                  />
                </label>
              </div>

              <div className="contact-form-row">
                <ContactPhoneField />
                <label className="contact-field">
                  <span className="contact-label">Company</span>
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder="Your company"
                    className="contact-input"
                  />
                </label>
              </div>

              <label className="contact-field">
                <span className="contact-label">Project details</span>
                <textarea
                  name="details"
                  rows={6}
                  placeholder="Tell us about your project"
                  className="contact-input contact-textarea"
                  required
                />
              </label>

              <button
                type="submit"
                className="site-button site-button--blue self-start"
                disabled={submitted}
              >
                {submitted ? "Message sent" : "Send Message"}
              </button>
            </form>

            <dl className="contact-details">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.id} className="contact-detail">
                  <span className="contact-detail-icon">
                    <ContactIcon type={item.id} />
                  </span>
                  <div className="contact-detail-copy">
                    <dt className="contact-detail-label">{item.title}</dt>
                    <dd className="contact-detail-value">
                      {"href" in item && item.href ? (
                        <a href={item.href} className="contact-detail-link">
                          {item.lines.map((line) => (
                            <span key={line} className="contact-detail-line">
                              {line}
                            </span>
                          ))}
                        </a>
                      ) : (
                        item.lines.map((line) => (
                          <span key={line} className="contact-detail-line">
                            {line}
                          </span>
                        ))
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
