import Link from "next/link";
import Image from "next/image";

type AboutBlockProps = {
  headline: string;
  subheadline: string;
  ownerName: string;
  ownerRole: string;
  ownerImageUrl: string;
  ownerImageAlt: string;
  story: string[];
  trustPoints: string[];
  ctaLabel: string;
  ctaHref: string;
};

export default function AboutBlock({
  headline,
  subheadline,
  ownerName,
  ownerRole,
  ownerImageUrl,
  ownerImageAlt,
  story,
  trustPoints,
  ctaLabel,
  ctaHref
}: AboutBlockProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="shell-container">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="overflow-hidden rounded-card">
            <Image
              src={ownerImageUrl}
              alt={ownerImageAlt}
              width={1000}
              height={1200}
              className="h-[420px] w-full object-cover"
            />
          </div>

          <div>
            <h1 className="font-heading text-3xl text-luxury-base sm:text-4xl">{headline}</h1>
            <p className="mt-4 text-luxury-base/75">{subheadline}</p>
            <div className="mt-7 space-y-4 text-luxury-base/80">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 rounded-card border border-luxury-base/10 bg-white p-5">
              <p className="font-heading text-xl text-luxury-base">{ownerName}</p>
              <p className="text-sm text-luxury-base/65">{ownerRole}</p>
              <ul className="mt-4 space-y-2">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-luxury-base/85">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-luxury-gold" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href={ctaHref} className="luxury-button mt-8 bg-luxury-gold text-luxury-base hover:bg-luxury-goldDark">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
