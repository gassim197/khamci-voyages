import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour calculer le pourcentage de lecture d'une page
 * Retourne un nombre entre 0 et 100 représentant le pourcentage de la page scrollée
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculer la hauteur totale du document
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;

      // Si la page n'est pas scrollable, retourner 0
      if (documentHeight === 0) {
        setProgress(0);
        return;
      }

      // Calculer le pourcentage de scroll
      const scrolled = window.scrollY;
      const percentage = (scrolled / documentHeight) * 100;

      // Limiter entre 0 et 100
      setProgress(Math.min(Math.max(percentage, 0), 100));
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Nettoyer l'écouteur
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return progress;
}
