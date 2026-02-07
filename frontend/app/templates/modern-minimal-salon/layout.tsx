import type { ReactNode } from "react";
import Footer from "@/components/templates/modern-minimal-salon/Footer";
import Navbar from "@/components/templates/modern-minimal-salon/Navbar";
import { ModernMinimalSalonData } from "@/data/templates/modern-minimal-salon";

type ModernMinimalSalonLayoutProps = {
  children: ReactNode;
};

export default function ModernMinimalSalonLayout({ children }: ModernMinimalSalonLayoutProps) {
  const whatsappHref = `https://wa.me/${ModernMinimalSalonData.whatsappNumber}`;
  const contactHref =
    ModernMinimalSalonData.navigation.links.find((link) => link.label === "Contact")
      ?.href ?? "/templates/modern-minimal-salon/contact";

  return (
    <div className="min-h-screen bg-[#fffdfd]">
      <Navbar
        logoText={ModernMinimalSalonData.navigation.logoText}
        logoHref={ModernMinimalSalonData.navigation.links[0]?.href ?? "/"}
        links={ModernMinimalSalonData.navigation.links}
        ctaLabel={ModernMinimalSalonData.navigation.primaryCtaLabel}
        ctaHref={contactHref}
        mobileMenuAriaLabel={ModernMinimalSalonData.navigation.mobileMenuAriaLabel}
      />

      <main>{children}</main>

      <Footer
        brandName={ModernMinimalSalonData.brandName}
        tagline={ModernMinimalSalonData.footer.tagline}
        links={ModernMinimalSalonData.navigation.links}
        phoneNumber={ModernMinimalSalonData.phoneNumber}
        whatsappNumber={ModernMinimalSalonData.whatsappNumber}
        address={ModernMinimalSalonData.address}
        businessHours={ModernMinimalSalonData.businessHours}
        quickLinksTitle={ModernMinimalSalonData.footer.quickLinksTitle}
        contactTitle={ModernMinimalSalonData.footer.contactTitle}
        hoursTitle={ModernMinimalSalonData.footer.hoursTitle}
        copyright={ModernMinimalSalonData.footer.copyright}
      />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5"
      >
        <span>◉</span>
        <span>{ModernMinimalSalonData.navigation.floatingWhatsappLabel}</span>
      </a>
    </div>
  );
}
