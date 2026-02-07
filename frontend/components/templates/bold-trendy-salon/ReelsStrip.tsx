import Image from "next/image";
import type { BoldReelItem } from "@/data/templates/bold-trendy-salon";

type ReelsStripProps = {
  title: string;
  subtitle: string;
  items: BoldReelItem[];
};

export default function ReelsStrip({ title, subtitle, items }: ReelsStripProps) {
  return (
    <section className="bg-[#07060f] py-16 sm:py-20">
      <div className="shell-container">
        <div className="mb-7 max-w-3xl">
          <h2 className="font-heading text-3xl text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-white/70">{subtitle}</p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex min-w-max gap-4">
            {items.map((item) => (
              <article key={item.id} className="w-[220px] flex-shrink-0 rounded-2xl border border-white/10 bg-[#120f1f] p-3 sm:w-[240px]">
                <div className="relative overflow-hidden rounded-xl">
                  <Image src={item.thumbnail} alt={item.title} width={500} height={800} className="h-72 w-full object-cover" />
                  <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">
                    {item.views} views
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
