import GalleryGrid from "@/components/templates/modern-minimal-salon/GalleryGrid";
import { ModernMinimalSalonData } from "@/data/templates/modern-minimal-salon";

export default function ModernMinimalSalonGalleryPage() {
  return (
    <GalleryGrid
      title={ModernMinimalSalonData.gallery.title}
      subtitle={ModernMinimalSalonData.gallery.subtitle}
      images={ModernMinimalSalonData.gallery.images}
      lightboxCloseLabel={ModernMinimalSalonData.gallery.lightboxCloseLabel}
      lightboxPreviousLabel={ModernMinimalSalonData.gallery.lightboxPreviousLabel}
      lightboxNextLabel={ModernMinimalSalonData.gallery.lightboxNextLabel}
      masonry
    />
  );
}
