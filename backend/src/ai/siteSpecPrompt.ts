export type SiteSpecPromptInput = {
  templateId: string;
  siteType: "one_page" | "multipage";
  businessName: string;
  category: string;
  city: string;
  phone: string;
  whatsapp: string;
  address: string;
  hours?: string[];
  services?: string[];
};

export function buildSiteSpecPrompt(input: SiteSpecPromptInput): string {
  const pages =
    input.siteType === "multipage"
      ? ["/", "/about", "/services", "/gallery", "/contact"]
      : ["/"];

  const providedServices =
    input.services && input.services.length > 0
      ? input.services.join(", ")
      : "Hair Cut, Hair Color, Keratin, Nail Art, Bridal Makeup";
  const providedHours =
    input.hours && input.hours.length > 0
      ? input.hours.join(" | ")
      : "Mon-Sat 10:00 AM - 8:00 PM";

  return `
You are generating a website SiteSpec JSON for a salon business.

Output rules (mandatory):
1) Output ONLY valid JSON. No markdown, no backticks, no extra text.
2) JSON must conform to SiteSpec schema version "1.0".
3) Set templateId exactly to "${input.templateId}".
4) Set siteType exactly to "${input.siteType}".
5) Include pages with these slugs exactly: ${pages.join(", ")}.
6) Slugs must be unique and lowercase.
7) Use valid Unsplash image URLs when images are needed.
8) Use Indian context for pricing with "₹" symbols.

Business input:
- Name: ${input.businessName}
- Category: ${input.category}
- City: ${input.city}
- Phone: ${input.phone}
- WhatsApp: ${input.whatsapp}
- Address: ${input.address}
- Business hours: ${providedHours}
- Service hints: ${providedServices}

Required JSON top-level shape:
{
  "version": "1.0",
  "templateId": string,
  "siteType": "one_page" | "multipage",
  "theme": {
    "colors": { "primary": string, "secondary": string, "background": string, "text": string },
    "fonts": { "heading": string, "body": string },
    "radius": { "sm": string, "md": string, "lg": string },
    "shadow": { "sm": string, "md": string, "lg": string }
  },
  "business": {
    "name": string,
    "category": string,
    "city": string,
    "phone": string,
    "whatsapp": string,
    "address": string,
    "logoUrl"?: string,
    "coverImageUrl"?: string
  },
  "seo": {
    "title": string,
    "description": string,
    "ogImageUrl"?: string
  },
  "pages": [
    {
      "slug": string,
      "title": string,
      "sections": Section[]
    }
  ]
}

Allowed section objects:
- hero: { "type":"hero", "heading":string, "subheading"?:string, "ctaText"?:string, "ctaHref"?:string }
- trust_strip: { "type":"trust_strip", "items":[string, ...] }
- services: { "type":"services", "items":[{ "name":string, "description"?:string, "price"?:string }, ...] }
- feature: { "type":"feature", "heading":string, "description":string, "bullets"?:[string,...], "imageUrl"?:string, "ctaText"?:string, "ctaHref"?:string }
- gallery: { "type":"gallery", "images":[string, ...] }
- about: { "type":"about", "content":string }
- testimonials: { "type":"testimonials", "items":[{ "name":string, "quote":string }, ...] }
- offer_banner: { "type":"offer_banner", "message":string, "ctaText"?:string, "ctaHref"?:string }
- contact: { "type":"contact", "heading"?:string, "description"?:string, "showPhone"?:boolean, "showWhatsapp"?:boolean }
- faq: { "type":"faq", "items":[{ "question":string, "answer":string }, ...] }

Section requirements:
- Home page "/" must include: hero, trust_strip, services, feature, gallery, testimonials, offer_banner, contact, faq.
- If siteType is "multipage", also include:
  - "/about" page with about, testimonials (faq optional)
  - "/services" page with services, feature, faq
  - "/gallery" page with gallery
  - "/contact" page with contact, faq
- If siteType is "one_page", include all major sections on "/".

Quality requirements:
- Make content realistic for ${input.city}, India.
- Include at least 5 service items with ₹ prices.
- Include at least 6 gallery image URLs.
- Include at least 3 testimonials.
- Include at least 3 FAQ items.

Now return only the final JSON.
`.trim();
}
