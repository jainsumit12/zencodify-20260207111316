import Hero from "@/components/templates/bold-trendy-salon/Hero";
import OfferBanner from "@/components/templates/bold-trendy-salon/OfferBanner";
import TrendingSection from "@/components/templates/bold-trendy-salon/TrendingSection";
import { BoldTrendySalonData } from "@/data/templates/bold-trendy-salon";

export default function BoldTrendySalonAboutPage() {
  return (
    <>
      <Hero
        eyebrow={BoldTrendySalonData.about.eyebrow}
        headline={BoldTrendySalonData.about.headline}
        subheadline={BoldTrendySalonData.about.subheadline}
        primaryCtaLabel={BoldTrendySalonData.about.ctaLabel}
        primaryCtaHref={BoldTrendySalonData.about.ctaHref}
        secondaryCtaLabel={BoldTrendySalonData.hero.secondaryCtaLabel}
        secondaryCtaHref={BoldTrendySalonData.hero.secondaryCtaHref}
      />

      <section className="bg-[#07060f] py-14">
        <div className="shell-container max-w-3xl space-y-4 text-white/75">
          {BoldTrendySalonData.about.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <TrendingSection
        title={BoldTrendySalonData.about.teamTitle}
        subtitle={BoldTrendySalonData.about.teamSubtitle}
        items={BoldTrendySalonData.about.team}
      />

      <TrendingSection
        title={BoldTrendySalonData.about.valuesTitle}
        subtitle={BoldTrendySalonData.about.valuesSubtitle}
        items={BoldTrendySalonData.about.values}
      />

      <OfferBanner
        badge={BoldTrendySalonData.offer.badge}
        text={BoldTrendySalonData.offer.text}
        ctaLabel={BoldTrendySalonData.about.ctaLabel}
        ctaHref={BoldTrendySalonData.about.ctaHref}
      />
    </>
  );
}
