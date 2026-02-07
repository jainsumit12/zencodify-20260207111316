import Link from "next/link";
import type { ServiceItem } from "@/data/templates/luxury-salon-centre";

type ServicesGridProps = {
  headline: string;
  subheadline: string;
  categories: string[];
  items: ServiceItem[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  maxItems?: number;
};

export default function ServicesGrid({
  headline,
  subheadline,
  categories,
  items,
  primaryCtaLabel,
  primaryCtaHref,
  maxItems
}: ServicesGridProps) {
  const displayItems = typeof maxItems === "number" ? items.slice(0, maxItems) : items;

  return (
    <section className="py-16 sm:py-20">
      <div className="shell-container">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl text-luxury-base sm:text-4xl">{headline}</h2>
            <p className="mt-4 text-luxury-base/75">{subheadline}</p>
          </div>
          <Link href={primaryCtaHref} className="luxury-button w-fit bg-luxury-base text-white hover:bg-luxury-surface">
            {primaryCtaLabel}
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-luxury-gold/35 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-luxury-goldDark">
              {category}
            </span>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((service) => (
            <article key={service.id} className="luxury-card group p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-luxury-goldDark">{service.category}</p>
              <h3 className="mt-2 font-heading text-2xl text-luxury-base">{service.name}</h3>
              <p className="mt-3 text-sm text-luxury-base/75">{service.description}</p>
              <div className="mt-5 flex items-end justify-between">
                <p className="text-sm font-medium text-luxury-base/60">{service.duration}</p>
                <p className="text-lg font-semibold text-luxury-goldDark">{service.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
