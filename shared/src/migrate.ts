type AnyRecord = Record<string, unknown>;

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null;
}

function migrateSection(section: unknown): void {
  if (!isRecord(section)) {
    return;
  }

  if (
    (section.type === "gallery" || section.type === "images") &&
    Array.isArray(section.images) &&
    section.images.every((item) => typeof item === "string")
  ) {
    section.images = (section.images as string[]).map((url) => ({ url }));
  }
}

export function migrateGalleryStringsToImages(spec: unknown): unknown {
  if (!isRecord(spec) || !Array.isArray(spec.pages)) {
    return spec;
  }

  spec.pages.forEach((page) => {
    if (!isRecord(page) || !Array.isArray(page.sections)) {
      return;
    }
    page.sections.forEach((section) => migrateSection(section));
  });

  return spec;
}
