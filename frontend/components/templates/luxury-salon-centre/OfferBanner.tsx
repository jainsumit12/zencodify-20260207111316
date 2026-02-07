import Link from "next/link";

type OfferBannerProps = {
  badge: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function OfferBanner({ badge, text, ctaLabel, ctaHref }: OfferBannerProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="shell-container">
        <div className="rounded-card bg-luxury-base bg-gold-glow p-8 text-white shadow-card sm:p-10">
          <p className="inline-flex rounded-full border border-luxury-gold/70 bg-luxury-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
            {badge}
          </p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading max-w-3xl text-2xl sm:text-3xl">{text}</h2>
            <Link href={ctaHref} className="luxury-button w-fit bg-luxury-gold px-6 text-luxury-base hover:bg-luxury-goldDark">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
