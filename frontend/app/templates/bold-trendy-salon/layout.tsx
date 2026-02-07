import type { ReactNode } from "react";
import Footer from "@/components/templates/bold-trendy-salon/Footer";
import Navbar from "@/components/templates/bold-trendy-salon/Navbar";
import { BoldTrendySalonData } from "@/data/templates/bold-trendy-salon";

type BoldTrendySalonLayoutProps = {
  children: ReactNode;
};

export default function BoldTrendySalonLayout({ children }: BoldTrendySalonLayoutProps) {
  const whatsappHref = `https://wa.me/${BoldTrendySalonData.whatsappNumber}`;

  return (
    <div className="min-h-screen bg-[#05040b]">
      <Navbar
        logoText={BoldTrendySalonData.navigation.logoText}
        logoHref={BoldTrendySalonData.navigation.links[0]?.href ?? "/"}
        links={BoldTrendySalonData.navigation.links}
        ctaLabel={BoldTrendySalonData.navigation.ctaLabel}
        ctaHref={whatsappHref}
        mobileMenuAriaLabel={BoldTrendySalonData.navigation.mobileMenuAriaLabel}
      />

      <main>{children}</main>

      <Footer
        brandName={BoldTrendySalonData.brandName}
        tagline={BoldTrendySalonData.footer.tagline}
        links={BoldTrendySalonData.navigation.links}
        phoneNumber={BoldTrendySalonData.phoneNumber}
        whatsappNumber={BoldTrendySalonData.whatsappNumber}
        address={BoldTrendySalonData.address}
        businessHours={BoldTrendySalonData.businessHours}
        social={BoldTrendySalonData.social}
        quickLinksTitle={BoldTrendySalonData.footer.quickLinksTitle}
        contactTitle={BoldTrendySalonData.footer.contactTitle}
        hoursTitle={BoldTrendySalonData.footer.hoursTitle}
        copyright={BoldTrendySalonData.footer.copyright}
      />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(37,211,102,0.45)] transition hover:-translate-y-0.5"
      >
        <span>◉</span>
        <span>{BoldTrendySalonData.navigation.floatingWhatsappLabel}</span>
      </a>
    </div>
  );
}
