import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import TeamBuilding from "@/components/TeamBuilding";
import DiscoverGuinea from "@/components/DiscoverGuinea";
import DestinationGalleries from "@/components/DestinationGalleries";
import HowItWorks from "@/components/HowItWorks";
import Blog from "@/components/Blog";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import PopularDestinations from "@/components/PopularDestinations";
import Testimonials from "@/components/Testimonials";
import TestimonialForm from "@/components/TestimonialForm";
import { Testimonial } from "@/data/testimonials";

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
 * 8. Popular Destinations - 6 destinations populaires
 * 9. Testimonials - Avis clients
 * 10. Blog - Articles de voyage
 * 11. How It Works - Processus en 3 étapes
 * 12. Contact Form - Formulaire de demande
 * 13. Footer - Informations et liens
 */
export default function Home() {
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const handleAddTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => [...prev, testimonial]);
  };

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
        <PopularDestinations />
        <Testimonials onAddTestimonial={() => setShowTestimonialForm(true)} />
        <Blog />
        <HowItWorks />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      {showTestimonialForm && (
        <TestimonialForm
          onClose={() => setShowTestimonialForm(false)}
          onSubmit={handleAddTestimonial}
        />
      )}
    </div>
  );
}
