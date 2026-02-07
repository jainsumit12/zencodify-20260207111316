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

const rendererRegistry: Record<TemplateId, () => Promise<RendererModule>> = {
  "luxury-salon-centre": () =>
    import("@/components/templates/luxury-salon-centre/Renderer"),
  "modern-minimal-salon": () =>
    import("@/components/templates/modern-minimal-salon/Renderer"),
  "bold-trendy-salon": () => import("@/components/templates/bold-trendy-salon/Renderer")
};

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
  const templateId = spec.templateId as TemplateId;
  const loadRenderer = rendererRegistry[templateId];

  if (!loadRenderer) {
    return React.createElement(
      "div",
      {
        className: "rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700"
      },
      `No renderer registered for templateId '${spec.templateId}'.`
    ) as JSX.Element;
  }

  const module = await loadRenderer();
  const Renderer = module.default;
  return React.createElement(Renderer, { spec, pageSlug }) as JSX.Element;
}
