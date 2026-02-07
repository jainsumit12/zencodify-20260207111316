"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { SiteSpec } from "@zencodify/shared";
import {
  type PageSlug,
  parseSiteSpec,
  renderTemplate
} from "@/template-engine/renderTemplate";

const PAGE_SLUGS: PageSlug[] = ["/", "/about", "/services", "/gallery", "/contact"];

function toPageSlug(value: string | null): PageSlug {
  if (value && PAGE_SLUGS.includes(value as PageSlug)) {
    return value as PageSlug;
  }
  return "/";
}

function DemoPreviewContent() {
  const searchParams = useSearchParams();
  const [spec, setSpec] = useState<SiteSpec | null>(null);
  const [renderedPage, setRenderedPage] = useState<JSX.Element | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const pageSlug = toPageSlug(searchParams.get("page"));

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      setRenderedPage(null);

      try {
        const raw = localStorage.getItem("zencodify_demo_spec");
        if (!raw) {
          throw new Error("No generated spec found. Go to /demo and generate one first.");
        }

        const parsedJson = JSON.parse(raw) as unknown;
        const validatedSpec = parseSiteSpec(parsedJson);
        const rendered = await renderTemplate(validatedSpec, pageSlug);

        if (!cancelled) {
          setSpec(validatedSpec);
          setRenderedPage(rendered);
        }
      } catch (previewError) {
        const message =
          previewError instanceof Error
            ? previewError.message
            : "Failed to parse or render demo SiteSpec.";
        if (!cancelled) {
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [pageSlug]);

  return (
    <main className="shell-container py-12 sm:py-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl text-luxury-base sm:text-4xl">Demo Preview</h1>
          <p className="mt-1 text-sm text-luxury-base/70">
            Local renderer preview for generated SiteSpec data.
          </p>
        </div>
        <Link
          href="/demo"
          className="luxury-button rounded-full border border-luxury-base/20 text-luxury-base/80"
        >
          Back to Demo Form
        </Link>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {PAGE_SLUGS.map((slug) => (
          <Link
            key={slug}
            href={`/demo/preview?page=${encodeURIComponent(slug)}`}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              slug === pageSlug
                ? "bg-luxury-base text-white"
                : "border border-luxury-base/20 text-luxury-base/70"
            }`}
          >
            {slug}
          </Link>
        ))}
      </div>

      {spec ? (
        <div className="mb-5 rounded-xl border border-luxury-base/10 bg-white px-4 py-3 text-sm text-luxury-base/75">
          <span className="font-semibold">{spec.templateId}</span> • {spec.business.name} • {spec.business.city}
        </div>
      ) : null}

      {loading ? <p className="text-sm text-luxury-base/70">Rendering preview...</p> : null}

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {!loading && !error && renderedPage ? renderedPage : null}
    </main>
  );
}

export default function DemoPreviewPage() {
  return (
    <Suspense
      fallback={
        <main className="shell-container py-12 sm:py-16">
          <p className="text-sm text-luxury-base/70">Loading preview...</p>
        </main>
      }
    >
      <DemoPreviewContent />
    </Suspense>
  );
}
