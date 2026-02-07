import AboutBlock from "@/components/templates/luxury-salon-centre/AboutBlock";
import OfferBanner from "@/components/templates/luxury-salon-centre/OfferBanner";
import { LuxurySalonCentreData } from "@/data/templates/luxury-salon-centre";

export default function LuxurySalonCentreAboutPage() {
  return (
    <>
      <AboutBlock
        headline={LuxurySalonCentreData.about.headline}
        subheadline={LuxurySalonCentreData.about.subheadline}
        ownerName={LuxurySalonCentreData.about.ownerName}
        ownerRole={LuxurySalonCentreData.about.ownerRole}
        ownerImageUrl={LuxurySalonCentreData.about.ownerImageUrl}
        ownerImageAlt={LuxurySalonCentreData.about.ownerImageAlt}
        story={LuxurySalonCentreData.about.story}
        trustPoints={LuxurySalonCentreData.about.trustPoints}
        ctaLabel={LuxurySalonCentreData.about.ctaLabel}
        ctaHref={LuxurySalonCentreData.about.ctaHref}
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
