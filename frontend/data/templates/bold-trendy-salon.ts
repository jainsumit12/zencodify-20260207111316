export type BoldNavItem = {
  label: string;
  href: string;
};

export type BoldStatItem = {
  label: string;
  value: string;
};

export type BoldServiceItem = {
  id: string;
  category: "Hair" | "Color" | "Treatment" | "Nails" | "Bridal";
  name: string;
  description: string;
  price: string;
  duration: string;
};

export type BoldHighlightItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
};

export type BoldReelItem = {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
};

export type BoldGalleryItem = {
  id: string;
  src: string;
  alt: string;
};

export type BoldTestimonialItem = {
  id: string;
  name: string;
  rating: number;
  text: string;
};

export type BoldPackageItem = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  points: string[];
  ctaLabel: string;
  ctaHref: string;
};

export interface BoldTrendySalonTemplateData {
  templateId: string;
  version: string;
  brandName: string;
  city: string;
  whatsappNumber: string;
  phoneNumber: string;
  address: string;
  businessHours: string[];
  navigation: {
    logoText: string;
    links: BoldNavItem[];
    ctaLabel: string;
    floatingWhatsappLabel: string;
    mobileMenuAriaLabel: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  socialProof: {
    title: string;
    stats: BoldStatItem[];
  };
  services: {
    title: string;
    subtitle: string;
    categories: string[];
    items: BoldServiceItem[];
    ctaLabel: string;
    ctaHref: string;
    packagesTitle: string;
    packagesSubtitle: string;
    packages: BoldPackageItem[];
  };
  trending: {
    title: string;
    subtitle: string;
    items: BoldHighlightItem[];
  };
  reels: {
    title: string;
    subtitle: string;
    items: BoldReelItem[];
  };
  gallery: {
    title: string;
    subtitle: string;
    images: BoldGalleryItem[];
    lightboxCloseLabel: string;
    lightboxPreviousLabel: string;
    lightboxNextLabel: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: BoldTestimonialItem[];
  };
  offer: {
    badge: string;
    text: string;
    ctaLabel: string;
    ctaHref: string;
  };
  about: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    story: string[];
    teamTitle: string;
    teamSubtitle: string;
    team: BoldHighlightItem[];
    valuesTitle: string;
    valuesSubtitle: string;
    values: BoldHighlightItem[];
    ctaLabel: string;
    ctaHref: string;
  };
  contact: {
    title: string;
    subtitle: string;
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

export const BoldTrendySalonData: BoldTrendySalonTemplateData = {
  templateId: "bold-trendy-salon",
  version: "1.0",
  brandName: "Bold Trendy Salon",
  city: "Delhi",
  whatsappNumber: "919811112233",
  phoneNumber: "+91 98111 12233",
  address: "A-19 Studio Lane, Hauz Khas, New Delhi 110016",
  businessHours: [
    "Mon - Fri: 10:00 AM - 9:00 PM",
    "Sat: 9:00 AM - 10:00 PM",
    "Sun: 10:00 AM - 7:00 PM"
  ],
  navigation: {
    logoText: "Bold Trendy Salon",
    links: [
      { label: "Home", href: "/templates/bold-trendy-salon" },
      { label: "About", href: "/templates/bold-trendy-salon/about" },
      { label: "Services", href: "/templates/bold-trendy-salon/services" },
      { label: "Gallery", href: "/templates/bold-trendy-salon/gallery" },
      { label: "Contact", href: "/templates/bold-trendy-salon/contact" }
    ],
    ctaLabel: "Book on WhatsApp",
    floatingWhatsappLabel: "WhatsApp",
    mobileMenuAriaLabel: "Open navigation menu"
  },
  hero: {
    eyebrow: "Salon & Beauty",
    headline: "Trendy Looks. Bold Energy. Premium Execution.",
    subheadline:
      "From neon-ready hair transformations to luxe nail sets, we craft standout looks built for real life and real reels.",
    primaryCtaLabel: "Book on WhatsApp",
    primaryCtaHref: "https://wa.me/919811112233",
    secondaryCtaLabel: "Call Now",
    secondaryCtaHref: "tel:+919811112233"
  },
  socialProof: {
    title: "Premium trends with verified client love",
    stats: [
      { label: "Average Rating", value: "4.9/5" },
      { label: "Clients Styled", value: "18,000+" },
      { label: "Trending in Delhi", value: "#1" }
    ]
  },
  services: {
    title: "Services + Pricing",
    subtitle:
      "Trend-led beauty services with premium finishes, transparent pricing, and style-first consultation.",
    categories: ["Hair", "Color", "Treatment", "Nails", "Bridal"],
    items: [
      {
        id: "bts-s1",
        category: "Color",
        name: "Fashion Global Color",
        description: "High-impact color with tone lock and shine finish.",
        price: "INR 6,500",
        duration: "140 min"
      },
      {
        id: "bts-s2",
        category: "Treatment",
        name: "Keratin Therapy",
        description: "Frizz-control therapy for sleek, camera-ready texture.",
        price: "INR 8,900",
        duration: "180 min"
      },
      {
        id: "bts-s3",
        category: "Nails",
        name: "Signature Neon Nail Art",
        description: "Custom gel set with premium art detailing.",
        price: "INR 3,200",
        duration: "95 min"
      },
      {
        id: "bts-s4",
        category: "Hair",
        name: "Textured Cut + Style",
        description: "Precision cut designed for modern volume and movement.",
        price: "INR 2,400",
        duration: "60 min"
      },
      {
        id: "bts-s5",
        category: "Bridal",
        name: "Bridal Luxe Makeup",
        description: "Long-stay HD bridal glam with personalized look trials.",
        price: "INR 19,000",
        duration: "160 min"
      },
      {
        id: "bts-s6",
        category: "Treatment",
        name: "Smoothening Ritual",
        description: "Smoothing ritual for glossy, low-maintenance hair.",
        price: "INR 7,400",
        duration: "150 min"
      },
      {
        id: "bts-s7",
        category: "Hair",
        name: "Blowout + Gloss",
        description: "Runway-inspired blowout with anti-humidity finish.",
        price: "INR 1,800",
        duration: "45 min"
      },
      {
        id: "bts-s8",
        category: "Color",
        name: "Balayage Pop",
        description: "Dimensional highlights with face-framing tone blend.",
        price: "INR 7,200",
        duration: "165 min"
      }
    ],
    ctaLabel: "Book Your Slot",
    ctaHref: "/templates/bold-trendy-salon/contact",
    packagesTitle: "Combo Packages",
    packagesSubtitle: "Smart bundles for students and event-ready styling.",
    packages: [
      {
        id: "bts-p1",
        name: "Student Glow",
        subtitle: "Student Offer",
        price: "INR 3,999",
        points: ["Haircut + Blowdry", "Express Facial", "Nail Cleanup"],
        ctaLabel: "Choose Student Glow",
        ctaHref: "/templates/bold-trendy-salon/contact"
      },
      {
        id: "bts-p2",
        name: "Weekend Trend Set",
        subtitle: "Combo",
        price: "INR 6,800",
        points: ["Fashion Color Refresh", "Neon Nail Art", "Soft Glam Makeup"],
        ctaLabel: "Choose Weekend Trend",
        ctaHref: "/templates/bold-trendy-salon/contact"
      },
      {
        id: "bts-p3",
        name: "Bridal Pop Trial",
        subtitle: "Bridal Combo",
        price: "INR 13,500",
        points: ["Makeup Trial", "Hairstyle Trial", "Skin Prep Session"],
        ctaLabel: "Choose Bridal Trial",
        ctaHref: "/templates/bold-trendy-salon/contact"
      }
    ]
  },
  trending: {
    title: "Now Trending",
    subtitle: "High-demand services our clients book on repeat.",
    items: [
      {
        id: "trend-1",
        title: "Hair Color",
        subtitle: "Bold tones",
        description: "Vibrant custom shades tailored to skin tone and vibe."
      },
      {
        id: "trend-2",
        title: "Keratin",
        subtitle: "Frizz-free",
        description: "Smooth finish with controlled volume and mirror shine."
      },
      {
        id: "trend-3",
        title: "Nail Art",
        subtitle: "Statement sets",
        description: "Edgy gel art from minimal neon to maximal designs."
      },
      {
        id: "trend-4",
        title: "Bridal",
        subtitle: "Luxury glam",
        description: "Modern bridal styling built for photos and long events."
      }
    ]
  },
  reels: {
    title: "Reels We Love",
    subtitle: "Quick looks from our latest transformations.",
    items: [
      {
        id: "reel-1",
        title: "Pink money-piece transformation",
        thumbnail:
          "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=700&q=80",
        views: "128K"
      },
      {
        id: "reel-2",
        title: "Keratin before/after",
        thumbnail:
          "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?auto=format&fit=crop&w=700&q=80",
        views: "92K"
      },
      {
        id: "reel-3",
        title: "Neon chrome nails",
        thumbnail:
          "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=700&q=80",
        views: "76K"
      },
      {
        id: "reel-4",
        title: "Bridal glam in 30 sec",
        thumbnail:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=80",
        views: "150K"
      },
      {
        id: "reel-5",
        title: "Textured haircut reveal",
        thumbnail:
          "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=700&q=80",
        views: "81K"
      },
      {
        id: "reel-6",
        title: "Salon neon interiors",
        thumbnail:
          "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=700&q=80",
        views: "64K"
      }
    ]
  },
  gallery: {
    title: "Gallery",
    subtitle: "Editorial-inspired snapshots from our studio and client looks.",
    images: [
      {
        id: "bts-g1",
        src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
        alt: "Hair styling close-up"
      },
      {
        id: "bts-g2",
        src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
        alt: "Makeup portrait"
      },
      {
        id: "bts-g3",
        src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80",
        alt: "Nail art close-up"
      },
      {
        id: "bts-g4",
        src: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=900&q=80",
        alt: "Bridal hairstyle"
      },
      {
        id: "bts-g5",
        src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80",
        alt: "Skincare treatment setup"
      },
      {
        id: "bts-g6",
        src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
        alt: "Salon station setup"
      },
      {
        id: "bts-g7",
        src: "https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&w=900&q=80",
        alt: "Fashion nails"
      },
      {
        id: "bts-g8",
        src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
        alt: "Blow dry styling"
      },
      {
        id: "bts-g9",
        src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
        alt: "Studio portrait"
      },
      {
        id: "bts-g10",
        src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=900&q=80",
        alt: "Hair movement shot"
      }
    ],
    lightboxCloseLabel: "Close",
    lightboxPreviousLabel: "Previous",
    lightboxNextLabel: "Next"
  },
  testimonials: {
    title: "Client Reactions",
    subtitle: "Real feedback from our trend-forward salon community.",
    items: [
      {
        id: "bts-t1",
        name: "Anya K",
        rating: 5,
        text: "The vibe is unreal and the quality is top-tier. My color transformation was exactly what I wanted."
      },
      {
        id: "bts-t2",
        name: "Ritika P",
        rating: 5,
        text: "Booked for keratin and nail art, left with both looking flawless. Team is super professional."
      },
      {
        id: "bts-t3",
        name: "Mahi S",
        rating: 5,
        text: "Bridal glam lasted all day and looked amazing in photos. Smooth process from trial to final look."
      }
    ]
  },
  offer: {
    badge: "Limited Drop",
    text: "Get 20% off on any color + keratin combo booked this week.",
    ctaLabel: "Claim on WhatsApp",
    ctaHref: "https://wa.me/919811112233"
  },
  about: {
    eyebrow: "About Bold Trendy",
    headline: "Where salon craft meets creator culture.",
    subheadline:
      "We design fashion-forward looks with premium standards, trend intelligence, and creator-level execution.",
    story: [
      "Bold Trendy Salon started as a compact styling studio built for clients who want modern, camera-ready looks without compromising hair health.",
      "Today, we are known for color transformations, glossy treatments, and statement nail sets that stay practical for everyday life."
    ],
    teamTitle: "Team Highlight",
    teamSubtitle: "Specialists known for trend execution and precision service.",
    team: [
      {
        id: "team-1",
        title: "Kritika Arora",
        subtitle: "Creative Director",
        description: "Color specialist with editorial and runway styling experience.",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "team-2",
        title: "Sana Mir",
        subtitle: "Nail Art Lead",
        description: "Known for precision gel art and trend-led creative sets.",
        image:
          "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "team-3",
        title: "Nisha Verma",
        subtitle: "Bridal & Makeup Artist",
        description: "Luxury glam specialist for long-format bridal events.",
        image:
          "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=700&q=80"
      }
    ],
    valuesTitle: "Our Values",
    valuesSubtitle: "Principles behind every client session.",
    values: [
      {
        id: "value-1",
        title: "Quality First",
        subtitle: "Premium standards",
        description: "Products, process, and finishing quality are never compromised."
      },
      {
        id: "value-2",
        title: "Trend Smart",
        subtitle: "Modern but wearable",
        description: "We adapt trends to your lifestyle, face shape, and maintenance goals."
      },
      {
        id: "value-3",
        title: "Client Respect",
        subtitle: "Transparent and clear",
        description: "Consultation-first approach with clear timelines and pricing."
      }
    ],
    ctaLabel: "Book Your Transformation",
    ctaHref: "https://wa.me/919811112233"
  },
  contact: {
    title: "Contact + Booking",
    subtitle: "Message us, call us, or submit your request and we will confirm your slot.",
    mapPlaceholderTitle: "Map Embed Placeholder",
    mapPlaceholderSubtitle: "Replace with Google Maps embed during production setup.",
    formTitle: "Booking Request",
    formFields: {
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      messageLabel: "Service / Preferred Time",
      submitLabel: "Send Request",
      successToast: "Request submitted. Our team will confirm shortly."
    }
  },
  footer: {
    tagline:
      "Premium trend salon for bold color, glossy treatments, nails, and event-ready beauty looks.",
    quickLinksTitle: "Quick Links",
    contactTitle: "Contact",
    hoursTitle: "Business Hours",
    copyright: "Bold Trendy Salon. All rights reserved."
  }
};
