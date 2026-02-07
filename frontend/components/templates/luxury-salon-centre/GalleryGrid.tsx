"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { GalleryItem } from "@/data/templates/luxury-salon-centre";

type GalleryGridProps = {
  headline: string;
  subheadline: string;
  images: GalleryItem[];
  lightboxCloseLabel: string;
  lightboxPreviousLabel: string;
  lightboxNextLabel: string;
  masonry?: boolean;
  maxItems?: number;
};

export default function GalleryGrid({
  headline,
  subheadline,
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
        <div className="mb-10 max-w-3xl">
          <h2 className="font-heading text-3xl text-luxury-base sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-luxury-base/75">{subheadline}</p>
        </div>

        {masonry ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-4">
            {displayImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group mb-4 block w-full overflow-hidden rounded-card"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={900}
                  height={1200}
                  className="h-auto w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {displayImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative aspect-square overflow-hidden rounded-card"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-luxury-base/0 transition group-hover:bg-luxury-base/20" />
              </button>
            ))}
          </div>
        )}
      </div>

      {activeIndex !== null ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-luxury-base/90 p-4">
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
            className="absolute left-4 rounded-full bg-white/10 px-3 py-2 text-2xl text-white backdrop-blur sm:left-8"
          >
            ‹
          </button>

          <Image
            src={displayImages[activeIndex].src}
            alt={displayImages[activeIndex].alt}
            width={1800}
            height={1400}
            className="max-h-[85vh] w-auto max-w-full rounded-card object-contain"
          />

          <button
            type="button"
            onClick={goNext}
            aria-label={lightboxNextLabel}
            className="absolute right-4 rounded-full bg-white/10 px-3 py-2 text-2xl text-white backdrop-blur sm:right-8"
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
