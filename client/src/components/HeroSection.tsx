import { useState } from "react";
import QuickQuoteModal from "./QuickQuoteModal";

/**
 * Hero Section - KHAMCI VOYAGES
 * 
 * Optimisé pour la conversion :
 * - CTA principal renforcé et visible
 * - Mini-formulaire rapide
 * - Éléments de réassurance visibles
 * - Copywriting orienté action immédiate
 */

export default function HeroSection() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/hero-airplane-sunset-64duN9FBfa4CZjHNXpHzzz.webp')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>

        {/* Logo Watermark - Subtle Background */}
        <div className="absolute bottom-10 right-10 opacity-10 z-0">
          <img
            src="/logo-khamci.png"
            alt=""
            className="w-40 md:w-56 h-auto"
          />
        </div>

        {/* Content */}
        <div className="relative container z-10 text-white max-w-3xl">
           <div className="animate-fade-in-up space-y-6">
            {/* Main Headline - Version 2: Fiabiité Mondiale */}
            <div>
              <h1 className="heading-display mb-2 leading-tight">
                Vos Voyages Organisés en 24h<br />
                <span className="gradient-text">Partout dans le Monde</span>
              </h1>
              <p className="text-lg md:text-xl text-orange-300 font-semibold">
                ⚡ Devis en 24h • Partout dans le monde • Zéro stress
              </p>
            </div>

            {/* Subheading - Version 2 */}
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl">
              Que vous rêviez de Paris, Bangkok, New York ou Dakar,
              KHAMCI VOYAGES transforme vos envies en réalité.
              Vols, hôtels, visas, circuits : nous gérons tout.
              Réponse garantie sous 24h. Zéro stress.
            </p>

            {/* Primary CTA - PROMINENT */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="btn-cta bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-2xl hover:shadow-2xl transition-all transform hover:scale-105 animate-pulse"
              >
                🎯 QUELLE EST VOTRE DESTINATION ?
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="btn-cta-secondary bg-white/20 backdrop-blur-sm text-white border-2 border-white hover:bg-white/30 font-bold text-lg px-8 py-4 rounded-lg transition-all"
              >
                Voir les Destinations
              </button>
            </div>

            {/* Reassurance Section */}
            <div className="mt-8 pt-8 border-t border-white/30 space-y-4">
              <p className="text-sm font-semibold text-white/90">
                ✓ Pourquoi 500+ voyageurs nous font confiance ?
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                  <p className="font-bold text-lg">24h</p>
                  <p className="text-xs text-white/80">Réponse garantie</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                  <p className="font-bold text-lg">100%</p>
                  <p className="text-xs text-white/80">Gratuit & sans engagement</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                  <p className="font-bold text-lg">15+</p>
                  <p className="text-xs text-white/80">Ans d'expertise locale</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        source="hero"
      />
    </>
  );
}
