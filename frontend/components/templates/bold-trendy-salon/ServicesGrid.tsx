import Link from "next/link";
import type { BoldPackageItem, BoldServiceItem } from "@/data/templates/bold-trendy-salon";

type ServicesGridProps = {
  title: string;
  subtitle: string;
  categories: string[];
  items: BoldServiceItem[];
  ctaLabel: string;
  ctaHref: string;
  maxItems?: number;
  showPackages?: boolean;
  packagesTitle?: string;
  packagesSubtitle?: string;
  packages?: BoldPackageItem[];
};

export default function ServicesGrid({
  title,
  subtitle,
  categories,
  items,
  ctaLabel,
  ctaHref,
  maxItems,
  showPackages = false,
  packagesTitle,
  packagesSubtitle,
  packages
}: ServicesGridProps) {
  const displayItems = typeof maxItems === "number" ? items.slice(0, maxItems) : items;

  return (
    <section className="bg-[#0a0813] py-16 sm:py-20">
      <div className="shell-container">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-white/70">{subtitle}</p>
          </div>
          <Link href={ctaHref} className="luxury-button w-fit rounded-full bg-[#ff4bc4] px-6 text-white hover:bg-[#ff34bc]">
            {ctaLabel}
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-[#ff4bc455] bg-[#ff4bc415] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#ff8ae1]"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-white/10 bg-[#120f1f] p-5 transition hover:border-[#00e0ff66] hover:shadow-[0_0_24px_rgba(0,224,255,0.18)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#b89dff]">{item.category}</p>
              <h3 className="font-heading mt-2 text-2xl text-white">{item.name}</h3>
              <p className="mt-2 text-sm text-white/70">{item.description}</p>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-sm text-white/55">{item.duration}</span>
                <span className="font-semibold text-[#ff70d8]">{item.price}</span>
              </div>
            </article>
          ))}
        </div>

        {showPackages ? (
          <div className="mt-14 rounded-3xl border border-white/10 bg-[#0f0d1b] p-6 sm:p-8">
            <h3 className="font-heading text-3xl text-white">{packagesTitle}</h3>
            <p className="mt-2 text-white/70">{packagesSubtitle}</p>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {(packages ?? []).map((pack) => (
                <article key={pack.id} className="rounded-2xl border border-white/10 bg-[#171329] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9bd8ff]">{pack.subtitle}</p>
                  <h4 className="font-heading mt-2 text-2xl text-white">{pack.name}</h4>
                  <p className="mt-1 font-semibold text-[#ff84de]">{pack.price}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {pack.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#00d7ff]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={pack.ctaHref}
                    className="luxury-button mt-5 w-full rounded-full bg-gradient-to-r from-[#7b5cff] to-[#ff4bc4] text-white"
                  >
                    {pack.ctaLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
