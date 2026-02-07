export type TemplateNavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  id: string;
  name: string;
  category: "Hair" | "Bridal" | "Skin" | "Nails";
  description: string;
  price: string;
  duration: string;
};

export type GalleryItem = {
  id?: string;
  url: string;
  alt?: string;
  caption?: string;
};

export type TemplateSocialLinks = {
  website?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  x?: string;
  googleMaps?: string;
};

export type TestimonialItem = {
  id: string;
  name: string;
  rating: number;
  text: string;
  photoUrl: string;
};

export type StatItem = {
  label: string;
  value: string;
};

export interface LuxurySalonCentreTemplateData {
  templateId: string;
  version: string;
  brandName: string;
  city: string;
  whatsappNumber: string;
  phoneNumber: string;
  address: string;
  logoUrl?: string;
  businessHours: string[];
  social: TemplateSocialLinks;
  navigation: {
    logoText: string;
    links: TemplateNavItem[];
    ctaLabel: string;
    floatingWhatsappLabel: string;
    mobileMenuAriaLabel: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    backgroundImageUrl: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  trustStrip: {
    headline: string;
    stats: StatItem[];
  };
  services: {
    headline: string;
    subheadline: string;
    categories: string[];
    items: ServiceItem[];
    primaryCtaLabel: string;
    primaryCtaHref: string;
  };
  feature: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    imageUrl: string;
    imageAlt: string;
    ctaLabel: string;
    ctaHref: string;
  };
  gallery: {
    headline: string;
    subheadline: string;
    images: GalleryItem[];
    lightboxCloseLabel: string;
    lightboxPreviousLabel: string;
    lightboxNextLabel: string;
  };
  testimonials: {
    headline: string;
    subheadline: string;
    items: TestimonialItem[];
  };
  offer: {
    badge: string;
    text: string;
    ctaLabel: string;
    ctaHref: string;
  };
  about: {
    headline: string;
    subheadline: string;
    ownerName: string;
    ownerRole: string;
    ownerImageUrl: string;
    ownerImageAlt: string;
    story: string[];
    trustPoints: string[];
    ctaLabel: string;
    ctaHref: string;
  };
  contact: {
    headline: string;
    subheadline: string;
    mapPlaceholderTitle: string;
    mapPlaceholderSubtitle: string;
    formTitle: string;
    formFields: {
      nameLabel: string;
      emailLabel: string;
      phoneLabel: string;
      messageLabel: string;
      submitLabel: string;
      successToast: string;
    };
  };
  footer: {
    tagline: string;
    quickLinksTitle: string;
    contactTitle: string;
    hoursTitle: string;
    copyright: string;
  };
}

export const LuxurySalonCentreData: LuxurySalonCentreTemplateData = {
  templateId: "luxury-salon-centre",
  version: "1.0",
  brandName: "Luxury Salon Centre",
  city: "Mumbai",
  whatsappNumber: "919876543210",
  phoneNumber: "+91 98765 43210",
  address: "Unit 14, Pearl Avenue, Bandra West, Mumbai 400050",
  logoUrl:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80",
  businessHours: [
    "Mon - Fri: 10:00 AM - 8:00 PM",
    "Sat: 9:00 AM - 9:00 PM",
    "Sun: 10:00 AM - 6:00 PM"
  ],
  social: {
    instagram: "https://instagram.com/luxurysaloncentre",
    facebook: "https://facebook.com/luxurysaloncentre",
    googleMaps: "https://maps.google.com/?q=Luxury+Salon+Centre+Mumbai"
  },
  navigation: {
    logoText: "Luxury Salon Centre",
    links: [
      { label: "Home", href: "/templates/luxury-salon-centre" },
      { label: "About", href: "/templates/luxury-salon-centre/about" },
      { label: "Services", href: "/templates/luxury-salon-centre/services" },
      { label: "Gallery", href: "/templates/luxury-salon-centre/gallery" },
      { label: "Contact", href: "/templates/luxury-salon-centre/contact" }
    ],
    ctaLabel: "Book on WhatsApp",
    floatingWhatsappLabel: "WhatsApp",
    mobileMenuAriaLabel: "Toggle navigation menu"
  },
  hero: {
    eyebrow: "Luxury Hair, Skin & Bridal Studio",
    headline: "Refined Beauty Experiences Designed Around You",
    subheadline:
      "From signature cuts to bridal glam, every session is crafted with precision, comfort, and premium care.",
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=1800&q=80",
    primaryCtaLabel: "Book Signature Session",
    primaryCtaHref: "/templates/luxury-salon-centre/contact",
    secondaryCtaLabel: "Explore Services",
    secondaryCtaHref: "/templates/luxury-salon-centre/services"
  },
  trustStrip: {
    headline: "Trusted by modern brides and style-forward clients",
    stats: [
      { label: "Average Rating", value: "4.9/5" },
      { label: "Happy Clients Served", value: "12,000+" },
      { label: "Years of Experience", value: "14+" }
    ]
  },
  services: {
    headline: "Signature Services",
    subheadline:
      "Premium rituals, trending techniques, and precision styling delivered by certified specialists.",
    categories: ["Hair", "Bridal", "Skin", "Nails"],
    items: [
      {
        id: "svc-1",
        name: "Precision Haircut & Styling",
        category: "Hair",
        description: "Face-shape guided cut with premium blowout finish.",
        price: "INR 2,200",
        duration: "60 min"
      },
      {
        id: "svc-2",
        name: "Global Hair Color",
        category: "Hair",
        description: "Rich tone transformation with color protection care.",
        price: "INR 4,900",
        duration: "120 min"
      },
      {
        id: "svc-3",
        name: "Bridal HD Makeup",
        category: "Bridal",
        description: "High-definition bridal look with full draping support.",
        price: "INR 16,500",
        duration: "150 min"
      },
      {
        id: "svc-4",
        name: "Pre-Bridal Glow Package",
        category: "Bridal",
        description: "Complete skin prep and grooming before your event.",
        price: "INR 22,000",
        duration: "3 sessions"
      },
      {
        id: "svc-5",
        name: "Hydra Luxe Facial",
        category: "Skin",
        description: "Deep hydration facial for radiant and healthy skin.",
        price: "INR 3,500",
        duration: "75 min"
      },
      {
        id: "svc-6",
        name: "Luxury Gel Nail Art",
        category: "Nails",
        description: "Custom gel extensions with couture nail artistry.",
        price: "INR 2,800",
        duration: "90 min"
      },
      {
        id: "svc-7",
        name: "Keratin Smooth Therapy",
        category: "Hair",
        description: "Anti-frizz smoothing for long-lasting shine.",
        price: "INR 8,900",
        duration: "180 min"
      },
      {
        id: "svc-8",
        name: "Detan & Brightening Peel",
        category: "Skin",
        description: "Corrective ritual for even tone and fresh texture.",
        price: "INR 2,900",
        duration: "50 min"
      }
    ],
    primaryCtaLabel: "Schedule Consultation",
    primaryCtaHref: "/templates/luxury-salon-centre/contact"
  },
  feature: {
    eyebrow: "Bridal Makeup Specialists",
    title: "Camera-ready glam crafted to your style story",
    description:
      "Our bridal experts blend skin science with editorial artistry so your look feels timeless across ceremonies and portraits.",
    bullets: [
      "Personalized bridal look trials",
      "Long-wear luxury product stack",
      "On-time multi-event styling workflow"
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bridal makeup artist preparing a bride",
    ctaLabel: "View Bridal Packages",
    ctaHref: "/templates/luxury-salon-centre/services"
  },
  gallery: {
    headline: "Recent Transformations",
    subheadline:
      "A curated look at polished finishes, bridal looks, and signature salon moments.",
    images: [
      {
        id: "gal-1",
        url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
        alt: "Client with styled hair in salon chair"
      },
      {
        id: "gal-2",
        url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
        alt: "Makeup brush set arranged on vanity table"
      },
      {
        id: "gal-3",
        url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
        alt: "Bride portrait with professional makeup"
      },
      {
        id: "gal-4",
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
        alt: "Hair styling tools on premium salon station"
      },
      {
        id: "gal-5",
        url: "https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&w=900&q=80",
        alt: "Nail art close-up with golden accents"
      },
      {
        id: "gal-6",
        url: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=900&q=80",
        alt: "Skincare facial session with mask treatment"
      },
      {
        id: "gal-7",
        url: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=900&q=80",
        alt: "Luxury salon interior and styling mirrors"
      },
      {
        id: "gal-8",
        url: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=900&q=80",
        alt: "Bridal hairstyle detail with accessories"
      },
      {
        id: "gal-9",
        url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
        alt: "Stylist blow drying with volume finish"
      },
      {
        id: "gal-10",
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
        alt: "Portrait shot of finished bridal makeup"
      }
    ],
    lightboxCloseLabel: "Close image preview",
    lightboxPreviousLabel: "Previous image",
    lightboxNextLabel: "Next image"
  },
  testimonials: {
    headline: "Client Love",
    subheadline:
      "Our guests return for expert finish, consistent quality, and warm hospitality.",
    items: [
      {
        id: "test-1",
        name: "Riya Sharma",
        rating: 5,
        text: "The bridal team understood exactly what I wanted and made me feel confident throughout every event.",
        photoUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "test-2",
        name: "Naina Kapoor",
        rating: 5,
        text: "My hair color and cut still look fresh weeks later. Service quality and detailing are truly premium.",
        photoUrl:
          "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "test-3",
        name: "Sana Verma",
        rating: 5,
        text: "The skincare and nail sessions are flawless. Every appointment is smooth, elegant, and worth it.",
        photoUrl:
          "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  offer: {
    badge: "Limited Offer",
    text: "Book a bridal trial this month and unlock 20% off on your final bridal booking.",
    ctaLabel: "Claim Offer on WhatsApp",
    ctaHref: "/templates/luxury-salon-centre/contact"
  },
  about: {
    headline: "Crafted by artists, trusted by families",
    subheadline:
      "A modern salon built on precision, hygiene, and personalized beauty journeys.",
    ownerName: "Anika Mehra",
    ownerRole: "Founder & Creative Director",
    ownerImageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80",
    ownerImageAlt: "Salon owner portrait",
    story: [
      "Luxury Salon Centre began with one promise: premium beauty services should feel personal and thoughtful, never rushed.",
      "Over the years, our team has trained across global trends and skin-safe techniques to deliver results that look natural, elevated, and event-ready."
    ],
    trustPoints: [
      "Certified stylists and makeup artists",
      "Skin-first product and hygiene standards",
      "Transparent pricing with personalized consultations"
    ],
    ctaLabel: "Talk to Our Team",
    ctaHref: "/templates/luxury-salon-centre/contact"
  },
  contact: {
    headline: "Visit Luxury Salon Centre",
    subheadline:
      "Book your consultation by phone or WhatsApp, or send us your enquiry and our team will get back shortly.",
    mapPlaceholderTitle: "Map Preview Placeholder",
    mapPlaceholderSubtitle:
      "Integrate Google Maps or Mapbox embed during production setup.",
    formTitle: "Send an Enquiry",
    formFields: {
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      messageLabel: "Message",
      submitLabel: "Submit Enquiry",
      successToast: "Thanks, your enquiry has been submitted."
    }
  },
  footer: {
    tagline:
      "Premium salon rituals with modern artistry for hair, skin, nails, and bridal moments.",
    quickLinksTitle: "Quick Links",
    contactTitle: "Contact",
    hoursTitle: "Business Hours",
    copyright: "Luxury Salon Centre. All rights reserved."
  }
};
