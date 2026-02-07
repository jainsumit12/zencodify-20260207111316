import Image from "next/image";
import type { TestimonialItem } from "@/data/templates/luxury-salon-centre";

type TestimonialsProps = {
  headline: string;
  subheadline: string;
  items: TestimonialItem[];
};

export default function Testimonials({ headline, subheadline, items }: TestimonialsProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="shell-container">
        <div className="mb-10 max-w-3xl">
          <h2 className="font-heading text-3xl text-luxury-base sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-luxury-base/75">{subheadline}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="luxury-card p-6">
              <div className="flex items-center gap-4">
                <Image
                  src={item.photoUrl}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-luxury-base">{item.name}</p>
                  <div className="mt-1 flex gap-1 text-luxury-goldDark">
                    {Array.from({ length: item.rating }).map((_, starIndex) => (
                      <span key={`${item.id}-${starIndex}`}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm text-luxury-base/80">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
