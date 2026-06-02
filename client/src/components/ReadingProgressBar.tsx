import { useReadingProgress } from "@/hooks/useReadingProgress";

interface ReadingProgressBarProps {
  className?: string;
}

/**
 * Composant de barre de progression de lecture
 * Affiche une barre en haut de la page qui se remplit au fur et à mesure du scroll
 */
export default function ReadingProgressBar({ className = "" }: ReadingProgressBarProps) {
  const progress = useReadingProgress();

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] shadow-md transition-all duration-300 ease-out z-50 ${className}`}
      style={{
        width: `${progress}%`,
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progression de lecture: ${Math.round(progress)}%`}
    />
  );
}
