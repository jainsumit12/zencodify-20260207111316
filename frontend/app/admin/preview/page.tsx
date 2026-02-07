"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteSpec } from "@zencodify/shared";
import {
  type PageSlug,
  parseSiteSpec,
  renderTemplate
} from "@/template-engine/renderTemplate";

const PAGE_OPTIONS: Array<{ label: string; slug: PageSlug }> = [
  { label: "Home", slug: "/" },
  { label: "About", slug: "/about" },
  { label: "Services", slug: "/services" },
  { label: "Gallery", slug: "/gallery" },
  { label: "Contact", slug: "/contact" }
];

export default function AdminPreviewPage() {
  const [pageSlug, setPageSlug] = useState<PageSlug>("/");
  const [spec, setSpec] = useState<SiteSpec | null>(null);
  const [renderedPage, setRenderedPage] = useState<JSX.Element | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      setRenderedPage(null);

      try {
        const rawSpec = localStorage.getItem("zencodify_admin_spec");
        if (!rawSpec) {
          throw new Error(
            "No admin spec found in local storage. Go to /admin and generate a site first."
          );
        }

        const parsedJson = JSON.parse(rawSpec) as unknown;
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
            : "Failed to load admin preview.";

        if (!cancelled) {
          setError(message);
          setSpec(null);
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
          <h1 className="font-heading text-3xl text-luxury-base sm:text-4xl">Admin Preview</h1>
          <p className="mt-1 text-sm text-luxury-base/70">
            Test generated output with template renderer using local data only.
          </p>
        </div>

        <Link
          href="/admin"
          className="rounded-full border border-luxury-base/20 px-4 py-2 text-sm font-semibold text-luxury-base hover:bg-luxury-base hover:text-white"
        >
          Back to Admin
        </Link>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {PAGE_OPTIONS.map((option) => (
          <button
            key={option.slug}
            type="button"
            onClick={() => setPageSlug(option.slug)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              option.slug === pageSlug
                ? "bg-luxury-base text-white"
                : "border border-luxury-base/20 text-luxury-base/75 hover:border-luxury-base/35"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {spec ? (
        <div className="mb-5 rounded-xl border border-luxury-base/10 bg-white px-4 py-3 text-sm text-luxury-base/75">
          <span className="font-semibold">{spec.templateId}</span> • {spec.business.name} • {spec.business.city}
        </div>
      ) : null}

      {loading ? <p className="text-sm text-luxury-base/70">Rendering preview...</p> : null}

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!loading && !error && renderedPage ? renderedPage : null}
    </main>
  );
}
