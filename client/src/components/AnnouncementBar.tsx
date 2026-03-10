import { useState } from "react";
import { X, Sparkles } from "lucide-react";

/**
 * AnnouncementBar - Bannière d'annonce en haut du site
 * Affiche un message de lancement officiel avec bouton de fermeture.
 * Mémorise la fermeture dans sessionStorage pour ne pas réapparaître.
 */
export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(() => {
    return sessionStorage.getItem("announcementClosed") !== "true";
  });

  const handleClose = () => {
    sessionStorage.setItem("announcementClosed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#0D1B3E] via-[#1a2d5a] to-[#0D1B3E] text-white py-2.5 px-4">
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,107,53,0.4) 50%, transparent 100%)",
            animation: "shimmer 3s infinite linear",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      <div className="relative flex items-center justify-center gap-3 text-sm font-medium max-w-screen-xl mx-auto">
        {/* Left sparkle */}
        <Sparkles size={15} className="text-[#FF6B35] flex-shrink-0 animate-pulse" />

        {/* Message */}
        <p className="text-center leading-snug">
          <span className="inline-flex items-center gap-1.5">
            <span className="bg-[#FF6B35] text-white text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0">Offre de lancement</span>
            <span className="text-white font-bold">✈️ Réservez via notre site et économisez</span>
            <span className="text-[#FF6B35] font-black text-base">-5%</span>
            <span className="hidden sm:inline text-white font-bold">sur votre billet d'avion !</span>
          </span>
          <span className="hidden md:inline text-white/80">
            {" "}Faites votre demande de devis, achetez en ligne et profitez de la réduction automatiquement.
          </span>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="ml-2 underline underline-offset-2 text-orange-300 hover:text-white transition-colors font-semibold whitespace-nowrap"
          >
            J'en profite →
          </a>
        </p>

        {/* Right sparkle */}
        <Sparkles size={15} className="text-[#FF6B35] flex-shrink-0 animate-pulse" />

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Fermer la bannière"
          className="absolute right-0 p-1 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
