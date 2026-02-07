import type { BoldTestimonialItem } from "@/data/templates/bold-trendy-salon";

type TestimonialsProps = {
  title: string;
  subtitle: string;
  items: BoldTestimonialItem[];
};

export default function Testimonials({ title, subtitle, items }: TestimonialsProps) {
  return (
    <section className="bg-[#08070f] py-16 sm:py-20">
      <div className="shell-container">
        <div className="mb-8 max-w-3xl">
          <h2 className="font-heading text-3xl text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-white/70">{subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-white/10 bg-[#120f1f] p-6">
              <div className="mb-3 flex gap-1 text-[#ff77de]">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <span key={`${item.id}-${index}`}>★</span>
                ))}
              </div>
              <p className="text-sm text-white/75">{item.text}</p>
              <p className="mt-4 text-sm font-semibold text-white">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
