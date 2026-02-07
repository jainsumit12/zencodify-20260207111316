"use client";

import { FormEvent, useState } from "react";

type ContactSectionProps = {
  title: string;
  subtitle: string;
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
  title,
  subtitle,
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
  const [toastVisible, setToastVisible] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <section className="bg-[#07060f] py-16 sm:py-20">
      <div className="shell-container">
        <div className="mb-8 max-w-3xl">
          <h2 className="font-heading text-3xl text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-white/70">{subtitle}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-[#120f1f] p-6">
            <div className="space-y-3 text-sm text-white/75">
              <a href={`tel:${phoneNumber}`} className="block rounded-xl border border-white/10 px-4 py-3 hover:bg-white/5">
                {phoneNumber}
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-white/10 px-4 py-3 hover:bg-white/5"
              >
                {whatsappLabel}
              </a>
              <p className="rounded-xl border border-white/10 px-4 py-3">{address}</p>
              <div className="rounded-xl border border-white/10 px-4 py-3">
                <ul className="space-y-1">
                  {businessHours.map((hour) => (
                    <li key={hour}>{hour}</li>
                  ))}
                </ul>
              </div>
            </div>

            {showMap ? (
              <div className="mt-5 rounded-xl border border-white/10 bg-[#1a1430] p-6 text-center">
                <p className="font-heading text-xl text-white">{mapPlaceholderTitle}</p>
                <p className="mt-2 text-sm text-white/70">{mapPlaceholderSubtitle}</p>
              </div>
            ) : null}
          </article>

          {showForm ? (
            <article className="relative rounded-2xl border border-white/10 bg-[#120f1f] p-6">
              <h3 className="font-heading text-2xl text-white">{formTitle}</h3>
              <form className="mt-5 space-y-4" onSubmit={onSubmit}>
                <label className="block text-sm text-white/75">
                  <span>{formFields.nameLabel}</span>
                  <input
                    required
                    type="text"
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#0e0b1b] px-3 py-2.5 text-white outline-none focus:border-[#ff4bc4]"
                  />
                </label>
                <label className="block text-sm text-white/75">
                  <span>{formFields.emailLabel}</span>
                  <input
                    required
                    type="email"
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#0e0b1b] px-3 py-2.5 text-white outline-none focus:border-[#ff4bc4]"
                  />
                </label>
                <label className="block text-sm text-white/75">
                  <span>{formFields.phoneLabel}</span>
                  <input
                    required
                    type="tel"
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#0e0b1b] px-3 py-2.5 text-white outline-none focus:border-[#ff4bc4]"
                  />
                </label>
                <label className="block text-sm text-white/75">
                  <span>{formFields.messageLabel}</span>
                  <textarea
                    required
                    rows={4}
                    className="mt-1.5 w-full resize-none rounded-xl border border-white/15 bg-[#0e0b1b] px-3 py-2.5 text-white outline-none focus:border-[#ff4bc4]"
                  />
                </label>
                <button
                  type="submit"
                  className="luxury-button w-full rounded-full bg-gradient-to-r from-[#ff4bc4] to-[#7b5cff] text-white"
                >
                  {formFields.submitLabel}
                </button>
              </form>

              {toastVisible ? (
                <p className="absolute right-6 top-6 rounded-full bg-[#ff4bc429] px-4 py-1.5 text-xs font-semibold text-[#ff8ce1]">
                  {formFields.successToast}
                </p>
              ) : null}
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
