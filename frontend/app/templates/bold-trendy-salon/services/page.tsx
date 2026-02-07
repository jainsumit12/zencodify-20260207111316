import ServicesGrid from "@/components/templates/bold-trendy-salon/ServicesGrid";
import { BoldTrendySalonData } from "@/data/templates/bold-trendy-salon";

export default function BoldTrendySalonServicesPage() {
  return (
    <ServicesGrid
      title={BoldTrendySalonData.services.title}
      subtitle={BoldTrendySalonData.services.subtitle}
      categories={BoldTrendySalonData.services.categories}
      items={BoldTrendySalonData.services.items}
      ctaLabel={BoldTrendySalonData.services.ctaLabel}
      ctaHref={BoldTrendySalonData.services.ctaHref}
      showPackages
      packagesTitle={BoldTrendySalonData.services.packagesTitle}
      packagesSubtitle={BoldTrendySalonData.services.packagesSubtitle}
      packages={BoldTrendySalonData.services.packages}
    />
  );
}
