import ContactSection from "@/components/templates/modern-minimal-salon/ContactSection";
import { ModernMinimalSalonData } from "@/data/templates/modern-minimal-salon";

export default function ModernMinimalSalonContactPage() {
  return (
    <ContactSection
      title={ModernMinimalSalonData.contact.title}
      subtitle={ModernMinimalSalonData.contact.subtitle}
      phoneNumber={ModernMinimalSalonData.phoneNumber}
      whatsappNumber={ModernMinimalSalonData.whatsappNumber}
      whatsappLabel={ModernMinimalSalonData.navigation.floatingWhatsappLabel}
      address={ModernMinimalSalonData.address}
      businessHours={ModernMinimalSalonData.businessHours}
      mapPlaceholderTitle={ModernMinimalSalonData.contact.mapPlaceholderTitle}
      mapPlaceholderSubtitle={ModernMinimalSalonData.contact.mapPlaceholderSubtitle}
      formTitle={ModernMinimalSalonData.contact.formTitle}
      formFields={ModernMinimalSalonData.contact.formFields}
      showMap
      showForm
    />
  );
}
