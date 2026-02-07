import ContactSection from "@/components/templates/bold-trendy-salon/ContactSection";
import GalleryGrid from "@/components/templates/bold-trendy-salon/GalleryGrid";
import Hero from "@/components/templates/bold-trendy-salon/Hero";
import OfferBanner from "@/components/templates/bold-trendy-salon/OfferBanner";
import ReelsStrip from "@/components/templates/bold-trendy-salon/ReelsStrip";
import ServicesGrid from "@/components/templates/bold-trendy-salon/ServicesGrid";
import SocialProofStrip from "@/components/templates/bold-trendy-salon/SocialProofStrip";
import Testimonials from "@/components/templates/bold-trendy-salon/Testimonials";
import TrendingSection from "@/components/templates/bold-trendy-salon/TrendingSection";
import { BoldTrendySalonData } from "@/data/templates/bold-trendy-salon";

export default function BoldTrendySalonHomePage() {
  return (
    <>
      <Hero
        eyebrow={BoldTrendySalonData.hero.eyebrow}
        headline={BoldTrendySalonData.hero.headline}
        subheadline={BoldTrendySalonData.hero.subheadline}
        primaryCtaLabel={BoldTrendySalonData.hero.primaryCtaLabel}
        primaryCtaHref={BoldTrendySalonData.hero.primaryCtaHref}
        secondaryCtaLabel={BoldTrendySalonData.hero.secondaryCtaLabel}
        secondaryCtaHref={BoldTrendySalonData.hero.secondaryCtaHref}
      />

      <SocialProofStrip title={BoldTrendySalonData.socialProof.title} stats={BoldTrendySalonData.socialProof.stats} />

      <ServicesGrid
        title={BoldTrendySalonData.services.title}
        subtitle={BoldTrendySalonData.services.subtitle}
        categories={BoldTrendySalonData.services.categories}
        items={BoldTrendySalonData.services.items}
        ctaLabel={BoldTrendySalonData.services.ctaLabel}
        ctaHref={BoldTrendySalonData.services.ctaHref}
        maxItems={6}
      />

      <TrendingSection
        title={BoldTrendySalonData.trending.title}
        subtitle={BoldTrendySalonData.trending.subtitle}
        items={BoldTrendySalonData.trending.items}
      />

      <ReelsStrip
        title={BoldTrendySalonData.reels.title}
        subtitle={BoldTrendySalonData.reels.subtitle}
        items={BoldTrendySalonData.reels.items}
      />

      <GalleryGrid
        title={BoldTrendySalonData.gallery.title}
        subtitle={BoldTrendySalonData.gallery.subtitle}
        images={BoldTrendySalonData.gallery.images}
        lightboxCloseLabel={BoldTrendySalonData.gallery.lightboxCloseLabel}
        lightboxPreviousLabel={BoldTrendySalonData.gallery.lightboxPreviousLabel}
        lightboxNextLabel={BoldTrendySalonData.gallery.lightboxNextLabel}
        maxItems={8}
      />

      <Testimonials
        title={BoldTrendySalonData.testimonials.title}
        subtitle={BoldTrendySalonData.testimonials.subtitle}
        items={BoldTrendySalonData.testimonials.items}
      />

      <OfferBanner
        badge={BoldTrendySalonData.offer.badge}
        text={BoldTrendySalonData.offer.text}
        ctaLabel={BoldTrendySalonData.offer.ctaLabel}
        ctaHref={BoldTrendySalonData.offer.ctaHref}
      />

      <ContactSection
        title={BoldTrendySalonData.contact.title}
        subtitle={BoldTrendySalonData.contact.subtitle}
        phoneNumber={BoldTrendySalonData.phoneNumber}
        whatsappNumber={BoldTrendySalonData.whatsappNumber}
        whatsappLabel={BoldTrendySalonData.navigation.ctaLabel}
        address={BoldTrendySalonData.address}
        businessHours={BoldTrendySalonData.businessHours}
        mapPlaceholderTitle={BoldTrendySalonData.contact.mapPlaceholderTitle}
        mapPlaceholderSubtitle={BoldTrendySalonData.contact.mapPlaceholderSubtitle}
        formTitle={BoldTrendySalonData.contact.formTitle}
        formFields={BoldTrendySalonData.contact.formFields}
      />
    </>
  );
}
