import ServicesGrid from "@/components/templates/modern-minimal-salon/ServicesGrid";
import { ModernMinimalSalonData } from "@/data/templates/modern-minimal-salon";

export default function ModernMinimalSalonServicesPage() {
  return (
    <ServicesGrid
      title={ModernMinimalSalonData.services.title}
      subtitle={ModernMinimalSalonData.services.subtitle}
      categories={ModernMinimalSalonData.services.categories}
      items={ModernMinimalSalonData.services.items}
      ctaLabel={ModernMinimalSalonData.services.ctaLabel}
      ctaHref={ModernMinimalSalonData.services.ctaHref}
      showPackages
      packagesTitle={ModernMinimalSalonData.services.packagesTitle}
      packagesSubtitle={ModernMinimalSalonData.services.packagesSubtitle}
      packages={ModernMinimalSalonData.services.packages}
    />
  );
}
