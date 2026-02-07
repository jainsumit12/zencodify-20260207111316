import type { SiteSection, SiteSpec } from "@zencodify/shared";
import {
  BoldTrendySalonData,
  type BoldGalleryItem,
  type BoldServiceItem,
  type BoldStatItem,
  type BoldTestimonialItem,
  type BoldTrendySalonTemplateData
} from "@/data/templates/bold-trendy-salon";

export type BoldTrendySalonDataLike = BoldTrendySalonTemplateData;

type SitePage = SiteSpec["pages"][number];

function findPage(spec: SiteSpec, slug: SitePage["slug"]): SitePage | undefined {
  return spec.pages.find((page) => page.slug === slug);
}

function findSectionByType<TType extends SiteSection["type"]>(
  page: SitePage | undefined,
  type: TType
): Extract<SiteSection, { type: TType }> | undefined {
  return page?.sections.find(
    (section): section is Extract<SiteSection, { type: TType }> => section.type === type
  );
}

function sanitizeWhatsapp(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.length > 0 ? digits : value;
}

function inferServiceCategory(name: string): BoldServiceItem["category"] {
  const lower = name.toLowerCase();

  if (lower.includes("bridal") || lower.includes("makeup")) {
    return "Bridal";
  }

  if (lower.includes("nail")) {
    return "Nails";
  }

  if (
    lower.includes("color") ||
    lower.includes("colour") ||
    lower.includes("balayage") ||
    lower.includes("highlight")
  ) {
    return "Color";
  }

  if (
    lower.includes("keratin") ||
    lower.includes("smooth") ||
    lower.includes("treatment") ||
    lower.includes("spa")
  ) {
    return "Treatment";
  }

  return "Hair";
}

function defaultDurationByCategory(category: BoldServiceItem["category"]): string {
  switch (category) {
    case "Color":
      return "140 min";
    case "Treatment":
      return "150 min";
    case "Nails":
      return "90 min";
    case "Bridal":
      return "160 min";
    case "Hair":
    default:
      return "60 min";
  }
}

function mapTrustStats(items: string[] | undefined): BoldStatItem[] {
  if (!items || items.length === 0) {
    return BoldTrendySalonData.socialProof.stats;
  }

  const fallbackLabels = BoldTrendySalonData.socialProof.stats.map((item) => item.label);

  return items.slice(0, 3).map((item, index) => {
    const splitByColon = item.includes(":") ? item.split(":") : [];

    if (splitByColon.length === 2) {
      return {
        label: splitByColon[0].trim() || fallbackLabels[index] || `Stat ${index + 1}`,
        value: splitByColon[1].trim() || item
      };
    }

    return {
      label: fallbackLabels[index] || `Stat ${index + 1}`,
      value: item
    };
  });
}

function extractHoursFromContactDescription(description: string | undefined): string[] {
  if (!description) {
    return [];
  }

  return description
    .split(/\r?\n|\|/g)
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length > 0 && /(mon|tue|wed|thu|fri|sat|sun|am|pm|\d)/i.test(line)
    );
}

function splitParagraphs(content: string): string[] {
  const paragraphs = content
    .split(/\n\n|\r\n\r\n/g)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  if (paragraphs.length > 0) {
    return paragraphs;
  }

  const lines = content
    .split(/\r?\n/g)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.length > 0 ? lines : BoldTrendySalonData.about.story;
}

export function mapBoldTrendySalon(spec: SiteSpec): BoldTrendySalonDataLike {
  const homePage = findPage(spec, "/");
  const aboutPage = findPage(spec, "/about") ?? homePage;
  const servicesPage = findPage(spec, "/services") ?? homePage;
  const galleryPage = findPage(spec, "/gallery") ?? homePage;
  const contactPage = findPage(spec, "/contact") ?? homePage;

  const homeHero = findSectionByType(homePage, "hero");
  const homeTrustStrip = findSectionByType(homePage, "trust_strip");
  const homeTestimonials = findSectionByType(homePage, "testimonials");
  const homeOffer = findSectionByType(homePage, "offer_banner");

  const servicesSection = findSectionByType(servicesPage, "services");
  const gallerySection = findSectionByType(galleryPage, "gallery");
  const aboutSection = findSectionByType(aboutPage, "about");
  const contactSection = findSectionByType(contactPage, "contact");

  const whatsappNumber = sanitizeWhatsapp(spec.business.whatsapp);

  const mappedServices: BoldServiceItem[] =
    servicesSection?.items.map((item, index) => {
      const category = inferServiceCategory(item.name);
      return {
        id: `svc-${index + 1}`,
        category,
        name: item.name,
        description: item.description ?? "Premium service tailored to your look.",
        price: item.price ?? "₹1,999",
        duration: defaultDurationByCategory(category)
      };
    }) ?? BoldTrendySalonData.services.items;

  const mappedGalleryImages: BoldGalleryItem[] =
    gallerySection?.images.map((image, index) => ({
      id: `gal-${index + 1}`,
      url: image.url,
      alt: image.alt,
      caption: image.caption
    })) ?? BoldTrendySalonData.gallery.images;

  const mappedTestimonials: BoldTestimonialItem[] =
    homeTestimonials?.items.map((item, index) => ({
      id: `test-${index + 1}`,
      name: item.name,
      rating: 5,
      text: item.quote
    })) ?? BoldTrendySalonData.testimonials.items;

  const mappedCategories = Array.from(new Set(mappedServices.map((service) => service.category)));

  const mappedTrending =
    mappedServices.slice(0, 4).map((service, index) => ({
      id: `trend-${index + 1}`,
      title: service.name,
      subtitle: service.category,
      description: service.description,
      image: mappedGalleryImages[index]?.url
    })) || [];

  const mappedReels =
    mappedGalleryImages.slice(0, 6).map((image, index) => ({
      id: `reel-${index + 1}`,
      title: image.caption || image.alt || `Salon Reel ${index + 1}`,
      thumbnail: image.url,
      views: BoldTrendySalonData.reels.items[index]?.views ?? `${80 + index * 9}K`
    })) || [];

  const businessHoursFromContact = extractHoursFromContactDescription(contactSection?.description);

  const storyFromSpec = aboutSection ? splitParagraphs(aboutSection.content) : BoldTrendySalonData.about.story;

  const social =
    spec.social && Object.keys(spec.social).length > 0
      ? {
          website: spec.social.website,
          instagram: spec.social.instagram,
          facebook: spec.social.facebook,
          youtube: spec.social.youtube,
          linkedin: spec.social.linkedin,
          x: spec.social.x,
          googleMaps: spec.social.googleMaps
        }
      : BoldTrendySalonData.social;

  const mappedData: BoldTrendySalonTemplateData = {
    ...BoldTrendySalonData,
    templateId: spec.templateId,
    version: spec.version,
    brandName: spec.business.name,
    city: spec.business.city,
    whatsappNumber,
    phoneNumber: spec.business.phone,
    address: spec.business.address,
    logoUrl: spec.business.logoUrl ?? BoldTrendySalonData.logoUrl,
    businessHours:
      businessHoursFromContact.length > 0
        ? businessHoursFromContact
        : BoldTrendySalonData.businessHours,
    social,
    navigation: {
      ...BoldTrendySalonData.navigation,
      logoText: spec.business.name,
      links: [
        { label: "Home", href: "/templates/bold-trendy-salon" },
        { label: "About", href: "/templates/bold-trendy-salon/about" },
        { label: "Services", href: "/templates/bold-trendy-salon/services" },
        { label: "Gallery", href: "/templates/bold-trendy-salon/gallery" },
        { label: "Contact", href: "/templates/bold-trendy-salon/contact" }
      ]
    },
    hero: {
      ...BoldTrendySalonData.hero,
      headline: homeHero?.heading ?? BoldTrendySalonData.hero.headline,
      subheadline: homeHero?.subheading ?? BoldTrendySalonData.hero.subheadline,
      primaryCtaLabel: homeHero?.ctaText ?? BoldTrendySalonData.hero.primaryCtaLabel,
      primaryCtaHref:
        homeHero?.ctaHref ?? `https://wa.me/${whatsappNumber}`,
      secondaryCtaHref: `tel:${spec.business.phone}`
    },
    socialProof: {
      title: homeTrustStrip
        ? `${spec.business.name} is trending in ${spec.business.city}`
        : BoldTrendySalonData.socialProof.title,
      stats: mapTrustStats(homeTrustStrip?.items)
    },
    services: {
      ...BoldTrendySalonData.services,
      categories: mappedCategories.length > 0 ? mappedCategories : BoldTrendySalonData.services.categories,
      items: mappedServices,
      ctaHref: `/templates/bold-trendy-salon/contact`
    },
    trending: {
      ...BoldTrendySalonData.trending,
      items: mappedTrending.length > 0 ? mappedTrending : BoldTrendySalonData.trending.items
    },
    reels: {
      ...BoldTrendySalonData.reels,
      items: mappedReels.length > 0 ? mappedReels : BoldTrendySalonData.reels.items
    },
    gallery: {
      ...BoldTrendySalonData.gallery,
      title: gallerySection?.title ?? BoldTrendySalonData.gallery.title,
      images: mappedGalleryImages
    },
    testimonials: {
      ...BoldTrendySalonData.testimonials,
      items: mappedTestimonials
    },
    offer: {
      ...BoldTrendySalonData.offer,
      text: homeOffer?.message ?? BoldTrendySalonData.offer.text,
      ctaLabel: homeOffer?.ctaText ?? BoldTrendySalonData.offer.ctaLabel,
      ctaHref: homeOffer?.ctaHref ?? `https://wa.me/${whatsappNumber}`
    },
    about: {
      ...BoldTrendySalonData.about,
      headline: `${spec.business.name} Story`,
      subheadline:
        aboutSection?.content.slice(0, 140) ||
        `${spec.business.name} delivers premium beauty experiences in ${spec.business.city}.`,
      story: storyFromSpec,
      ctaHref: `https://wa.me/${whatsappNumber}`
    },
    contact: {
      ...BoldTrendySalonData.contact,
      title: contactSection?.heading ?? BoldTrendySalonData.contact.title,
      subtitle: contactSection?.description ?? BoldTrendySalonData.contact.subtitle
    },
    footer: {
      ...BoldTrendySalonData.footer,
      tagline: spec.seo.description || BoldTrendySalonData.footer.tagline,
      copyright: `${spec.business.name}. All rights reserved.`
    }
  };

  return mappedData;
}
