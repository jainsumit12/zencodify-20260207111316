import Hero from "@/components/templates/modern-minimal-salon/Hero";
import OfferBanner from "@/components/templates/modern-minimal-salon/OfferBanner";
import TeamSection from "@/components/templates/modern-minimal-salon/TeamSection";
import { ModernMinimalSalonData } from "@/data/templates/modern-minimal-salon";

export default function ModernMinimalSalonAboutPage() {
  return (
    <>
      <Hero
        eyebrow={ModernMinimalSalonData.aboutHero.eyebrow}
        headline={ModernMinimalSalonData.aboutHero.headline}
        subheadline={ModernMinimalSalonData.aboutHero.subheadline}
        primaryCtaLabel={ModernMinimalSalonData.aboutHero.ctaLabel}
        primaryCtaHref={ModernMinimalSalonData.aboutHero.ctaHref}
        secondaryCtaLabel={ModernMinimalSalonData.hero.secondaryCtaLabel}
        secondaryCtaHref={ModernMinimalSalonData.hero.secondaryCtaHref}
        storyParagraphs={ModernMinimalSalonData.aboutHero.story}
        missionTitle={ModernMinimalSalonData.aboutHero.missionTitle}
        missionText={ModernMinimalSalonData.aboutHero.missionText}
        valuesTitle={ModernMinimalSalonData.aboutHero.valuesTitle}
        values={ModernMinimalSalonData.aboutHero.values}
      />

      <TeamSection
        title={ModernMinimalSalonData.team.title}
        subtitle={ModernMinimalSalonData.team.subtitle}
        members={ModernMinimalSalonData.team.members}
      />

      <OfferBanner
        badge={ModernMinimalSalonData.offer.badge}
        text={ModernMinimalSalonData.offer.text}
        ctaLabel={ModernMinimalSalonData.aboutHero.ctaLabel}
        ctaHref={ModernMinimalSalonData.aboutHero.ctaHref}
      />
    </>
  );
}
