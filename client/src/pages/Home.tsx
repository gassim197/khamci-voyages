import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import TeamBuilding from "@/components/TeamBuilding";
import DiscoverGuinea from "@/components/DiscoverGuinea";
import DestinationGalleries from "@/components/DestinationGalleries";
import HowItWorks from "@/components/HowItWorks";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

/**
 * Home Page - KHAMCI VOYAGES
 * 
 * Design Philosophy: "Aventure Africaine Moderne"
 * - Énergie vibrante avec couleurs dégradées du logo
 * - Asymétrie intentionnelle et layouts organiques
 * - Animations fluides et sophistiquées
 * - Typographie mixte pour hiérarchie claire
 * - Motifs africains subtils
 * 
 * Sections:
 * 1. Header - Navigation sticky
 * 2. Hero - Image plein écran avec CTA
 * 3. Why Choose Us - 4 arguments clés
 * 4. Services - 6 services présentés
 * 5. Team Building - Section dédiée
 * 6. Discover Guinea - Destinations
 * 7. Destination Galleries - Galeries interactives avec lightbox
 * 8. How It Works - Processus en 3 étapes
 * 9. Contact Form - Formulaire de demande
 * 10. Footer - Informations et liens
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <WhyChooseUs />
        <Services />
        <TeamBuilding />
        <DiscoverGuinea />
        <DestinationGalleries />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
