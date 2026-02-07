import Link from "next/link";

type OfferBannerProps = {
  badge: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function OfferBanner({ badge, text, ctaLabel, ctaHref }: OfferBannerProps) {
  return (
    <section className="bg-[#06050c] py-16 sm:py-20">
      <div className="shell-container">
        <article className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#2c1140] via-[#15163f] to-[#0a2640] p-7 shadow-[0_0_30px_rgba(123,92,255,0.25)] sm:p-9">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd0f1]">
            {badge}
          </p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading max-w-3xl text-2xl text-white sm:text-3xl">{text}</h2>
            <Link href={ctaHref} className="luxury-button w-fit rounded-full bg-[#ff4bc4] px-6 text-white hover:bg-[#ff30bc]">
              {ctaLabel}
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
