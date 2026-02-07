import ContactSection from "@/components/templates/bold-trendy-salon/ContactSection";
import { BoldTrendySalonData } from "@/data/templates/bold-trendy-salon";

export default function BoldTrendySalonContactPage() {
  return (
    <ContactSection
      title={BoldTrendySalonData.contact.title}
      subtitle={BoldTrendySalonData.contact.subtitle}
      phoneNumber={BoldTrendySalonData.phoneNumber}
      whatsappNumber={BoldTrendySalonData.whatsappNumber}
      whatsappLabel={BoldTrendySalonData.navigation.ctaLabel}
      address={BoldTrendySalonData.address}
      businessHours={BoldTrendySalonData.businessHours}
      mapPlaceholderTitle={BoldTrendySalonData.contact.mapPlaceholderTitle}
      mapPlaceholderSubtitle={BoldTrendySalonData.contact.mapPlaceholderSubtitle}
      formTitle={BoldTrendySalonData.contact.formTitle}
      formFields={BoldTrendySalonData.contact.formFields}
      showMap
      showForm
    />
  );
}
