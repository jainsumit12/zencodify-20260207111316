import Link from "next/link";
import type { MinimalPackage, MinimalServiceItem } from "@/data/templates/modern-minimal-salon";

type ServicesGridProps = {
  title: string;
  subtitle: string;
  categories: string[];
  items: MinimalServiceItem[];
  ctaLabel: string;
  ctaHref: string;
  maxItems?: number;
  showPackages?: boolean;
  packagesTitle?: string;
  packagesSubtitle?: string;
  packages?: MinimalPackage[];
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
    <section className="py-16 sm:py-20">
      <div className="shell-container">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl text-[#1d1b22] sm:text-4xl">{title}</h2>
            <p className="mt-4 text-[#5b5363]">{subtitle}</p>
          </div>
          <Link href={ctaHref} className="luxury-button w-fit rounded-full bg-[#e7dbe7] px-6 text-[#2f2435] hover:bg-[#d8c6dd]">
            {ctaLabel}
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-[#e8e0eb] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#6b6075]">
              {category}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[#ece7f0] bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#7d6e88]">{item.category}</p>
              <h3 className="font-heading mt-2 text-2xl text-[#1d1b22]">{item.name}</h3>
              <p className="mt-2 text-sm text-[#5b5363]">{item.description}</p>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-sm text-[#7b7384]">{item.duration}</span>
                <span className="font-semibold text-[#3e2d47]">{item.price}</span>
              </div>
            </article>
          ))}
        </div>

        {showPackages ? (
          <div className="mt-14 rounded-[1.6rem] border border-[#eee8f2] bg-[#fcfbfd] p-6 sm:p-8">
            <h3 className="font-heading text-3xl text-[#1d1b22]">{packagesTitle}</h3>
            <p className="mt-2 text-[#5b5363]">{packagesSubtitle}</p>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {(packages ?? []).map((pack) => (
                <article key={pack.id} className="rounded-2xl border border-[#ece6f1] bg-white p-5 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b6b86]">{pack.subtitle}</p>
                  <h4 className="font-heading mt-2 text-2xl text-[#1d1b22]">{pack.name}</h4>
                  <p className="mt-2 font-semibold text-[#4a3954]">{pack.price}</p>
                  <ul className="mt-4 space-y-2 text-sm text-[#5b5363]">
                    {pack.inclusions.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c7b3cf]" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={pack.ctaHref} className="luxury-button mt-5 w-full rounded-full border border-[#dfd0e3] bg-[#f7f2f9] text-[#3f3347] hover:bg-[#efe5f3]">
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
