"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { MinimalGalleryItem } from "@/data/templates/modern-minimal-salon";

type GalleryGridProps = {
  title: string;
  subtitle: string;
  images: MinimalGalleryItem[];
  lightboxCloseLabel: string;
  lightboxPreviousLabel: string;
  lightboxNextLabel: string;
  masonry?: boolean;
  maxItems?: number;
};

export default function GalleryGrid({
  title,
  subtitle,
  images,
  lightboxCloseLabel,
  lightboxPreviousLabel,
  lightboxNextLabel,
  masonry = false,
  maxItems
}: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const displayImages = useMemo(
    () => (typeof maxItems === "number" ? images.slice(0, maxItems) : images),
    [images, maxItems]
  );

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const goPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }
      return current === 0 ? displayImages.length - 1 : current - 1;
    });
  };

  const goNext = () => {
    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }
      return current === displayImages.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="shell-container">
        <div className="mb-8 max-w-3xl">
          <h2 className="font-heading text-3xl text-[#1d1b22] sm:text-4xl">{title}</h2>
          <p className="mt-4 text-[#5b5363]">{subtitle}</p>
        </div>

        {masonry ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-4">
            {displayImages.map((image, index) => (
              <button
                key={image.id ?? image.url}
                type="button"
                onClick={() => setActiveIndex(index)}
                title={image.caption ?? image.alt ?? "Gallery image"}
                className="mb-4 block w-full overflow-hidden rounded-2xl border border-[#ece7f0]"
              >
                <Image
                  src={image.url}
                  alt={image.alt ?? "Gallery image"}
                  width={900}
                  height={1200}
                  className="h-auto w-full object-cover"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {displayImages.map((image, index) => (
              <button
                key={image.id ?? image.url}
                type="button"
                onClick={() => setActiveIndex(index)}
                title={image.caption ?? image.alt ?? "Gallery image"}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-[#ece7f0]"
              >
                <Image
                  src={image.url}
                  alt={image.alt ?? "Gallery image"}
                  width={900}
                  height={900}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {activeIndex !== null ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1f1824]/90 p-4">
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label={lightboxCloseLabel}
            className="absolute right-6 top-6 text-3xl text-white"
          >
            ×
          </button>

          <button
            type="button"
            onClick={goPrevious}
            aria-label={lightboxPreviousLabel}
            className="absolute left-4 rounded-full bg-white/20 px-3 py-2 text-2xl text-white sm:left-8"
          >
            ‹
          </button>

          <Image
            src={displayImages[activeIndex].url}
            alt={displayImages[activeIndex].alt ?? "Gallery image"}
            width={1700}
            height={1300}
            className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain"
          />
          {displayImages[activeIndex].caption ? (
            <p className="absolute bottom-6 rounded-full bg-black/45 px-4 py-2 text-xs text-white">
              {displayImages[activeIndex].caption}
            </p>
          ) : null}

          <button
            type="button"
            onClick={goNext}
            aria-label={lightboxNextLabel}
            className="absolute right-4 rounded-full bg-white/20 px-3 py-2 text-2xl text-white sm:right-8"
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
