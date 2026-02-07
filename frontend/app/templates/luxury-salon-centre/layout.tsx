import type { ReactNode } from "react";
import Footer from "@/components/templates/luxury-salon-centre/Footer";
import Navbar from "@/components/templates/luxury-salon-centre/Navbar";
import { LuxurySalonCentreData } from "@/data/templates/luxury-salon-centre";

type TemplateLayoutProps = {
  children: ReactNode;
};

export default function TemplateLayout({ children }: TemplateLayoutProps) {
  const whatsappHref = `https://wa.me/${LuxurySalonCentreData.whatsappNumber}`;

  return (
    <div className="min-h-screen">
      <Navbar
        brandName={LuxurySalonCentreData.navigation.logoText}
        brandHref={LuxurySalonCentreData.navigation.links[0]?.href ?? "/"}
        links={LuxurySalonCentreData.navigation.links}
        ctaLabel={LuxurySalonCentreData.navigation.ctaLabel}
        whatsappHref={whatsappHref}
        mobileMenuAriaLabel={LuxurySalonCentreData.navigation.mobileMenuAriaLabel}
      />

      <main>{children}</main>

      <Footer
        brandName={LuxurySalonCentreData.brandName}
        tagline={LuxurySalonCentreData.footer.tagline}
        links={LuxurySalonCentreData.navigation.links}
        phoneNumber={LuxurySalonCentreData.phoneNumber}
        whatsappNumber={LuxurySalonCentreData.whatsappNumber}
        address={LuxurySalonCentreData.address}
        businessHours={LuxurySalonCentreData.businessHours}
        social={LuxurySalonCentreData.social}
        quickLinksTitle={LuxurySalonCentreData.footer.quickLinksTitle}
        contactTitle={LuxurySalonCentreData.footer.contactTitle}
        hoursTitle={LuxurySalonCentreData.footer.hoursTitle}
        copyright={LuxurySalonCentreData.footer.copyright}
      />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5"
      >
        <span>◉</span>
        <span>{LuxurySalonCentreData.navigation.floatingWhatsappLabel}</span>
      </a>
    </div>
  );
}
