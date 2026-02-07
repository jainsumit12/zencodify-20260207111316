import type { StatItem } from "@/data/templates/luxury-salon-centre";

type TrustStripProps = {
  headline: string;
  stats: StatItem[];
};

export default function TrustStrip({ headline, stats }: TrustStripProps) {
  return (
    <section className="bg-luxury-base py-10 text-white sm:py-12">
      <div className="shell-container">
        <p className="mb-6 text-center text-sm font-medium text-white/85 sm:text-base">{headline}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-card border border-white/10 bg-white/5 p-6 text-center">
              <p className="font-heading text-3xl text-luxury-gold">{stat.value}</p>
              <p className="mt-2 text-sm text-white/80">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
