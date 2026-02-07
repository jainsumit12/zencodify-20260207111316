type HeroProps = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export default function Hero({
  eyebrow,
  headline,
  subheadline,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#06050c] py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#ff2db31f] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#7b5cff2a] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#00e0ff1f] blur-3xl" />

      <div className="shell-container relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#d6c8ff]">
            {eyebrow}
          </p>
          <h1 className="font-heading mt-6 text-4xl leading-tight text-white sm:text-6xl">
            {headline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg">{subheadline}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={primaryCtaHref}
              className="luxury-button rounded-full bg-gradient-to-r from-[#ff4bc4] to-[#7b5cff] px-7 text-white shadow-[0_0_30px_rgba(255,75,196,0.35)] hover:brightness-110"
            >
              {primaryCtaLabel}
            </a>
            <a
              href={secondaryCtaHref}
              className="luxury-button rounded-full border border-white/20 bg-white/5 px-7 text-white hover:bg-white/10"
            >
              {secondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
