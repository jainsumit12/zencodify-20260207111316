import GalleryGrid from "@/components/templates/luxury-salon-centre/GalleryGrid";
import { LuxurySalonCentreData } from "@/data/templates/luxury-salon-centre";

export default function LuxurySalonCentreGalleryPage() {
  return (
    <GalleryGrid
      headline={LuxurySalonCentreData.gallery.headline}
      subheadline={LuxurySalonCentreData.gallery.subheadline}
      images={LuxurySalonCentreData.gallery.images}
      lightboxCloseLabel={LuxurySalonCentreData.gallery.lightboxCloseLabel}
      lightboxPreviousLabel={LuxurySalonCentreData.gallery.lightboxPreviousLabel}
      lightboxNextLabel={LuxurySalonCentreData.gallery.lightboxNextLabel}
      masonry
    />
  );
}
