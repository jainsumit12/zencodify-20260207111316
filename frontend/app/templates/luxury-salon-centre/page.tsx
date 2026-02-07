import ContactSection from "@/components/templates/luxury-salon-centre/ContactSection";
import FeatureSection from "@/components/templates/luxury-salon-centre/FeatureSection";
import GalleryGrid from "@/components/templates/luxury-salon-centre/GalleryGrid";
import Hero from "@/components/templates/luxury-salon-centre/Hero";
import OfferBanner from "@/components/templates/luxury-salon-centre/OfferBanner";
import ServicesGrid from "@/components/templates/luxury-salon-centre/ServicesGrid";
import Testimonials from "@/components/templates/luxury-salon-centre/Testimonials";
import TrustStrip from "@/components/templates/luxury-salon-centre/TrustStrip";
import { LuxurySalonCentreData } from "@/data/templates/luxury-salon-centre";

export default function LuxurySalonCentreHomePage() {
  return (
    <>
      <Hero
        eyebrow={LuxurySalonCentreData.hero.eyebrow}
        headline={LuxurySalonCentreData.hero.headline}
        subheadline={LuxurySalonCentreData.hero.subheadline}
        backgroundImageUrl={LuxurySalonCentreData.hero.backgroundImageUrl}
        primaryCtaLabel={LuxurySalonCentreData.hero.primaryCtaLabel}
        primaryCtaHref={LuxurySalonCentreData.hero.primaryCtaHref}
        secondaryCtaLabel={LuxurySalonCentreData.hero.secondaryCtaLabel}
        secondaryCtaHref={LuxurySalonCentreData.hero.secondaryCtaHref}
      />

      <TrustStrip
        headline={LuxurySalonCentreData.trustStrip.headline}
        stats={LuxurySalonCentreData.trustStrip.stats}
      />

      <ServicesGrid
        headline={LuxurySalonCentreData.services.headline}
        subheadline={LuxurySalonCentreData.services.subheadline}
        categories={LuxurySalonCentreData.services.categories}
        items={LuxurySalonCentreData.services.items}
        primaryCtaLabel={LuxurySalonCentreData.services.primaryCtaLabel}
        primaryCtaHref={LuxurySalonCentreData.services.primaryCtaHref}
        maxItems={6}
      />

      <FeatureSection
        eyebrow={LuxurySalonCentreData.feature.eyebrow}
        title={LuxurySalonCentreData.feature.title}
        description={LuxurySalonCentreData.feature.description}
        bullets={LuxurySalonCentreData.feature.bullets}
        imageUrl={LuxurySalonCentreData.feature.imageUrl}
        imageAlt={LuxurySalonCentreData.feature.imageAlt}
        ctaLabel={LuxurySalonCentreData.feature.ctaLabel}
        ctaHref={LuxurySalonCentreData.feature.ctaHref}
      />

      <GalleryGrid
        headline={LuxurySalonCentreData.gallery.headline}
        subheadline={LuxurySalonCentreData.gallery.subheadline}
        images={LuxurySalonCentreData.gallery.images}
        lightboxCloseLabel={LuxurySalonCentreData.gallery.lightboxCloseLabel}
        lightboxPreviousLabel={LuxurySalonCentreData.gallery.lightboxPreviousLabel}
        lightboxNextLabel={LuxurySalonCentreData.gallery.lightboxNextLabel}
        maxItems={8}
      />

      <Testimonials
        headline={LuxurySalonCentreData.testimonials.headline}
        subheadline={LuxurySalonCentreData.testimonials.subheadline}
        items={LuxurySalonCentreData.testimonials.items}
      />

      <OfferBanner
        badge={LuxurySalonCentreData.offer.badge}
        text={LuxurySalonCentreData.offer.text}
        ctaLabel={LuxurySalonCentreData.offer.ctaLabel}
        ctaHref={LuxurySalonCentreData.offer.ctaHref}
      />

      <ContactSection
        headline={LuxurySalonCentreData.contact.headline}
        subheadline={LuxurySalonCentreData.contact.subheadline}
        phoneNumber={LuxurySalonCentreData.phoneNumber}
        whatsappNumber={LuxurySalonCentreData.whatsappNumber}
        whatsappLabel={LuxurySalonCentreData.navigation.ctaLabel}
        address={LuxurySalonCentreData.address}
        businessHours={LuxurySalonCentreData.businessHours}
        mapPlaceholderTitle={LuxurySalonCentreData.contact.mapPlaceholderTitle}
        mapPlaceholderSubtitle={LuxurySalonCentreData.contact.mapPlaceholderSubtitle}
        formTitle={LuxurySalonCentreData.contact.formTitle}
        formFields={LuxurySalonCentreData.contact.formFields}
      />
    </>
  );
}
