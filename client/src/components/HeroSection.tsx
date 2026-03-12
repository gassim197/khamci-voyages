import { useState } from "react";
import QuickQuoteModal from "./QuickQuoteModal";

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
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0">
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
        </div>

        {/* Logo Watermark */}
        <div className="absolute bottom-10 right-10 opacity-10 z-0 hidden md:block">
          <img
            src="/logo-khamci-officiel.png"
            alt=""
            className="w-40 md:w-56 h-auto"
          />
        </div>

        {/* Content — le header est sticky, le hero commence directement en dessous */}
        <div className="relative z-10 container max-w-4xl text-white pt-8 pb-16">
          <div className="animate-fade-in-up space-y-6">

            {/* Titre principal */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">
                Organisez votre voyage partout dans le monde
                <span className="block gradient-text mt-1">avec KHAMCI VOYAGES</span>
              </h1>
              <p className="text-base md:text-lg text-orange-300 font-semibold">
                ⚡ Recevez votre demande de réservation en moins de 30 minutes &bull; Gratuit &amp; sans engagement
              </p>
            </div>

            {/* Sous-titre */}
            <p className="text-base md:text-lg text-gray-100 leading-relaxed max-w-2xl">
              Bienvenue chez <strong className="text-white">KHAMCI VOYAGES</strong>, votre agence de voyages
              de confiance en Guinée depuis 2021. Spécialistes de la billetterie aérienne, de la réservation
              d'hôtels et des voyages sur mesure, nous facilitons l'accès aux services de voyage
              internationaux pour les particuliers et les entreprises.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-base md:text-lg px-8 py-4 rounded-lg shadow-2xl transition-all transform hover:scale-105"
              >
                🎯 DEMANDER UN SERVICE
              </button>
              <button
                onClick={() => scrollToSection("destinations")}
                className="bg-white/20 backdrop-blur-sm text-white border-2 border-white hover:bg-white/30 font-bold text-base md:text-lg px-8 py-4 rounded-lg transition-all"
              >
                Voir les Destinations
              </button>
            </div>

            {/* Réassurance */}
            <div className="pt-6 border-t border-white/30">
              <p className="text-sm font-semibold text-white/90 mb-3">
                ✓ Pourquoi 500+ voyageurs nous font confiance ?
              </p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center border border-white/20">
                  <p className="font-bold text-base md:text-lg">30min</p>
                  <p className="text-xs text-white/80 leading-tight">Réponse garantie</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center border border-white/20">
                  <p className="font-bold text-base md:text-lg">100%</p>
                  <p className="text-xs text-white/80 leading-tight">Gratuit &amp; sans engagement</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center border border-white/20">
                  <p className="font-bold text-base md:text-lg">2021</p>
                  <p className="text-xs text-white/80 leading-tight">Fondée en Guinée</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        source="hero"
      />
    </>
  );
}
