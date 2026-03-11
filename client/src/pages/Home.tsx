import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import DiscoverGuinea from "@/components/DiscoverGuinea";
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
 * Sections:
 * 1. Header - Navigation sticky
 * 2. Hero - Vidéo plein écran avec CTA
 * 3. Why Choose Us - Arguments clés
 * 4. Services - 6 services avec liens vers pages dédiées
 * 5. Discover Guinea - Carrousel destinations Guinée
 * 6. Popular Destinations - Paris, Dubaï, Casablanca
 * 7. Testimonials - Avis clients
 * 8. Blog - Articles de voyage
 * 9. How It Works - Processus en 3 étapes
 * 10. FAQ - Questions fréquentes
 * 11. Contact Form - Formulaire de demande de devis
 * 12. Footer
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
        <DiscoverGuinea />
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
