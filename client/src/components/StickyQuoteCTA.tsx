import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StickyQuoteCTAProps {
  onQuoteClick: () => void;
}

export default function StickyQuoteCTA({ onQuoteClick }: StickyQuoteCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-orange-500 to-red-500 shadow-2xl animate-slide-up">
      <div className="container py-3 flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-white font-semibold text-sm md:text-base">
            ✨ Vous aimez ? Demandez un service →
          </p>
          <p className="text-white/80 text-xs">
            Réponse garantie sous 24h • Sans engagement
          </p>
        </div>

        <Button
          onClick={onQuoteClick}
          className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-6 whitespace-nowrap flex-shrink-0"
        >
          🎯 DEVIS GRATUIT
        </Button>
      </div>
    </div>
  );
}
