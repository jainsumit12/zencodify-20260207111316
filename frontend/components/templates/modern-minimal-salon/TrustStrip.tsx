import type { MinimalStat } from "@/data/templates/modern-minimal-salon";

type TrustStripProps = {
  title: string;
  stats: MinimalStat[];
};

export default function TrustStrip({ title, stats }: TrustStripProps) {
  return (
    <section className="py-10 sm:py-12">
      <div className="shell-container">
        <div className="rounded-[1.6rem] border border-[#eee8f2] bg-white px-6 py-8 shadow-soft sm:px-8">
          <p className="text-center text-sm font-medium text-[#5f5668] sm:text-base">{title}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-[#f0ecf3] bg-[#fbf9fc] p-4 text-center sm:p-5">
                <p className="font-heading text-2xl text-[#2f2435] sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#766d7f] sm:text-sm">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
