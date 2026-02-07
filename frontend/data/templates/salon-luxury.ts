import type { SiteSpec } from "@zencodify/shared";

export const SalonLuxuryPreviewSpec: SiteSpec = {
  version: "1.0",
  templateId: "salon-luxury",
  siteType: "multipage",
  theme: {
    colors: {
      primary: "#111827",
      secondary: "#9CA3AF",
      background: "#FFFFFF",
      text: "#1F2937"
    },
    fonts: {
      heading: "Playfair Display",
      body: "Inter"
    },
    radius: {
      sm: "6px",
      md: "10px",
      lg: "16px"
    },
    shadow: {
      sm: "0 1px 2px rgba(0,0,0,0.08)",
      md: "0 6px 12px rgba(0,0,0,0.1)",
      lg: "0 12px 24px rgba(0,0,0,0.16)"
    }
  },
  business: {
    name: "Salon Luxury",
    category: "Beauty Salon",
    city: "San Francisco",
    phone: "+1 415 555 0101",
    whatsapp: "+1 415 555 0101",
    address: "123 Market Street, San Francisco, CA"
  },
  seo: {
    title: "Salon Luxury | Premium Hair & Beauty",
    description: "Book premium salon services with expert stylists."
  },
  pages: [
    {
      slug: "/",
      title: "Home",
      sections: [
        {
          type: "hero",
          heading: "Style That Speaks For You",
          subheading: "Premium salon services for your best look.",
          ctaText: "Book Appointment",
          ctaHref: "/contact"
        }
      ]
    },
    {
      slug: "/contact",
      title: "Contact",
      sections: [
        {
          type: "contact",
          heading: "Contact Salon Luxury",
          description: "Call or message us on WhatsApp to book.",
          showPhone: true,
          showWhatsapp: true
        }
      ]
    }
  ]
};
