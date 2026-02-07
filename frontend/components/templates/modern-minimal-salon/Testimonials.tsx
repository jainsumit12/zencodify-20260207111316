import type { MinimalTestimonialItem } from "@/data/templates/modern-minimal-salon";

type TestimonialsProps = {
  title: string;
  subtitle: string;
  items: MinimalTestimonialItem[];
};

export default function Testimonials({ title, subtitle, items }: TestimonialsProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="shell-container">
        <div className="mb-8 max-w-3xl">
          <h2 className="font-heading text-3xl text-[#1d1b22] sm:text-4xl">{title}</h2>
          <p className="mt-4 text-[#5b5363]">{subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[#ece7f0] bg-white p-6 shadow-soft">
              <div className="mb-3 flex gap-1 text-[#9c7fb0]">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <span key={`${item.id}-${index}`}>★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[#584f61]">{item.text}</p>
              <p className="mt-4 text-sm font-semibold text-[#352c3d]">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
