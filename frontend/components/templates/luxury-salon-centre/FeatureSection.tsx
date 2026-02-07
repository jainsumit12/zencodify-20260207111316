import Link from "next/link";
import Image from "next/image";

type FeatureSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  imageUrl: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function FeatureSection({
  eyebrow,
  title,
  description,
  bullets,
  imageUrl,
  imageAlt,
  ctaLabel,
  ctaHref
}: FeatureSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="shell-container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-card">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={1200}
              height={900}
              className="h-[420px] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-base/35 to-transparent" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-luxury-goldDark">{eyebrow}</p>
            <h2 className="font-heading mt-3 text-3xl text-luxury-base sm:text-4xl">{title}</h2>
            <p className="mt-4 text-luxury-base/75">{description}</p>
            <ul className="mt-6 space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-luxury-base/85">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-luxury-gold" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <Link href={ctaHref} className="luxury-button mt-8 bg-luxury-gold text-luxury-base hover:bg-luxury-goldDark">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
