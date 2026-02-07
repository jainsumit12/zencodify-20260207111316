import Link from "next/link";

type HeroProps = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  backgroundImageUrl: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export default function Hero({
  eyebrow,
  headline,
  subheadline,
  backgroundImageUrl,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref
}: HeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(15,17,23,0.35) 0%, rgba(15,17,23,0.8) 100%), url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="shell-container">
        <div className="flex min-h-[70vh] items-center py-20 sm:min-h-[80vh]">
          <div className="max-w-3xl text-white">
            <p className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold sm:text-sm">
              {eyebrow}
            </p>
            <h1 className="font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">{headline}</h1>
            <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">{subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={primaryCtaHref} className="luxury-button bg-luxury-gold px-7 text-luxury-base shadow-card hover:bg-luxury-goldDark">
                {primaryCtaLabel}
              </Link>
              <Link href={secondaryCtaHref} className="luxury-button border border-white/50 bg-white/10 px-7 text-white hover:bg-white/20">
                {secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
