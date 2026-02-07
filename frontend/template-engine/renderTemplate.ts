import React from "react";
import {
  SiteSpecSchema,
  migrateGalleryStringsToImages,
  type SiteSpec
} from "@zencodify/shared";

export type TemplateId =
  | "luxury-salon-centre"
  | "modern-minimal-salon"
  | "bold-trendy-salon";

export type PageSlug = "/" | "/about" | "/services" | "/gallery" | "/contact";

type RendererProps = {
  spec: SiteSpec;
  pageSlug: PageSlug;
};

type RendererModule = {
  default: (props: RendererProps) => React.ReactElement;
};

const SUPPORTED_TEMPLATES: TemplateId[] = [
  "luxury-salon-centre",
  "modern-minimal-salon",
  "bold-trendy-salon"
];

const TEMPLATE_ALIASES: Record<string, TemplateId> = {
  "luxury-salon-centre": "luxury-salon-centre",
  "luxury salon centre": "luxury-salon-centre",
  "modern-minimal-salon": "modern-minimal-salon",
  "modern minimal salon": "modern-minimal-salon",
  "bold-trendy-salon": "bold-trendy-salon",
  "bold trendy salon": "bold-trendy-salon",
  "bold_trendy_salon": "bold-trendy-salon"
};

const rendererRegistry: Record<TemplateId, () => Promise<RendererModule>> = {
  "luxury-salon-centre": () =>
    import("@/components/templates/luxury-salon-centre/Renderer"),
  "modern-minimal-salon": () =>
    import("@/components/templates/modern-minimal-salon/Renderer"),
  "bold-trendy-salon": () => import("@/components/templates/bold-trendy-salon/Renderer")
};

function renderErrorCard(title: string, message: string, details?: string[]): JSX.Element {
  return React.createElement("div", {
    className: "rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700"
  }, [
    React.createElement(
      "p",
      { key: "title", className: "font-semibold text-red-800" },
      title
    ),
    React.createElement("p", { key: "message", className: "mt-2 whitespace-pre-wrap" }, message),
    ...(details ?? []).map((detail, index) =>
      React.createElement(
        "p",
        { key: `detail-${index}`, className: "mt-1 text-xs text-red-600" },
        detail
      )
    )
  ]) as JSX.Element;
}

export function normalizeTemplateId(input: unknown): TemplateId | null {
  const raw = String(input ?? "").trim().toLowerCase();
  if (!raw) {
    return null;
  }

  const normalized = raw
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return TEMPLATE_ALIASES[normalized] ?? TEMPLATE_ALIASES[raw] ?? null;
}

export function parseSiteSpec(input: unknown): SiteSpec {
  const migrated = migrateGalleryStringsToImages(input);
  return SiteSpecSchema.parse(migrated);
}

export function getTemplateRoute(templateId: TemplateId, pageSlug: PageSlug): string {
  return `/templates/${templateId}${pageSlug === "/" ? "" : pageSlug}`;
}

export async function renderTemplate(
  spec: SiteSpec,
  pageSlug: PageSlug
): Promise<JSX.Element> {
  const normalizedTemplateId = normalizeTemplateId(spec.templateId);

  if (!normalizedTemplateId) {
    return renderErrorCard(
      "Template Not Supported",
      `Could not resolve templateId '${spec.templateId}'.`,
      [`Supported templates: ${SUPPORTED_TEMPLATES.join(", ")}`]
    );
  }

  const loadRenderer = rendererRegistry[normalizedTemplateId];

  if (!loadRenderer) {
    return renderErrorCard(
      "Renderer Missing",
      `No renderer is registered for '${normalizedTemplateId}'.`,
      [`Supported templates: ${SUPPORTED_TEMPLATES.join(", ")}`]
    );
  }

  try {
    const rendererModule = await loadRenderer();
    const Renderer = rendererModule.default;

    if (typeof Renderer !== "function") {
      return renderErrorCard(
        "Renderer Invalid",
        `Renderer module for '${normalizedTemplateId}' does not export a default component.`
      );
    }

    const normalizedSpec: SiteSpec = {
      ...spec,
      templateId: normalizedTemplateId
    };

    return React.createElement(Renderer, {
      spec: normalizedSpec,
      pageSlug
    }) as JSX.Element;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown renderer error";

    return renderErrorCard(
      "Renderer Failed",
      `Failed to render template '${normalizedTemplateId}'.`,
      [errorMessage]
    );
  }
}
