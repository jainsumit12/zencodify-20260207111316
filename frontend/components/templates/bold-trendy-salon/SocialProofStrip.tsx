import type { BoldStatItem } from "@/data/templates/bold-trendy-salon";

type SocialProofStripProps = {
  title: string;
  stats: BoldStatItem[];
};

export default function SocialProofStrip({ title, stats }: SocialProofStripProps) {
  return (
    <section className="bg-[#0b0914] py-10">
      <div className="shell-container">
        <p className="mb-6 text-center text-sm text-white/70 sm:text-base">{title}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((item) => (
            <article key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="font-heading text-3xl text-[#ff75d9]">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/65">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
