import type { SiteSection, SiteSpec } from "@zencodify/shared";

type SocialLinksInput = {
  website?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  x?: string;
  googleMaps?: string;
};

export type AdminSpecPatchInput = {
  logoUrl?: string;
  coverImageUrl?: string;
  galleryImageUrls?: string[];
  social?: SocialLinksInput;
};

type GalleryImageObject = {
  url: string;
  alt: string;
  caption: string;
};

const GALLERY_PAGE_SLUGS = ["/", "/gallery"] as const;

function cloneSpec(spec: SiteSpec): SiteSpec {
  if (typeof structuredClone === "function") {
    return structuredClone(spec);
  }

  return JSON.parse(JSON.stringify(spec)) as SiteSpec;
}

function cleanOptionalString(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

function toGalleryImageObjects(urls: string[]): GalleryImageObject[] {
  return urls
    .map((url) => url.trim())
    .filter((url) => url.length > 0)
    .map((url) => ({
      url,
      alt: "",
      caption: ""
    }));
}

function toSocialLinks(
  social: SocialLinksInput | undefined
): SiteSpec["social"] | undefined {
  if (!social) {
    return undefined;
  }

  const links: SiteSpec["social"] = {
    website: cleanOptionalString(social.website),
    instagram: cleanOptionalString(social.instagram),
    facebook: cleanOptionalString(social.facebook),
    youtube: cleanOptionalString(social.youtube),
    linkedin: cleanOptionalString(social.linkedin),
    x: cleanOptionalString(social.x),
    googleMaps: cleanOptionalString(social.googleMaps)
  };

  const hasAnyValue = Object.values(links).some((value) => Boolean(value));
  return hasAnyValue ? links : undefined;
}

function replaceGallerySections(
  page: SiteSpec["pages"][number],
  images: GalleryImageObject[]
): boolean {
  let replaced = false;

  page.sections = page.sections.map((section) => {
    if (section.type !== "gallery") {
      return section;
    }

    replaced = true;
    return {
      ...section,
      images: images.map((image) => ({ ...image }))
    };
  });

  return replaced;
}

function createGallerySection(images: GalleryImageObject[]): SiteSection {
  return {
    type: "gallery",
    title: "Gallery",
    layout: "grid",
    images: images.map((image) => ({ ...image }))
  };
}

export function patchGeneratedSpec(
  spec: SiteSpec,
  input: AdminSpecPatchInput
): SiteSpec {
  const clonedSpec = cloneSpec(spec);

  const logoUrl = cleanOptionalString(input.logoUrl);
  if (logoUrl) {
    clonedSpec.business.logoUrl = logoUrl;
  }

  const coverImageUrl = cleanOptionalString(input.coverImageUrl);
  if (coverImageUrl) {
    clonedSpec.business.coverImageUrl = coverImageUrl;
  }

  const socialLinks = toSocialLinks(input.social);
  if (socialLinks) {
    clonedSpec.social = socialLinks;
  }

  const galleryImages = toGalleryImageObjects(input.galleryImageUrls ?? []);
  if (galleryImages.length === 0) {
    return clonedSpec;
  }

  let replacedExistingGallery = false;

  for (const slug of GALLERY_PAGE_SLUGS) {
    const page = clonedSpec.pages.find((entry) => entry.slug === slug);
    if (!page) {
      continue;
    }

    if (replaceGallerySections(page, galleryImages)) {
      replacedExistingGallery = true;
    }
  }

  if (!replacedExistingGallery) {
    const targetPage =
      clonedSpec.pages.find((entry) => entry.slug === "/gallery") ??
      clonedSpec.pages.find((entry) => entry.slug === "/");

    if (targetPage) {
      targetPage.sections.push(createGallerySection(galleryImages));
    }
  }

  return clonedSpec;
}
