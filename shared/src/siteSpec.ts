import { z } from "zod";

const SlugSchema = z
  .string()
  .regex(
    /^\/([a-z0-9-]+(\/[a-z0-9-]+)*)?$/,
    "Slug must be '/' or use lowercase path segments like '/about'."
  );

const ThemeSchema = z.object({
  colors: z.object({
    primary: z.string().min(1),
    secondary: z.string().min(1),
    background: z.string().min(1),
    text: z.string().min(1)
  }),
  fonts: z.object({
    heading: z.string().min(1),
    body: z.string().min(1)
  }),
  radius: z.object({
    sm: z.string().min(1),
    md: z.string().min(1),
    lg: z.string().min(1)
  }),
  shadow: z.object({
    sm: z.string().min(1),
    md: z.string().min(1),
    lg: z.string().min(1)
  })
});

const BusinessSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  city: z.string().min(1),
  phone: z.string().min(1),
  whatsapp: z.string().min(1),
  address: z.string().min(1),
  logoUrl: z.string().url().optional(),
  coverImageUrl: z.string().url().optional()
});

const SeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  ogImageUrl: z.string().url().optional()
});

const HeroSectionSchema = z.object({
  type: z.literal("hero"),
  heading: z.string().min(1),
  subheading: z.string().optional(),
  ctaText: z.string().optional(),
  ctaHref: z.string().optional()
});

const TrustStripSectionSchema = z.object({
  type: z.literal("trust_strip"),
  items: z.array(z.string().min(1)).min(1)
});

const ServicesSectionSchema = z.object({
  type: z.literal("services"),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        price: z.string().optional()
      })
    )
    .min(1)
});

const FeatureSectionSchema = z.object({
  type: z.literal("feature"),
  heading: z.string().min(1),
  description: z.string().min(1),
  bullets: z.array(z.string().min(1)).optional(),
  imageUrl: z.string().url().optional(),
  ctaText: z.string().optional(),
  ctaHref: z.string().optional()
});

const GallerySectionSchema = z.object({
  type: z.literal("gallery"),
  images: z.array(z.string().min(1)).min(1)
});

const AboutSectionSchema = z.object({
  type: z.literal("about"),
  content: z.string().min(1)
});

const TestimonialsSectionSchema = z.object({
  type: z.literal("testimonials"),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        quote: z.string().min(1)
      })
    )
    .min(1)
});

const OfferBannerSectionSchema = z.object({
  type: z.literal("offer_banner"),
  message: z.string().min(1),
  ctaText: z.string().optional(),
  ctaHref: z.string().optional()
});

const ContactSectionSchema = z.object({
  type: z.literal("contact"),
  heading: z.string().optional(),
  description: z.string().optional(),
  showPhone: z.boolean().optional(),
  showWhatsapp: z.boolean().optional()
});

const FaqSectionSchema = z.object({
  type: z.literal("faq"),
  items: z
    .array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1)
      })
    )
    .min(1)
});

export const SectionSchema = z.discriminatedUnion("type", [
  HeroSectionSchema,
  TrustStripSectionSchema,
  ServicesSectionSchema,
  FeatureSectionSchema,
  GallerySectionSchema,
  AboutSectionSchema,
  TestimonialsSectionSchema,
  OfferBannerSectionSchema,
  ContactSectionSchema,
  FaqSectionSchema
]);

const PageSchema = z.object({
  slug: SlugSchema,
  title: z.string().min(1),
  sections: z.array(SectionSchema).min(1)
});

export const SiteSpecSchema = z
  .object({
    version: z.literal("1.0"),
    templateId: z.string().min(1),
    siteType: z.enum(["one_page", "multipage"]),
    theme: ThemeSchema,
    business: BusinessSchema,
    seo: SeoSchema,
    pages: z.array(PageSchema).min(1)
  })
  .superRefine((value, ctx) => {
    const hasHomePage = value.pages.some((page) => page.slug === "/");
    if (!hasHomePage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pages"],
        message: "A home page with slug '/' is required."
      });
    }

    if (value.siteType === "one_page" && value.pages.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pages"],
        message: "one_page sites must include exactly one page."
      });
    }

    if (value.siteType === "multipage" && value.pages.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pages"],
        message: "multipage sites must include at least two pages."
      });
    }

    const seenSlugs = new Set<string>();
    value.pages.forEach((page, index) => {
      if (seenSlugs.has(page.slug)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["pages", index, "slug"],
          message: `Duplicate page slug '${page.slug}' found.`
        });
        return;
      }
      seenSlugs.add(page.slug);
    });
  });

export type SiteSpec = z.infer<typeof SiteSpecSchema>;
export type SiteSection = z.infer<typeof SectionSchema>;
