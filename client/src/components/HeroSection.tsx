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
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/hero-bg-world-travel-dAdxY5xHpjMoxUVLkFppar.webp"
          >
            <source
              src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663352571509/rkJnXtrlevfTbeSv.mp4?Expires=1804697242&Signature=RtkEPV2vNSgwbfYFmwFmZ5zTXxVWYE69ErsaqyVP0ABSZ6i4q~~7V59oFOd3twCMwTcVZQfpMpTwM-yYeUrxSXYObbUIeeG~cIPLHAmlTgpDBr0TouHS6JhuNwlQ-JDDynkSbToh2Tb8xmY14MDbmojbHMVN~FG~qlvlg0P9GNqesARZvaa02NX~-vjkh-rz~dG5pFCarY7pAEt~mBie5DnfXc4EZ8~ijpsuLsRIoYlr18LjSYJlnyGfUnyi1Td2uQBEA-CNayiq14EylheC45jhrzZD4Vpzk0zFa6PqLkX1UZ1XIDRZX4AqUNOj5g1HCMkO0z9Cvhtqe3XIao13mA__&Key-Pair-Id=K2HSFNDJXOU9YS"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        </div>

        {/* Logo Watermark - Subtle Background */}
        <div className="absolute bottom-10 right-10 opacity-10 z-0">
          <img
            src="/logo-khamci-officiel.png"
            alt=""
            className="w-40 md:w-56 h-auto"
          />
        </div>

        {/* Content */}
        <div className="relative container z-10 text-white max-w-4xl">
           <div className="animate-fade-in-up space-y-6">
            {/* Main Headline - Version 2: Fiabiité Mondiale */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
                Organisez votre voyage partout dans le monde
                <span className="block gradient-text mt-1">avec KHAMCI VOYAGES</span>
              </h1>
              <p className="text-lg md:text-xl text-orange-300 font-semibold">
                ⚡ Devis personnalisé en moins de 24h • Gratuit & sans engagement
              </p>
            </div>

            {/* Subheading - Message de bienvenue */}
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl">
              Bienvenue chez <strong className="text-white">KHAMCI VOYAGES</strong>, votre agence de voyages de confiance en Guinée depuis 2021.
              Spécialistes de la billetterie aérienne, de la réservation d'hôtels et des voyages sur mesure,
              nous facilitons l'accès aux services de voyage internationaux pour les particuliers et les entreprises.
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
