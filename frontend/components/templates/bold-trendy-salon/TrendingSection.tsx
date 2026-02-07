import Image from "next/image";
import type { BoldHighlightItem } from "@/data/templates/bold-trendy-salon";

type TrendingSectionProps = {
  title: string;
  subtitle: string;
  items: BoldHighlightItem[];
};

export default function TrendingSection({ title, subtitle, items }: TrendingSectionProps) {
  return (
    <section className="bg-[#090712] py-16 sm:py-20">
      <div className="shell-container">
        <div className="mb-8 max-w-3xl">
          <h2 className="font-heading text-3xl text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-white/70">{subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-white/10 bg-[#140f24] p-4">
              {item.image ? (
                <div className="mb-4 overflow-hidden rounded-xl">
                  <Image src={item.image} alt={item.title} width={700} height={800} className="h-40 w-full object-cover" />
                </div>
              ) : null}
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8ce8ff]">{item.subtitle}</p>
              <h3 className="font-heading mt-2 text-2xl text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
