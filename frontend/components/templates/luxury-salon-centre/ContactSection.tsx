"use client";

import { FormEvent, useState } from "react";

type ContactSectionProps = {
  headline: string;
  subheadline: string;
  phoneNumber: string;
  whatsappNumber: string;
  whatsappLabel: string;
  address: string;
  businessHours: string[];
  mapPlaceholderTitle: string;
  mapPlaceholderSubtitle: string;
  formTitle: string;
  formFields: {
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    submitLabel: string;
    successToast: string;
  };
  showMap?: boolean;
  showForm?: boolean;
};

export default function ContactSection({
  headline,
  subheadline,
  phoneNumber,
  whatsappNumber,
  whatsappLabel,
  address,
  businessHours,
  mapPlaceholderTitle,
  mapPlaceholderSubtitle,
  formTitle,
  formFields,
  showMap = false,
  showForm = false
}: ContactSectionProps) {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="shell-container">
        <div className="mb-8 max-w-3xl">
          <h2 className="font-heading text-3xl text-luxury-base sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-luxury-base/75">{subheadline}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="luxury-card p-6 sm:p-8">
            <div className="space-y-4 text-sm text-luxury-base/85">
              <a href={`tel:${phoneNumber}`} className="block rounded-xl border border-luxury-base/10 px-4 py-3 hover:bg-luxury-soft">
                {phoneNumber}
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-luxury-base/10 px-4 py-3 hover:bg-luxury-soft"
              >
                {whatsappLabel}
              </a>
              <div className="rounded-xl border border-luxury-base/10 px-4 py-3">{address}</div>
              <div className="rounded-xl border border-luxury-base/10 px-4 py-3">
                <ul className="space-y-1">
                  {businessHours.map((hour) => (
                    <li key={hour}>{hour}</li>
                  ))}
                </ul>
              </div>
            </div>

            {showMap ? (
              <div className="mt-6 overflow-hidden rounded-card border border-luxury-base/10 bg-luxury-base/95 p-6 text-center text-white">
                <p className="font-heading text-xl">{mapPlaceholderTitle}</p>
                <p className="mt-2 text-sm text-white/75">{mapPlaceholderSubtitle}</p>
              </div>
            ) : null}
          </div>

          {showForm ? (
            <div className="luxury-card relative p-6 sm:p-8">
              <h3 className="font-heading text-2xl text-luxury-base">{formTitle}</h3>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-luxury-base/80">
                  <span>{formFields.nameLabel}</span>
                  <input
                    required
                    type="text"
                    className="mt-2 w-full rounded-xl border border-luxury-base/15 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-luxury-gold"
                  />
                </label>

                <label className="block text-sm font-medium text-luxury-base/80">
                  <span>{formFields.emailLabel}</span>
                  <input
                    required
                    type="email"
                    className="mt-2 w-full rounded-xl border border-luxury-base/15 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-luxury-gold"
                  />
                </label>

                <label className="block text-sm font-medium text-luxury-base/80">
                  <span>{formFields.phoneLabel}</span>
                  <input
                    required
                    type="tel"
                    className="mt-2 w-full rounded-xl border border-luxury-base/15 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-luxury-gold"
                  />
                </label>

                <label className="block text-sm font-medium text-luxury-base/80">
                  <span>{formFields.messageLabel}</span>
                  <textarea
                    required
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-luxury-base/15 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-luxury-gold"
                  />
                </label>

                <button type="submit" className="luxury-button w-full bg-luxury-gold text-luxury-base hover:bg-luxury-goldDark">
                  {formFields.submitLabel}
                </button>
              </form>

              {showToast ? (
                <p className="absolute right-6 top-6 rounded-full border border-luxury-gold/30 bg-luxury-gold/15 px-4 py-1.5 text-xs font-semibold text-luxury-goldDark">
                  {formFields.successToast}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
