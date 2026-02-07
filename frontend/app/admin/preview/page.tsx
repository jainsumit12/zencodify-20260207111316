"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { SiteSpec } from "@zencodify/shared";
import {
  type PageSlug,
  normalizeTemplateId,
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

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message || "Unknown preview error";
  }
  return "Unknown preview error";
}

export default function AdminPreviewPage() {
  const [spec, setSpec] = useState<SiteSpec | null>(null);
  const [pageSlug, setPageSlug] = useState<PageSlug>("/");
  const [ui, setUi] = useState<JSX.Element | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugOpen, setDebugOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const availableSlugs = useMemo(
    () => (spec ? spec.pages.map((page) => page.slug) : []),
    [spec]
  );

  useEffect(() => {
    setLoading(true);
    setError(null);
    setUi(null);

    try {
      const raw = localStorage.getItem("zencodify_admin_spec");
      console.log("Loaded admin spec:", raw?.slice(0, 200));

      if (!raw) {
        setSpec(null);
        setError("No generated spec found. Go back to /admin.");
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(raw) as unknown;
      const validatedSpec = parseSiteSpec(parsed);
      setSpec(validatedSpec);

      const slugs = validatedSpec.pages.map((page) => page.slug);
      if (slugs.includes("/")) {
        setPageSlug("/");
      } else if (slugs[0]) {
        setPageSlug(slugs[0] as PageSlug);
      }
    } catch (parseError) {
      setSpec(null);
      setError(`Failed to parse saved SiteSpec: ${formatError(parseError)}`);
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

      if (!availableSlugs.includes(pageSlug)) {
        setUi(null);
        setError(`This spec does not include ${pageSlug} page.`);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const rendered = await renderTemplate(spec, pageSlug);
        if (!cancelled) {
          setUi(rendered);
        }
      } catch (renderError) {
        if (!cancelled) {
          setUi(null);
          setError(`Failed to render preview: ${formatError(renderError)}`);
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
  }, [spec, pageSlug, availableSlugs]);

  const handleSelectSlug = (slug: PageSlug) => {
    if (!spec) {
      return;
    }

    if (!availableSlugs.includes(slug)) {
      setError(`This spec does not include ${slug} page.`);
      return;
    }

    setError(null);
    setPageSlug(slug);
  };

  const handleCopySpec = async () => {
    if (!spec) {
      setError("No spec available to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(spec, null, 2));
    } catch (copyError) {
      setError(`Failed to copy spec: ${formatError(copyError)}`);
    }
  };

  const normalizedTemplateId = normalizeTemplateId(spec?.templateId);

  return (
    <main className="shell-container py-12 sm:py-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl text-luxury-base sm:text-4xl">Admin Preview</h1>
          <p className="mt-1 text-sm text-luxury-base/70">
            Internal preview for generated SiteSpec render output.
          </p>
        </div>

        <Link
          href="/admin"
          className="rounded-full border border-luxury-base/20 px-4 py-2 text-sm font-semibold text-luxury-base hover:bg-luxury-base hover:text-white"
        >
          Back to Admin
        </Link>
      </div>

      {error ? (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <p>{error}</p>
          <Link
            href="/admin"
            className="mt-3 inline-flex rounded-lg bg-red-700 px-3 py-1.5 text-xs font-semibold text-white"
          >
            Back to Admin
          </Link>
        </div>
      ) : null}

      <div className="mb-5 flex flex-wrap gap-2">
        {PAGE_OPTIONS.map((option) => {
          const enabled = availableSlugs.includes(option.slug);
          const selected = option.slug === pageSlug;

          return (
            <button
              key={option.slug}
              type="button"
              onClick={() => handleSelectSlug(option.slug)}
              disabled={!enabled}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                selected
                  ? "bg-luxury-base text-white"
                  : enabled
                    ? "border border-luxury-base/20 text-luxury-base/75 hover:border-luxury-base/35"
                    : "cursor-not-allowed border border-zinc-200 bg-zinc-100 text-zinc-400"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <section className="mb-5 rounded-xl border border-luxury-base/10 bg-white">
        <button
          type="button"
          onClick={() => setDebugOpen((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-luxury-base"
        >
          <span>Debug Panel</span>
          <span>{debugOpen ? "Hide" : "Show"}</span>
        </button>

        {debugOpen ? (
          <div className="border-t border-luxury-base/10 px-4 py-3 text-xs text-luxury-base/80">
            <p>
              <span className="font-semibold text-luxury-base">Raw templateId:</span>{" "}
              {spec?.templateId ?? "-"}
            </p>
            <p className="mt-1">
              <span className="font-semibold text-luxury-base">Normalized templateId:</span>{" "}
              {normalizedTemplateId ?? "(unrecognized)"}
            </p>
            <p className="mt-1">
              <span className="font-semibold text-luxury-base">Available slugs:</span>{" "}
              {availableSlugs.length > 0 ? availableSlugs.join(", ") : "-"}
            </p>
            <p className="mt-1">
              <span className="font-semibold text-luxury-base">Current slug:</span> {pageSlug}
            </p>
            <button
              type="button"
              onClick={handleCopySpec}
              className="mt-3 rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white"
            >
              Copy spec
            </button>
          </div>
        ) : null}
      </section>

      {loading ? (
        <div className="space-y-3 rounded-xl border border-luxury-base/10 bg-white p-5">
          <div className="h-4 w-40 animate-pulse rounded bg-zinc-200" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200" />
          <div className="h-64 animate-pulse rounded bg-zinc-100" />
        </div>
      ) : null}

      {!loading && ui ? (
        <div className="rounded-xl border border-luxury-base/10 bg-white p-1">{ui}</div>
      ) : null}

      {!loading && !ui && !error ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Preview is unavailable for the selected page.
        </div>
      ) : null}
    </main>
  );
}
