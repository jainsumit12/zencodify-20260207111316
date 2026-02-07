import ContactSection from "@/components/templates/modern-minimal-salon/ContactSection";
import GalleryGrid from "@/components/templates/modern-minimal-salon/GalleryGrid";
import Hero from "@/components/templates/modern-minimal-salon/Hero";
import OfferBanner from "@/components/templates/modern-minimal-salon/OfferBanner";
import ServicesGrid from "@/components/templates/modern-minimal-salon/ServicesGrid";
import TeamSection from "@/components/templates/modern-minimal-salon/TeamSection";
import Testimonials from "@/components/templates/modern-minimal-salon/Testimonials";
import TrustStrip from "@/components/templates/modern-minimal-salon/TrustStrip";
import { ModernMinimalSalonData } from "@/data/templates/modern-minimal-salon";

export default function ModernMinimalSalonHomePage() {
  return (
    <>
      <Hero
        eyebrow={ModernMinimalSalonData.hero.eyebrow}
        headline={ModernMinimalSalonData.hero.headline}
        subheadline={ModernMinimalSalonData.hero.subheadline}
        primaryCtaLabel={ModernMinimalSalonData.hero.primaryCtaLabel}
        primaryCtaHref={ModernMinimalSalonData.hero.primaryCtaHref}
        secondaryCtaLabel={ModernMinimalSalonData.hero.secondaryCtaLabel}
        secondaryCtaHref={ModernMinimalSalonData.hero.secondaryCtaHref}
        imageUrl={ModernMinimalSalonData.hero.backgroundImageUrl}
        imageAlt={ModernMinimalSalonData.hero.headline}
      />

      <TrustStrip title={ModernMinimalSalonData.trustStrip.title} stats={ModernMinimalSalonData.trustStrip.stats} />

      <ServicesGrid
        title={ModernMinimalSalonData.services.title}
        subtitle={ModernMinimalSalonData.services.subtitle}
        categories={ModernMinimalSalonData.services.categories}
        items={ModernMinimalSalonData.services.items}
        ctaLabel={ModernMinimalSalonData.services.ctaLabel}
        ctaHref={ModernMinimalSalonData.services.ctaHref}
        maxItems={6}
      />

      <TeamSection
        title={ModernMinimalSalonData.team.title}
        subtitle={ModernMinimalSalonData.team.subtitle}
        members={ModernMinimalSalonData.team.members}
      />

      <GalleryGrid
        title={ModernMinimalSalonData.gallery.title}
        subtitle={ModernMinimalSalonData.gallery.subtitle}
        images={ModernMinimalSalonData.gallery.images}
        lightboxCloseLabel={ModernMinimalSalonData.gallery.lightboxCloseLabel}
        lightboxPreviousLabel={ModernMinimalSalonData.gallery.lightboxPreviousLabel}
        lightboxNextLabel={ModernMinimalSalonData.gallery.lightboxNextLabel}
        maxItems={8}
      />

      <Testimonials
        title={ModernMinimalSalonData.testimonials.title}
        subtitle={ModernMinimalSalonData.testimonials.subtitle}
        items={ModernMinimalSalonData.testimonials.items}
      />

      <OfferBanner
        badge={ModernMinimalSalonData.offer.badge}
        text={ModernMinimalSalonData.offer.text}
        ctaLabel={ModernMinimalSalonData.offer.ctaLabel}
        ctaHref={ModernMinimalSalonData.offer.ctaHref}
      />

      <ContactSection
        title={ModernMinimalSalonData.contact.title}
        subtitle={ModernMinimalSalonData.contact.subtitle}
        phoneNumber={ModernMinimalSalonData.phoneNumber}
        whatsappNumber={ModernMinimalSalonData.whatsappNumber}
        whatsappLabel={ModernMinimalSalonData.navigation.floatingWhatsappLabel}
        address={ModernMinimalSalonData.address}
        businessHours={ModernMinimalSalonData.businessHours}
        mapPlaceholderTitle={ModernMinimalSalonData.contact.mapPlaceholderTitle}
        mapPlaceholderSubtitle={ModernMinimalSalonData.contact.mapPlaceholderSubtitle}
        formTitle={ModernMinimalSalonData.contact.formTitle}
        formFields={ModernMinimalSalonData.contact.formFields}
      />
    </>
  );
}
