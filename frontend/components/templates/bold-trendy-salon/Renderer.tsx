"use client";

import type { ReactNode } from "react";
import type { SiteSpec } from "@zencodify/shared";
import ContactSection from "@/components/templates/bold-trendy-salon/ContactSection";
import Footer from "@/components/templates/bold-trendy-salon/Footer";
import GalleryGrid from "@/components/templates/bold-trendy-salon/GalleryGrid";
import Hero from "@/components/templates/bold-trendy-salon/Hero";
import Navbar from "@/components/templates/bold-trendy-salon/Navbar";
import OfferBanner from "@/components/templates/bold-trendy-salon/OfferBanner";
import ReelsStrip from "@/components/templates/bold-trendy-salon/ReelsStrip";
import ServicesGrid from "@/components/templates/bold-trendy-salon/ServicesGrid";
import SocialProofStrip from "@/components/templates/bold-trendy-salon/SocialProofStrip";
import Testimonials from "@/components/templates/bold-trendy-salon/Testimonials";
import TrendingSection from "@/components/templates/bold-trendy-salon/TrendingSection";
import {
  mapBoldTrendySalon,
  type BoldTrendySalonDataLike
} from "@/templates-adapters/bold-trendy-salon";

type PageSlug = "/" | "/about" | "/services" | "/gallery" | "/contact";

type RendererProps = {
  spec: SiteSpec;
  pageSlug: PageSlug;
};

type TemplateShellProps = {
  data: BoldTrendySalonDataLike;
  children: ReactNode;
};

function TemplateShell({ data, children }: TemplateShellProps) {
  const whatsappHref = `https://wa.me/${data.whatsappNumber}`;

  return (
    <div className="min-h-screen bg-[#05040b]">
      <Navbar
        logoText={data.navigation.logoText}
        logoHref={data.navigation.links[0]?.href ?? "/"}
        links={data.navigation.links}
        ctaLabel={data.navigation.ctaLabel}
        ctaHref={whatsappHref}
        mobileMenuAriaLabel={data.navigation.mobileMenuAriaLabel}
      />

      <main>{children}</main>

      <Footer
        brandName={data.brandName}
        tagline={data.footer.tagline}
        links={data.navigation.links}
        phoneNumber={data.phoneNumber}
        whatsappNumber={data.whatsappNumber}
        address={data.address}
        businessHours={data.businessHours}
        social={data.social}
        quickLinksTitle={data.footer.quickLinksTitle}
        contactTitle={data.footer.contactTitle}
        hoursTitle={data.footer.hoursTitle}
        copyright={data.footer.copyright}
      />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(37,211,102,0.45)] transition hover:-translate-y-0.5"
      >
        <span>◉</span>
        <span>{data.navigation.floatingWhatsappLabel}</span>
      </a>
    </div>
  );
}

function AboutFallbackPage({ data }: { data: BoldTrendySalonDataLike }) {
  const whatsappHref = `https://wa.me/${data.whatsappNumber}`;

  return (
    <>
      <section className="relative overflow-hidden bg-[#06050c] py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-[#ff2db31f] blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#7b5cff2a] blur-3xl" />
        <div className="shell-container relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#d6c8ff]">
              {data.about.eyebrow}
            </p>
            <h1 className="font-heading mt-6 text-4xl leading-tight text-white sm:text-6xl">
              {data.about.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg">
              {data.about.subheadline}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#07060f] py-14">
        <div className="shell-container max-w-4xl space-y-4 text-white/75">
          {data.about.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <TrendingSection
        title={data.about.teamTitle}
        subtitle={data.about.teamSubtitle}
        items={data.about.team}
      />

      <TrendingSection
        title={data.about.valuesTitle}
        subtitle={data.about.valuesSubtitle}
        items={data.about.values}
      />

      <section className="bg-[#06050c] py-12 sm:py-16">
        <div className="shell-container">
          <article className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#2c1140] via-[#15163f] to-[#0a2640] p-7 shadow-[0_0_30px_rgba(123,92,255,0.25)] sm:p-9">
            <h2 className="font-heading max-w-3xl text-2xl text-white sm:text-3xl">
              Ready for your next trend-forward look?
            </h2>
            <a
              href={whatsappHref}
              className="luxury-button mt-5 inline-flex rounded-full bg-[#ff4bc4] px-6 text-white hover:bg-[#ff30bc]"
            >
              {data.about.ctaLabel}
            </a>
          </article>
        </div>
      </section>
    </>
  );
}

function HomePage({ data }: { data: BoldTrendySalonDataLike }) {
  return (
    <>
      <Hero
        eyebrow={data.hero.eyebrow}
        headline={data.hero.headline}
        subheadline={data.hero.subheadline}
        primaryCtaLabel={data.hero.primaryCtaLabel}
        primaryCtaHref={data.hero.primaryCtaHref}
        secondaryCtaLabel={data.hero.secondaryCtaLabel}
        secondaryCtaHref={data.hero.secondaryCtaHref}
      />

      <SocialProofStrip title={data.socialProof.title} stats={data.socialProof.stats} />

      <ServicesGrid
        title={data.services.title}
        subtitle={data.services.subtitle}
        categories={data.services.categories}
        items={data.services.items}
        ctaLabel={data.services.ctaLabel}
        ctaHref={data.services.ctaHref}
        maxItems={6}
      />

      <TrendingSection
        title={data.trending.title}
        subtitle={data.trending.subtitle}
        items={data.trending.items}
      />

      <ReelsStrip
        title={data.reels.title}
        subtitle={data.reels.subtitle}
        items={data.reels.items}
      />

      <GalleryGrid
        title={data.gallery.title}
        subtitle={data.gallery.subtitle}
        images={data.gallery.images}
        lightboxCloseLabel={data.gallery.lightboxCloseLabel}
        lightboxPreviousLabel={data.gallery.lightboxPreviousLabel}
        lightboxNextLabel={data.gallery.lightboxNextLabel}
        maxItems={8}
      />

      <Testimonials
        title={data.testimonials.title}
        subtitle={data.testimonials.subtitle}
        items={data.testimonials.items}
      />

      <OfferBanner
        badge={data.offer.badge}
        text={data.offer.text}
        ctaLabel={data.offer.ctaLabel}
        ctaHref={data.offer.ctaHref}
      />

      <ContactSection
        title={data.contact.title}
        subtitle={data.contact.subtitle}
        phoneNumber={data.phoneNumber}
        whatsappNumber={data.whatsappNumber}
        whatsappLabel={data.navigation.ctaLabel}
        address={data.address}
        businessHours={data.businessHours}
        mapPlaceholderTitle={data.contact.mapPlaceholderTitle}
        mapPlaceholderSubtitle={data.contact.mapPlaceholderSubtitle}
        formTitle={data.contact.formTitle}
        formFields={data.contact.formFields}
      />
    </>
  );
}

function ServicesPage({ data }: { data: BoldTrendySalonDataLike }) {
  return (
    <ServicesGrid
      title={data.services.title}
      subtitle={data.services.subtitle}
      categories={data.services.categories}
      items={data.services.items}
      ctaLabel={data.services.ctaLabel}
      ctaHref={data.services.ctaHref}
      showPackages
      packagesTitle={data.services.packagesTitle}
      packagesSubtitle={data.services.packagesSubtitle}
      packages={data.services.packages}
    />
  );
}

function GalleryPage({ data }: { data: BoldTrendySalonDataLike }) {
  return (
    <GalleryGrid
      title={data.gallery.title}
      subtitle={data.gallery.subtitle}
      images={data.gallery.images}
      lightboxCloseLabel={data.gallery.lightboxCloseLabel}
      lightboxPreviousLabel={data.gallery.lightboxPreviousLabel}
      lightboxNextLabel={data.gallery.lightboxNextLabel}
      masonry
    />
  );
}

function ContactPage({ data }: { data: BoldTrendySalonDataLike }) {
  return (
    <ContactSection
      title={data.contact.title}
      subtitle={data.contact.subtitle}
      phoneNumber={data.phoneNumber}
      whatsappNumber={data.whatsappNumber}
      whatsappLabel={data.navigation.ctaLabel}
      address={data.address}
      businessHours={data.businessHours}
      mapPlaceholderTitle={data.contact.mapPlaceholderTitle}
      mapPlaceholderSubtitle={data.contact.mapPlaceholderSubtitle}
      formTitle={data.contact.formTitle}
      formFields={data.contact.formFields}
      showMap
      showForm
    />
  );
}

export default function Renderer({ spec, pageSlug }: RendererProps) {
  const data = mapBoldTrendySalon(spec);

  let content: JSX.Element;
  switch (pageSlug) {
    case "/about":
      content = <AboutFallbackPage data={data} />;
      break;
    case "/services":
      content = <ServicesPage data={data} />;
      break;
    case "/gallery":
      content = <GalleryPage data={data} />;
      break;
    case "/contact":
      content = <ContactPage data={data} />;
      break;
    case "/":
    default:
      content = <HomePage data={data} />;
      break;
  }

  return <TemplateShell data={data}>{content}</TemplateShell>;
}
