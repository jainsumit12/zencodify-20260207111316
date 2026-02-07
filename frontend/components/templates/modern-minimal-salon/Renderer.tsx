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
    <section className="rounded-2xl border border-[#ebe4ef] bg-white p-6 shadow-soft sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#705a80]">
        Modern Minimal Salon Stub Renderer
      </p>
      <h2 className="font-heading mt-2 text-3xl text-[#1d1b22]">{spec.business.name}</h2>
      <p className="mt-2 text-sm text-[#5b5363]">
        {spec.business.city} • {spec.business.phone} • {spec.business.whatsapp}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {PAGE_LINKS.map((slug) => (
          <a
            key={slug}
            href={`/demo/preview?page=${encodeURIComponent(slug)}`}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              slug === pageSlug
                ? "bg-[#e7dbe7] text-[#2f2435]"
                : "border border-[#ddd3e2] text-[#5f5668]"
            }`}
          >
            {slug}
          </a>
        ))}
      </div>

      <p className="mt-5 text-sm text-[#564d5f]">
        Current page slug: <span className="font-semibold">{pageSlug}</span>
      </p>
    </section>
  );
}
