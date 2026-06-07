"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  detectDefaultCountry,
  formatCountryOption,
  formatLocalPhonePlaceholder,
  getPhoneCountry,
  PHONE_COUNTRIES,
} from "@/data/phoneCountries";

export default function ContactPhoneField() {
  const [countryCode, setCountryCode] = useState("TZ");
  const [localNumber, setLocalNumber] = useState("");
  const countrySelectId = useId();
  const phoneInputId = useId();

  useEffect(() => {
    // Country detection relies on navigator/Intl, which are unavailable during
    // SSR. Defer to a post-hydration effect so the server and first client
    // render agree (avoiding a hydration mismatch) before applying the result.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCountryCode(detectDefaultCountry());
  }, []);

  const selectedCountry = useMemo(
    () => getPhoneCountry(countryCode),
    [countryCode],
  );

  const fullPhone = localNumber
    ? `${selectedCountry.dial}${localNumber}`
    : "";

  return (
    <div className="contact-field">
      <label htmlFor={phoneInputId} className="contact-label">
        Phone
      </label>

      <div className="contact-phone-row">
        <label htmlFor={countrySelectId} className="sr-only">
          Country code
        </label>
        <select
          id={countrySelectId}
          className="contact-input contact-phone-country"
          value={countryCode}
          onChange={(event) => setCountryCode(event.target.value)}
          aria-label="Country code"
        >
          {PHONE_COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {formatCountryOption(country)}
            </option>
          ))}
        </select>

        <input
          id={phoneInputId}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          className="contact-input contact-phone-number"
          placeholder={formatLocalPhonePlaceholder(countryCode)}
          value={localNumber}
          onChange={(event) => {
            setLocalNumber(event.target.value.replace(/\D/g, ""));
          }}
        />
      </div>

      <input type="hidden" name="phone" value={fullPhone} />
    </div>
  );
}
