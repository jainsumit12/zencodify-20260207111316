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
        <article className="rounded-[1.6rem] border border-[#e7dfeb] bg-gradient-to-r from-[#f8eff2] via-[#f8f4fb] to-[#f4f6fc] p-7 shadow-soft sm:p-9">
          <p className="inline-flex rounded-full border border-[#d9ccdf] bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#6f5c7f]">
            {badge}
          </p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading max-w-3xl text-2xl text-[#1d1b22] sm:text-3xl">{text}</h2>
            <Link href={ctaHref} className="luxury-button w-fit rounded-full bg-[#e7dbe7] px-6 text-[#2f2435] hover:bg-[#d8c6dd]">
              {ctaLabel}
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
