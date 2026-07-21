import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";

/**
 * Date limite de l'offre : 20 août 2026 à 23h59, heure de Conakry (GMT+0).
 * Conakry est en GMT+0 toute l'année → on peut utiliser directement l'UTC.
 */
const DEADLINE = new Date("2026-08-20T23:59:00Z");

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

function computeCountdown(target: Date): Countdown {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isExpired: false };
}

/**
 * Hook de compte à rebours en temps réel.
 * Met à jour chaque seconde via setInterval et nettoie l'intervalle
 * au démontage (pas de memory leak). S'arrête une fois la date passée.
 */
function useCountdown(targetDate: Date): Countdown {
  const [countdown, setCountdown] = useState(() => computeCountdown(targetDate));

  useEffect(() => {
    // Si déjà expiré au montage, inutile de lancer l'intervalle.
    if (countdown.isExpired) return;

    const interval = setInterval(() => {
      const next = computeCountdown(targetDate);
      setCountdown(next);
      if (next.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return countdown;
}

const pad = (n: number) => n.toString().padStart(2, "0");

/**
 * AnnouncementBar - Bannière promotionnelle en haut du site.
 * Offre : -10% sur tout billet d'avion pour toute demande de devis
 * avant le 20 août 2026. Compte à rebours en temps réel.
 * Mémorise la fermeture dans sessionStorage pour ne pas réapparaître.
 * Disparaît automatiquement une fois la date limite passée.
 */
export default function AnnouncementBar() {
  const [isClosed, setIsClosed] = useState(() => {
    return sessionStorage.getItem("announcementClosed") === "true";
  });

  const countdown = useCountdown(DEADLINE);

  const handleClose = () => {
    sessionStorage.setItem("announcementClosed", "true");
    setIsClosed(true);
  };

  // Masquée si fermée manuellement ou si l'offre est expirée.
  if (isClosed || countdown.isExpired) return null;

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
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center leading-snug">
          <span className="bg-[#FF6B35] text-white text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0">
            Offre limitée
          </span>
          <span className="text-white font-bold">✈️ -10% sur votre billet d'avion</span>
          <span className="hidden md:inline text-white/80">
            pour toute demande de devis avant le
          </span>
          <span className="text-[#FF6B35] font-bold whitespace-nowrap">20 août 2026</span>

          {/* Compte à rebours */}
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0a1330] px-2 py-0.5 font-mono text-white tracking-widest whitespace-nowrap">
            <span aria-hidden="true">⏱</span>
            <span>
              {countdown.days}j {pad(countdown.hours)}h {pad(countdown.minutes)}min{" "}
              {pad(countdown.seconds)}s
            </span>
          </span>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="ml-1 underline underline-offset-2 text-orange-300 hover:text-white transition-colors font-semibold whitespace-nowrap"
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
