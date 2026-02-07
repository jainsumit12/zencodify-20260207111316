import Link from "next/link";
import Image from "next/image";

type HeroProps = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  imageUrl?: string;
  imageAlt?: string;
  storyParagraphs?: string[];
  missionTitle?: string;
  missionText?: string;
  valuesTitle?: string;
  values?: string[];
};

export default function Hero({
  eyebrow,
  headline,
  subheadline,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  imageUrl,
  imageAlt,
  storyParagraphs,
  missionTitle,
  missionText,
  valuesTitle,
  values
}: HeroProps) {
  const hasAboutContent = Boolean(storyParagraphs?.length || missionText || values?.length);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fffdfd] via-[#f8f3f8] to-[#f6f6fb] py-16 sm:py-20">
      <div className="pointer-events-none absolute left-[-10rem] top-[-8rem] h-72 w-72 rounded-full bg-[#f5dde7]/60 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] top-[10rem] h-64 w-64 rounded-full bg-[#e6ddf4]/50 blur-3xl" />

      <div className="shell-container relative">
        <div className={`grid items-center gap-10 ${imageUrl ? "lg:grid-cols-[1.2fr_1fr]" : "lg:grid-cols-1"}`}>
          <div>
            <p className="inline-flex rounded-full border border-[#ece8ee] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#705a80]">
              {eyebrow}
            </p>
            <h1 className="font-heading mt-5 max-w-3xl text-4xl leading-tight text-[#1d1b22] sm:text-5xl lg:text-6xl">
              {headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-[#5b5363] sm:text-lg">{subheadline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryCtaHref} className="luxury-button bg-[#e7dbe7] px-6 text-[#2f2435] hover:bg-[#d8c6dd]">
                {primaryCtaLabel}
              </Link>
              <a href={secondaryCtaHref} className="luxury-button border border-[#ded5e0] bg-white px-6 text-[#433b49] hover:bg-[#f5f1f6]">
                {secondaryCtaLabel}
              </a>
            </div>
          </div>

          {imageUrl ? (
            <div className="luxury-card overflow-hidden rounded-[1.5rem] border border-white/80 p-2">
              <Image
                src={imageUrl}
                alt={imageAlt ?? headline}
                width={1100}
                height={1300}
                className="h-[420px] w-full rounded-[1.1rem] object-cover"
              />
            </div>
          ) : null}
        </div>

        {hasAboutContent ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="luxury-card rounded-[1.2rem] border border-[#efe8f2] p-6">
              <div className="space-y-4 text-sm leading-relaxed text-[#564d5f] sm:text-base">
                {(storyParagraphs ?? []).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <article className="luxury-card rounded-[1.2rem] border border-[#efe8f2] p-6">
                <h2 className="font-heading text-2xl text-[#1d1b22]">{missionTitle}</h2>
                <p className="mt-3 text-sm text-[#564d5f] sm:text-base">{missionText}</p>
              </article>

              <article className="luxury-card rounded-[1.2rem] border border-[#efe8f2] p-6">
                <h2 className="font-heading text-2xl text-[#1d1b22]">{valuesTitle}</h2>
                <ul className="mt-3 space-y-2 text-sm text-[#564d5f] sm:text-base">
                  {(values ?? []).map((value) => (
                    <li key={value} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c7b3cf]" />
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
