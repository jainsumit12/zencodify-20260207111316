export type MinimalNavItem = {
  label: string;
  href: string;
};

export type MinimalStat = {
  label: string;
  value: string;
};

export type MinimalServiceItem = {
  id: string;
  category: "Hair" | "Color" | "Skin" | "Nails" | "Makeup";
  name: string;
  description: string;
  price: string;
  duration: string;
};

export type MinimalTeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
};

export type MinimalGalleryItem = {
  id: string;
  src: string;
  alt: string;
};

export type MinimalTestimonialItem = {
  id: string;
  name: string;
  rating: number;
  text: string;
};

export type MinimalPackage = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  inclusions: string[];
  ctaLabel: string;
  ctaHref: string;
};

export interface ModernMinimalSalonTemplateData {
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
    links: MinimalNavItem[];
    primaryCtaLabel: string;
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
  aboutHero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    story: string[];
    missionTitle: string;
    missionText: string;
    valuesTitle: string;
    values: string[];
    ctaLabel: string;
    ctaHref: string;
  };
  trustStrip: {
    title: string;
    stats: MinimalStat[];
  };
  services: {
    title: string;
    subtitle: string;
    categories: string[];
    items: MinimalServiceItem[];
    ctaLabel: string;
    ctaHref: string;
    packagesTitle: string;
    packagesSubtitle: string;
    packages: MinimalPackage[];
  };
  team: {
    title: string;
    subtitle: string;
    members: MinimalTeamMember[];
  };
  gallery: {
    title: string;
    subtitle: string;
    images: MinimalGalleryItem[];
    lightboxCloseLabel: string;
    lightboxPreviousLabel: string;
    lightboxNextLabel: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: MinimalTestimonialItem[];
  };
  offer: {
    badge: string;
    text: string;
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

export const ModernMinimalSalonData: ModernMinimalSalonTemplateData = {
  templateId: "modern-minimal-salon",
  version: "1.0",
  brandName: "Modern Minimal Salon",
  city: "Bengaluru",
  whatsappNumber: "919945551122",
  phoneNumber: "+91 99455 51122",
  address: "22 Bloom Street, Indiranagar, Bengaluru 560038",
  businessHours: [
    "Mon - Fri: 9:30 AM - 8:00 PM",
    "Sat: 9:00 AM - 8:30 PM",
    "Sun: 10:00 AM - 6:00 PM"
  ],
  navigation: {
    logoText: "Modern Minimal Salon",
    links: [
      { label: "Home", href: "/templates/modern-minimal-salon" },
      { label: "About", href: "/templates/modern-minimal-salon/about" },
      { label: "Services", href: "/templates/modern-minimal-salon/services" },
      { label: "Gallery", href: "/templates/modern-minimal-salon/gallery" },
      { label: "Contact", href: "/templates/modern-minimal-salon/contact" }
    ],
    primaryCtaLabel: "Book Appointment",
    floatingWhatsappLabel: "WhatsApp",
    mobileMenuAriaLabel: "Open navigation menu"
  },
  hero: {
    eyebrow: "Salon & Beauty",
    headline: "Polished, effortless beauty with modern precision",
    subheadline:
      "Experience clean aesthetics, expert artistry, and elevated service rituals tailored to your routine.",
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=80",
    primaryCtaLabel: "Book Appointment",
    primaryCtaHref: "/templates/modern-minimal-salon/contact",
    secondaryCtaLabel: "Call Now",
    secondaryCtaHref: "tel:+919945551122"
  },
  aboutHero: {
    eyebrow: "About Us",
    headline: "Minimal design. Maximum attention to detail.",
    subheadline:
      "We built a bright, calming studio where every service is intentional, refined, and personalized.",
    story: [
      "Modern Minimal Salon was created for clients who love understated luxury and consistently polished results.",
      "From consultation to finish, our approach focuses on healthy techniques, long-lasting styling, and client comfort."
    ],
    missionTitle: "Mission",
    missionText:
      "Deliver clean, reliable, and premium beauty experiences through skilled artistry and thoughtful service.",
    valuesTitle: "Values",
    values: [
      "Hygiene-first workflow",
      "Transparent consultation and pricing",
      "Contemporary techniques with natural finish"
    ],
    ctaLabel: "Book Your Visit",
    ctaHref: "/templates/modern-minimal-salon/contact"
  },
  trustStrip: {
    title: "Loved for consistency, warmth, and modern styling",
    stats: [
      { label: "Average Rating", value: "4.9/5" },
      { label: "Clients Served", value: "9,500+" },
      { label: "Years in Beauty", value: "11+" }
    ]
  },
  services: {
    title: "Services & Pricing",
    subtitle:
      "Hair, skin, and beauty services designed for a clean finish, personalized recommendations, and easy upkeep.",
    categories: ["Hair", "Color", "Skin", "Nails", "Makeup"],
    items: [
      {
        id: "mms-s1",
        category: "Hair",
        name: "Precision Cut & Finish",
        description: "Consultation-led haircut with signature smooth finish.",
        price: "INR 1,900",
        duration: "50 min"
      },
      {
        id: "mms-s2",
        category: "Color",
        name: "Global Color Refresh",
        description: "Even-tone color service with bond-protection care.",
        price: "INR 4,200",
        duration: "110 min"
      },
      {
        id: "mms-s3",
        category: "Skin",
        name: "Hydra Bright Facial",
        description: "Hydration-focused facial for glow and texture balance.",
        price: "INR 3,200",
        duration: "70 min"
      },
      {
        id: "mms-s4",
        category: "Nails",
        name: "Gel Manicure + Art",
        description: "Minimal luxe gel manicure with custom detailing.",
        price: "INR 2,400",
        duration: "80 min"
      },
      {
        id: "mms-s5",
        category: "Makeup",
        name: "Soft Glam Makeup",
        description: "Skin-focused glam for events and shoots.",
        price: "INR 5,500",
        duration: "95 min"
      },
      {
        id: "mms-s6",
        category: "Hair",
        name: "Keratin Smooth Therapy",
        description: "Frizz-control and smoothness with long-lasting shine.",
        price: "INR 7,800",
        duration: "170 min"
      },
      {
        id: "mms-s7",
        category: "Skin",
        name: "Detan Recovery Ritual",
        description: "De-tan and soothe ritual for brighter skin tone.",
        price: "INR 2,600",
        duration: "55 min"
      },
      {
        id: "mms-s8",
        category: "Color",
        name: "Balayage Blend",
        description: "Natural dimensional highlights with custom toning.",
        price: "INR 6,900",
        duration: "150 min"
      }
    ],
    ctaLabel: "Book Appointment",
    ctaHref: "/templates/modern-minimal-salon/contact",
    packagesTitle: "Packages",
    packagesSubtitle: "Popular combinations for complete monthly or event-ready care.",
    packages: [
      {
        id: "pack-1",
        name: "Glow Reset",
        subtitle: "Skin + Hair Care",
        price: "INR 5,800",
        inclusions: [
          "Hydra Bright Facial",
          "Hair Spa + Blowdry",
          "Nail Cleanup"
        ],
        ctaLabel: "Choose Glow Reset",
        ctaHref: "/templates/modern-minimal-salon/contact"
      },
      {
        id: "pack-2",
        name: "Weekend Glam",
        subtitle: "Styling + Makeup",
        price: "INR 7,900",
        inclusions: [
          "Soft Glam Makeup",
          "Hair Styling",
          "Express Manicure"
        ],
        ctaLabel: "Choose Weekend Glam",
        ctaHref: "/templates/modern-minimal-salon/contact"
      },
      {
        id: "pack-3",
        name: "Bridal Preview",
        subtitle: "Trial Package",
        price: "INR 12,500",
        inclusions: [
          "Bridal Makeup Trial",
          "Hairstyle Trial",
          "Skin Prep Consultation"
        ],
        ctaLabel: "Choose Bridal Preview",
        ctaHref: "/templates/modern-minimal-salon/contact"
      }
    ]
  },
  team: {
    title: "Meet the Artists",
    subtitle: "A focused team of stylists and beauty experts with detail-first execution.",
    members: [
      {
        id: "team-1",
        name: "Aisha Rao",
        role: "Senior Hair Stylist",
        image:
          "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "team-2",
        name: "Meera Khanna",
        role: "Skin & Beauty Expert",
        image:
          "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "team-3",
        name: "Nidhi Bansal",
        role: "Makeup Specialist",
        image:
          "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=700&q=80"
      }
    ]
  },
  gallery: {
    title: "Studio Moments",
    subtitle: "Minimal interiors, fresh transformations, and polished beauty edits.",
    images: [
      {
        id: "mms-g1",
        src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
        alt: "Salon mirror and styling station"
      },
      {
        id: "mms-g2",
        src: "https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=900&q=80",
        alt: "Blowout styling in progress"
      },
      {
        id: "mms-g3",
        src: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?auto=format&fit=crop&w=900&q=80",
        alt: "Makeup tools and pastel beauty products"
      },
      {
        id: "mms-g4",
        src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
        alt: "Client hair color reveal"
      },
      {
        id: "mms-g5",
        src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80",
        alt: "Nail service close-up"
      },
      {
        id: "mms-g6",
        src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
        alt: "Salon products on white shelf"
      },
      {
        id: "mms-g7",
        src: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=900&q=80",
        alt: "Bright salon interior"
      },
      {
        id: "mms-g8",
        src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=900&q=80",
        alt: "Hair styling detail"
      },
      {
        id: "mms-g9",
        src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80",
        alt: "Skincare treatment setup"
      },
      {
        id: "mms-g10",
        src: "https://images.unsplash.com/photo-1529041942456-1d7ad34f0f7f?auto=format&fit=crop&w=900&q=80",
        alt: "Minimal makeup portrait"
      }
    ],
    lightboxCloseLabel: "Close image",
    lightboxPreviousLabel: "Previous",
    lightboxNextLabel: "Next"
  },
  testimonials: {
    title: "What Clients Say",
    subtitle: "Short, honest feedback from regulars who trust our process.",
    items: [
      {
        id: "mms-t1",
        name: "Ishita N",
        rating: 5,
        text: "Every visit feels calm and organized. The results are natural, polished, and always consistent."
      },
      {
        id: "mms-t2",
        name: "Kavya R",
        rating: 5,
        text: "I love the minimal vibe and the team’s attention to detail. My haircut and color turned out perfect."
      },
      {
        id: "mms-t3",
        name: "Pooja M",
        rating: 5,
        text: "Professional service, clean setup, and great communication. Booking and follow-up were seamless."
      }
    ]
  },
  offer: {
    badge: "Seasonal Offer",
    text: "Get 15% off on the Glow Reset package for weekday bookings this month.",
    ctaLabel: "Book the Offer",
    ctaHref: "/templates/modern-minimal-salon/contact"
  },
  contact: {
    title: "Contact & Booking",
    subtitle: "Call, message us on WhatsApp, or send a booking request through the form.",
    mapPlaceholderTitle: "Map Embed Placeholder",
    mapPlaceholderSubtitle: "Replace with Google Maps embed in production.",
    formTitle: "Enquiry / Booking Form",
    formFields: {
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      messageLabel: "Service Requirement",
      submitLabel: "Submit Request",
      successToast: "Thanks, your booking request has been received."
    }
  },
  footer: {
    tagline:
      "Clean beauty services, thoughtful consultation, and premium results tailored to your style.",
    quickLinksTitle: "Quick Links",
    contactTitle: "Contact",
    hoursTitle: "Business Hours",
    copyright: "Modern Minimal Salon. All rights reserved."
  }
};
