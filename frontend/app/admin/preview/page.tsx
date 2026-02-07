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
    try {
      const raw = localStorage.getItem("zencodify_admin_spec");
      console.log("Loaded admin spec:", raw?.slice(0, 200));

      if (!raw) {
        setSpec(null);
        setError("❌ No generated spec found. Go back to /admin and generate.");
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(raw) as unknown;
      const validated = parseSiteSpec(parsed);
      setSpec(validated);
      setError(null);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message || "Failed to load admin spec");
      } else {
        setError("Failed to load admin spec");
      }
      setSpec(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!spec) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setRenderedPage(null);

      try {
        const rendered = await renderTemplate(spec, pageSlug);
        if (!cancelled) {
          setRenderedPage(rendered);
          setError(null);
        }
      } catch (err: unknown) {
        console.error(err);
        if (!cancelled) {
          if (err instanceof Error) {
            setError(err.message || "Failed to render preview");
          } else {
            setError("Failed to render preview");
          }
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
  }, [pageSlug, spec]);

  if (!spec && error) {
    return (
      <main className="shell-container py-12 sm:py-16">
        <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          <p className="text-sm font-medium">{error}</p>
          <Link
            href="/admin"
            className="mt-4 inline-flex rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
          >
            Back to /admin
          </Link>
        </div>
      </main>
    );
  }

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

      {error && spec ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!loading && !error && renderedPage ? renderedPage : null}
    </main>
  );
}
