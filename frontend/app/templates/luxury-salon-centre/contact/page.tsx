import ContactSection from "@/components/templates/luxury-salon-centre/ContactSection";
import { LuxurySalonCentreData } from "@/data/templates/luxury-salon-centre";

export default function LuxurySalonCentreContactPage() {
  return (
    <ContactSection
      headline={LuxurySalonCentreData.contact.headline}
      subheadline={LuxurySalonCentreData.contact.subheadline}
      phoneNumber={LuxurySalonCentreData.phoneNumber}
      whatsappNumber={LuxurySalonCentreData.whatsappNumber}
      whatsappLabel={LuxurySalonCentreData.navigation.ctaLabel}
      address={LuxurySalonCentreData.address}
      businessHours={LuxurySalonCentreData.businessHours}
      mapPlaceholderTitle={LuxurySalonCentreData.contact.mapPlaceholderTitle}
      mapPlaceholderSubtitle={LuxurySalonCentreData.contact.mapPlaceholderSubtitle}
      formTitle={LuxurySalonCentreData.contact.formTitle}
      formFields={LuxurySalonCentreData.contact.formFields}
      showMap
      showForm
    />
  );
}
