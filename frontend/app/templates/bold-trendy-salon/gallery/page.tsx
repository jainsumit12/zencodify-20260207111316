import GalleryGrid from "@/components/templates/bold-trendy-salon/GalleryGrid";
import { BoldTrendySalonData } from "@/data/templates/bold-trendy-salon";

export default function BoldTrendySalonGalleryPage() {
  return (
    <GalleryGrid
      title={BoldTrendySalonData.gallery.title}
      subtitle={BoldTrendySalonData.gallery.subtitle}
      images={BoldTrendySalonData.gallery.images}
      lightboxCloseLabel={BoldTrendySalonData.gallery.lightboxCloseLabel}
      lightboxPreviousLabel={BoldTrendySalonData.gallery.lightboxPreviousLabel}
      lightboxNextLabel={BoldTrendySalonData.gallery.lightboxNextLabel}
      masonry
    />
  );
}
