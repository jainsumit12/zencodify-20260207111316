import OfferBanner from "@/components/templates/luxury-salon-centre/OfferBanner";
import ServicesGrid from "@/components/templates/luxury-salon-centre/ServicesGrid";
import { LuxurySalonCentreData } from "@/data/templates/luxury-salon-centre";

export default function LuxurySalonCentreServicesPage() {
  return (
    <>
      <ServicesGrid
        headline={LuxurySalonCentreData.services.headline}
        subheadline={LuxurySalonCentreData.services.subheadline}
        categories={LuxurySalonCentreData.services.categories}
        items={LuxurySalonCentreData.services.items}
        primaryCtaLabel={LuxurySalonCentreData.services.primaryCtaLabel}
        primaryCtaHref={LuxurySalonCentreData.services.primaryCtaHref}
      />

      <OfferBanner
        badge={LuxurySalonCentreData.offer.badge}
        text={LuxurySalonCentreData.offer.text}
        ctaLabel={LuxurySalonCentreData.offer.ctaLabel}
        ctaHref={LuxurySalonCentreData.offer.ctaHref}
      />
    </>
  );
}
