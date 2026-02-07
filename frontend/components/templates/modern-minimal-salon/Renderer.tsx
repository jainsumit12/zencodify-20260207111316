"use client";

import type { SiteSection, SiteSpec } from "@zencodify/shared";
import ContactSection from "@/components/templates/modern-minimal-salon/ContactSection";
import Footer from "@/components/templates/modern-minimal-salon/Footer";
import GalleryGrid from "@/components/templates/modern-minimal-salon/GalleryGrid";
import Hero from "@/components/templates/modern-minimal-salon/Hero";
import Navbar from "@/components/templates/modern-minimal-salon/Navbar";
import OfferBanner from "@/components/templates/modern-minimal-salon/OfferBanner";
import ServicesGrid from "@/components/templates/modern-minimal-salon/ServicesGrid";
import TeamSection from "@/components/templates/modern-minimal-salon/TeamSection";
import Testimonials from "@/components/templates/modern-minimal-salon/Testimonials";
import TrustStrip from "@/components/templates/modern-minimal-salon/TrustStrip";
import type {
  MinimalGalleryItem,
  MinimalNavItem,
  MinimalPackage,
  MinimalServiceItem,
  MinimalSocialLinks,
  MinimalStat,
  MinimalTeamMember,
  MinimalTestimonialItem
} from "@/data/templates/modern-minimal-salon";

type PageSlug = "/" | "/about" | "/services" | "/gallery" | "/contact";

type RendererProps = {
  spec: SiteSpec;
  pageSlug: PageSlug;
};

type SitePage = SiteSpec["pages"][number];

const FALLBACK_GALLERY_IMAGE =
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80";

const DEFAULT_FORM_FIELDS = {
  nameLabel: "Name",
  emailLabel: "Email",
  phoneLabel: "Phone",
  messageLabel: "Message",
  submitLabel: "Send Request",
  successToast: "Request submitted successfully."
};

function sanitizeWhatsapp(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.length > 0 ? digits : value;
}

function findPage(spec: SiteSpec, slug: SitePage["slug"]): SitePage | undefined {
  return spec.pages.find((page) => page.slug === slug);
}

function findSection<TType extends SiteSection["type"]>(
  page: SitePage | undefined,
  type: TType
): Extract<SiteSection, { type: TType }> | undefined {
  return page?.sections.find(
    (section): section is Extract<SiteSection, { type: TType }> => section.type === type
  );
}

function extractHours(spec: SiteSpec): string[] {
  const contactDescriptions = spec.pages
    .flatMap((page) =>
      page.sections.filter(
        (section): section is Extract<SiteSection, { type: "contact" }> =>
          section.type === "contact"
      )
    )
    .map((section) => section.description)
    .filter((description): description is string => Boolean(description));

  const parsed = contactDescriptions
    .flatMap((description) => description.split(/\r?\n|\|/g))
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && /(mon|tue|wed|thu|fri|sat|sun|am|pm|\d)/i.test(line));

  if (parsed.length > 0) {
    return parsed;
  }

  return ["Mon-Sat: 10:00 AM - 8:00 PM", "Sun: 11:00 AM - 6:00 PM"];
}

function inferCategory(name: string): MinimalServiceItem["category"] {
  const lower = name.toLowerCase();

  if (lower.includes("makeup") || lower.includes("bridal")) {
    return "Makeup";
  }

  if (lower.includes("nail")) {
    return "Nails";
  }

  if (
    lower.includes("skin") ||
    lower.includes("facial") ||
    lower.includes("detan") ||
    lower.includes("glow")
  ) {
    return "Skin";
  }

  if (
    lower.includes("color") ||
    lower.includes("colour") ||
    lower.includes("balayage") ||
    lower.includes("highlights")
  ) {
    return "Color";
  }

  return "Hair";
}

function inferDuration(category: MinimalServiceItem["category"]): string {
  switch (category) {
    case "Color":
      return "120 min";
    case "Skin":
      return "75 min";
    case "Nails":
      return "90 min";
    case "Makeup":
      return "110 min";
    case "Hair":
    default:
      return "60 min";
  }
}

function mapServices(section: Extract<SiteSection, { type: "services" }> | undefined): MinimalServiceItem[] {
  if (!section) {
    return [];
  }

  return section.items.map((item, index) => {
    const category = inferCategory(item.name);

    return {
      id: `svc-${index + 1}`,
      category,
      name: item.name,
      description: item.description ?? "Premium service tailored to your beauty goals.",
      price: item.price ?? "₹1,999",
      duration: inferDuration(category)
    };
  });
}

function mapCategories(items: MinimalServiceItem[]): string[] {
  return Array.from(new Set(items.map((item) => item.category)));
}

function mapTrustStats(section: Extract<SiteSection, { type: "trust_strip" }> | undefined): MinimalStat[] {
  if (!section || section.items.length === 0) {
    return [
      { label: "Average Rating", value: "4.9/5" },
      { label: "Clients Served", value: "8,500+" },
      { label: "Years in Beauty", value: "10+" }
    ];
  }

  const fallbackLabels = ["Average Rating", "Clients Served", "Years in Beauty"];

  return section.items.slice(0, 3).map((item, index) => {
    const pair = item.includes(":") ? item.split(":") : [];

    if (pair.length === 2) {
      return {
        label: pair[0].trim() || fallbackLabels[index] || `Stat ${index + 1}`,
        value: pair[1].trim() || item
      };
    }

    return {
      label: fallbackLabels[index] || `Stat ${index + 1}`,
      value: item
    };
  });
}

function mapGallery(section: Extract<SiteSection, { type: "gallery" }> | undefined): MinimalGalleryItem[] {
  if (!section || section.images.length === 0) {
    return [
      {
        id: "gallery-fallback-1",
        url: FALLBACK_GALLERY_IMAGE,
        alt: "Salon interior"
      }
    ];
  }

  return section.images.map((image, index) => ({
    id: `gallery-${index + 1}`,
    url: image.url,
    alt: image.alt,
    caption: image.caption
  }));
}

function mapTestimonials(
  section: Extract<SiteSection, { type: "testimonials" }> | undefined
): MinimalTestimonialItem[] {
  if (!section || section.items.length === 0) {
    return [];
  }

  return section.items.map((item, index) => ({
    id: `testimonial-${index + 1}`,
    name: item.name,
    rating: 5,
    text: item.quote
  }));
}

function mapTeamMembers(
  businessName: string,
  galleryImages: MinimalGalleryItem[],
  testimonials: MinimalTestimonialItem[]
): MinimalTeamMember[] {
  const names = testimonials.map((item) => item.name);

  const fallbackNames = [`${businessName} Team Lead`, "Senior Stylist", "Beauty Specialist"];
  const fallbackRoles = ["Creative Director", "Hair & Color Expert", "Skin & Makeup Artist"];

  return Array.from({ length: 3 }).map((_, index) => ({
    id: `team-${index + 1}`,
    name: names[index] || fallbackNames[index] || `Team Member ${index + 1}`,
    role: fallbackRoles[index] || "Beauty Expert",
    image: galleryImages[index]?.url || FALLBACK_GALLERY_IMAGE
  }));
}

function mapPackages(items: MinimalServiceItem[], ctaHref: string): MinimalPackage[] {
  const labels = ["Essential Care", "Signature Glow", "Event Ready"];

  return Array.from({ length: 3 }).map((_, index) => {
    const start = index * 2;
    const selectedItems = items.slice(start, start + 2);
    const inclusions = selectedItems.map((item) => item.name);

    return {
      id: `package-${index + 1}`,
      name: labels[index],
      subtitle: "Curated Package",
      price: `₹${(index + 4) * 1000}`,
      inclusions: inclusions.length > 0 ? inclusions : ["Consultation", "Premium Service"],
      ctaLabel: "Book Package",
      ctaHref
    };
  });
}

function splitAboutContent(content: string | undefined): string[] {
  if (!content) {
    return [];
  }

  const paragraphs = content
    .split(/\n\n|\r\n\r\n/g)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  if (paragraphs.length > 0) {
    return paragraphs;
  }

  return content
    .split(/\r?\n/g)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function buildNavLinks(): MinimalNavItem[] {
  const base = "/templates/modern-minimal-salon";

  return [
    { label: "Home", href: base },
    { label: "About", href: `${base}/about` },
    { label: "Services", href: `${base}/services` },
    { label: "Gallery", href: `${base}/gallery` },
    { label: "Contact", href: `${base}/contact` }
  ];
}

export default function Renderer({ spec, pageSlug }: RendererProps) {
  const homePage = findPage(spec, "/") ?? spec.pages[0];
  const page = findPage(spec, pageSlug) ?? homePage;
  const aboutPage = findPage(spec, "/about") ?? homePage;
  const servicesPage = findPage(spec, "/services") ?? homePage;
  const galleryPage = findPage(spec, "/gallery") ?? homePage;
  const contactPage = findPage(spec, "/contact") ?? homePage;

  const homeHeroSection = findSection(homePage, "hero");
  const homeTrustSection = findSection(homePage, "trust_strip");
  const homeServicesSection = findSection(homePage, "services") ?? findSection(servicesPage, "services");
  const homeGallerySection = findSection(homePage, "gallery") ?? findSection(galleryPage, "gallery");
  const homeTestimonialsSection = findSection(homePage, "testimonials");
  const homeOfferSection = findSection(homePage, "offer_banner");
  const homeContactSection = findSection(homePage, "contact") ?? findSection(contactPage, "contact");

  const aboutSection = findSection(aboutPage, "about");
  const aboutTestimonialsSection = findSection(aboutPage, "testimonials") ?? homeTestimonialsSection;

  const servicesSection = findSection(servicesPage, "services") ?? homeServicesSection;
  const gallerySection = findSection(galleryPage, "gallery") ?? homeGallerySection;
  const contactSection = findSection(contactPage, "contact") ?? homeContactSection;

  const servicesItems = mapServices(servicesSection);
  const galleryImages = mapGallery(gallerySection);
  const testimonialsItems = mapTestimonials(homeTestimonialsSection);
  const aboutTestimonials = mapTestimonials(aboutTestimonialsSection);
  const categories = mapCategories(servicesItems);
  const stats = mapTrustStats(homeTrustSection);
  const businessHours = extractHours(spec);
  const whatsappNumber = sanitizeWhatsapp(spec.business.whatsapp);
  const navLinks = buildNavLinks();

  const social: MinimalSocialLinks | undefined = spec.social
    ? {
        website: spec.social.website,
        instagram: spec.social.instagram,
        facebook: spec.social.facebook,
        youtube: spec.social.youtube,
        linkedin: spec.social.linkedin,
        x: spec.social.x,
        googleMaps: spec.social.googleMaps
      }
    : undefined;

  const aboutParagraphs = splitAboutContent(aboutSection?.content);
  const aboutValues =
    homeTrustSection?.items.slice(0, 3).length
      ? homeTrustSection.items.slice(0, 3)
      : ["Client-first care", "Consistent quality", "Modern beauty expertise"];

  const commonShell = (children: JSX.Element) => (
    <div className="min-h-screen bg-[#fffdfd]">
      <Navbar
        logoText={spec.business.name}
        logoHref={navLinks[0]?.href ?? "/"}
        links={navLinks}
        ctaLabel={homeHeroSection?.ctaText ?? "Book Appointment"}
        ctaHref={homeHeroSection?.ctaHref ?? `https://wa.me/${whatsappNumber}`}
        mobileMenuAriaLabel="Open navigation menu"
      />

      <main>{children}</main>

      <Footer
        brandName={spec.business.name}
        tagline={spec.seo.description}
        links={navLinks}
        phoneNumber={spec.business.phone}
        whatsappNumber={whatsappNumber}
        address={spec.business.address}
        businessHours={businessHours}
        social={social}
        quickLinksTitle="Quick Links"
        contactTitle="Contact"
        hoursTitle="Business Hours"
        copyright={`${spec.business.name}. All rights reserved.`}
      />

      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5"
      >
        <span>◉</span>
        <span>WhatsApp</span>
      </a>
    </div>
  );

  if (!homePage || !page) {
    return commonShell(
      <section className="shell-container py-16">
        <div className="rounded-xl border border-[#f0d9de] bg-[#fff4f6] p-5 text-sm text-[#7b3745]">
          Unable to render template because no pages were found in the SiteSpec.
        </div>
      </section>
    );
  }

  if (pageSlug === "/about") {
    return commonShell(
      <>
        <Hero
          eyebrow={spec.business.category}
          headline={aboutSection ? `${spec.business.name} Story` : `${spec.business.name} About`}
          subheadline={aboutParagraphs[0] ?? `${spec.business.name} serves ${spec.business.city} with modern beauty experiences.`}
          primaryCtaLabel={homeHeroSection?.ctaText ?? "Book Appointment"}
          primaryCtaHref={homeHeroSection?.ctaHref ?? `https://wa.me/${whatsappNumber}`}
          secondaryCtaLabel="Call Now"
          secondaryCtaHref={`tel:${spec.business.phone}`}
          imageUrl={spec.business.coverImageUrl ?? galleryImages[0]?.url}
          imageAlt={spec.business.name}
          storyParagraphs={aboutParagraphs.length > 0 ? aboutParagraphs : undefined}
          missionTitle="Mission"
          missionText={aboutParagraphs[1] ?? spec.seo.description}
          valuesTitle="Values"
          values={aboutValues}
        />

        {aboutTestimonials.length > 0 ? (
          <Testimonials
            title="Client Feedback"
            subtitle="What our guests say about their experience."
            items={aboutTestimonials}
          />
        ) : null}
      </>
    );
  }

  if (pageSlug === "/services") {
    return commonShell(
      <ServicesGrid
        title={servicesPage.title || "Services"}
        subtitle={spec.seo.description}
        categories={categories.length > 0 ? categories : ["Hair", "Skin", "Nails"]}
        items={servicesItems}
        ctaLabel={homeHeroSection?.ctaText ?? "Book Appointment"}
        ctaHref={homeHeroSection?.ctaHref ?? `https://wa.me/${whatsappNumber}`}
        showPackages
        packagesTitle="Packages"
        packagesSubtitle="Curated service bundles for regular care and special occasions."
        packages={mapPackages(servicesItems, homeHeroSection?.ctaHref ?? `https://wa.me/${whatsappNumber}`)}
      />
    );
  }

  if (pageSlug === "/gallery") {
    return commonShell(
      <GalleryGrid
        title={gallerySection?.title ?? galleryPage.title ?? "Gallery"}
        subtitle={spec.seo.description}
        images={galleryImages}
        lightboxCloseLabel="Close image"
        lightboxPreviousLabel="Previous"
        lightboxNextLabel="Next"
        masonry
      />
    );
  }

  if (pageSlug === "/contact") {
    return commonShell(
      <ContactSection
        title={contactSection?.heading ?? contactPage.title ?? "Contact"}
        subtitle={contactSection?.description ?? `Reach ${spec.business.name} in ${spec.business.city}.`}
        phoneNumber={spec.business.phone}
        whatsappNumber={whatsappNumber}
        whatsappLabel={contactSection?.showWhatsapp === false ? "WhatsApp unavailable" : "Chat on WhatsApp"}
        address={spec.business.address}
        businessHours={businessHours}
        mapPlaceholderTitle="Map Placeholder"
        mapPlaceholderSubtitle="Replace with your map embed in production."
        formTitle="Booking / Enquiry"
        formFields={DEFAULT_FORM_FIELDS}
        showMap
        showForm
      />
    );
  }

  const homeTeamMembers = mapTeamMembers(spec.business.name, galleryImages, testimonialsItems);

  return commonShell(
    <>
      <Hero
        eyebrow={spec.business.category}
        headline={homeHeroSection?.heading ?? `${spec.business.name} in ${spec.business.city}`}
        subheadline={homeHeroSection?.subheading ?? spec.seo.description}
        primaryCtaLabel={homeHeroSection?.ctaText ?? "Book Appointment"}
        primaryCtaHref={homeHeroSection?.ctaHref ?? `https://wa.me/${whatsappNumber}`}
        secondaryCtaLabel="Call Now"
        secondaryCtaHref={`tel:${spec.business.phone}`}
        imageUrl={spec.business.coverImageUrl ?? galleryImages[0]?.url}
        imageAlt={spec.business.name}
      />

      <TrustStrip
        title={`Trusted by clients across ${spec.business.city}`}
        stats={stats}
      />

      <ServicesGrid
        title={homeServicesSection ? homePage.title || "Services" : "Services"}
        subtitle={spec.seo.description}
        categories={categories.length > 0 ? categories : ["Hair", "Skin", "Nails"]}
        items={servicesItems}
        ctaLabel={homeHeroSection?.ctaText ?? "Book Appointment"}
        ctaHref={homeHeroSection?.ctaHref ?? `https://wa.me/${whatsappNumber}`}
        maxItems={6}
      />

      <TeamSection
        title="Our Team"
        subtitle="Expert stylists focused on precision, comfort, and modern results."
        members={homeTeamMembers}
      />

      <GalleryGrid
        title={homeGallerySection?.title ?? "Gallery"}
        subtitle={spec.seo.description}
        images={galleryImages}
        lightboxCloseLabel="Close image"
        lightboxPreviousLabel="Previous"
        lightboxNextLabel="Next"
        maxItems={8}
      />

      {testimonialsItems.length > 0 ? (
        <Testimonials
          title="Client Testimonials"
          subtitle="What guests love about their salon visits."
          items={testimonialsItems}
        />
      ) : null}

      {homeOfferSection ? (
        <OfferBanner
          badge="Limited Offer"
          text={homeOfferSection.message}
          ctaLabel={homeOfferSection.ctaText ?? "Claim Offer"}
          ctaHref={homeOfferSection.ctaHref ?? `https://wa.me/${whatsappNumber}`}
        />
      ) : null}

      <ContactSection
        title={homeContactSection?.heading ?? "Contact"}
        subtitle={homeContactSection?.description ?? `Book your slot with ${spec.business.name}.`}
        phoneNumber={spec.business.phone}
        whatsappNumber={whatsappNumber}
        whatsappLabel={homeContactSection?.showWhatsapp === false ? "WhatsApp unavailable" : "Chat on WhatsApp"}
        address={spec.business.address}
        businessHours={businessHours}
        mapPlaceholderTitle="Map Placeholder"
        mapPlaceholderSubtitle="Replace with your map embed in production."
        formTitle="Quick Enquiry"
        formFields={DEFAULT_FORM_FIELDS}
      />
    </>
  );
}
