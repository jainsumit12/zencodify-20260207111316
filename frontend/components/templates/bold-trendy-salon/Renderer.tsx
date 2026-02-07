"use client";

import type { SiteSpec } from "@zencodify/shared";

type PageSlug = "/" | "/about" | "/services" | "/gallery" | "/contact";

type RendererProps = {
  spec: SiteSpec;
  pageSlug: PageSlug;
};

const PAGE_LINKS: PageSlug[] = ["/", "/about", "/services", "/gallery", "/contact"];

export default function Renderer({ spec, pageSlug }: RendererProps) {
  return (
    <section className="rounded-2xl border border-white/15 bg-[#100d1f] p-6 text-white shadow-[0_0_24px_rgba(123,92,255,0.25)] sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff83de]">
        Bold Trendy Salon Stub Renderer
      </p>
      <h2 className="font-heading mt-2 text-3xl">{spec.business.name}</h2>
      <p className="mt-2 text-sm text-white/75">
        {spec.business.city} • {spec.business.phone} • {spec.business.whatsapp}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {PAGE_LINKS.map((slug) => (
          <a
            key={slug}
            href={`/demo/preview?page=${encodeURIComponent(slug)}`}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              slug === pageSlug
                ? "bg-gradient-to-r from-[#ff4bc4] to-[#7b5cff] text-white"
                : "border border-white/25 text-white/80"
            }`}
          >
            {slug}
          </a>
        ))}
      </div>

      <p className="mt-5 text-sm text-white/80">
        Current page slug: <span className="font-semibold">{pageSlug}</span>
      </p>
    </section>
  );
}
