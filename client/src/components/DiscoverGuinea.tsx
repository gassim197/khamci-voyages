import { useState } from "react";
import { Link, useLocation } from "wouter";
import QuickQuoteModal from "./QuickQuoteModal";

/**
 * Discover Guinea Section - KHAMCI VOYAGES
 * 
 * Optimisé pour la conversion :
 * - Copywriting centré sur l'inspiration et l'action
 * - Micro-CTA pour chaque destination
 * - Éléments de réassurance
 */

export default function DiscoverGuinea() {
  const [, setLocation] = useLocation();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const destinations = [
    {
      slug: "fouta-djallon",
      title: "Fouta Djallon",
      description: "Montagnes spectaculaires avec cascades et paysages verdoyants",
      benefit: "Aventure & Nature",
      icon: "⛰️",
    },
    {
      slug: "conakry",
      title: "Conakry",
      description: "Capitale dynamique avec plages, marchés colorés et vie nocturne vibrante",
      benefit: "Culture & Détente",
      icon: "🏖️",
    },
    {
      slug: "kindia",
      title: "Kindia",
      description: "Cascades cristallines et forêts tropicales pour les amateurs de nature",
      benefit: "Découverte & Immersion",
      icon: "🌳",
    },
    {
      slug: "iles-de-loos",
      title: "Îles de Loos",
      description: "Archipel paradisiaque avec plages de sable blanc et eaux turquoise",
      benefit: "Paradis Tropical",
      icon: "🏝️",
    },
  ];

  const handleDestinationCTA = (destination: string) => {
    setSelectedDestination(destination);
    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <section id="guinea" className="py-16 md:py-24 section-gradient-cool">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div>
              <img
                src="/images/guinea-destination-collage.webp"
                alt="Destinations en Guinée"
                className="rounded-lg shadow-xl hover-lift"
              />
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h2 className="heading-lg gradient-text mb-4">
                  Explorez les Joyaux de la Guinée
                </h2>
                <p className="text-body text-gray-600 dark:text-gray-300">
                  Chaque destination peut être incluse dans votre devis personnalisé.
                  Cliquez sur votre préférée pour commencer votre voyage.
                </p>
              </div>

              {/* Destinations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destinations.map((dest, index) => (
                  <div
                    key={index}
                    onClick={() => setLocation(`/guinee/${dest.slug}`)}
                    className="group p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 hover:border-orange-300 cursor-pointer"
                  >
                    {/* Icon & Title */}
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-2xl">{dest.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {dest.title}
                        </h3>
                        <p className="text-xs text-orange-600 font-semibold">
                          {dest.benefit}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 ml-10">
                      {dest.description}
                    </p>

                    {/* Lien explicite vers la page destination */}
                    <Link
                      href={`/guinee/${dest.slug}`}
                      className="ml-10 mb-3 inline-block text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 text-sm transition-colors"
                    >
                      Découvrir {dest.title} →
                    </Link>

                    {/* Micro-CTA : ne doit pas déclencher la navigation de la carte */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDestinationCTA(dest.title);
                      }}
                      className="ml-10 text-orange-600 hover:text-orange-700 font-semibold text-sm transition-colors flex items-center gap-1"
                    >
                      Demander un service →
                    </button>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <button
                onClick={() => {
                  setSelectedDestination(null);
                  setIsQuoteModalOpen(true);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                🎯 DEMANDER MON DEVIS PERSONNALISÉ
              </button>

              {/* Reassurance */}
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                <p>✓ Réponse sous 24h • ✓ Gratuit et sans engagement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        source={selectedDestination ? `destination-${selectedDestination}` : "destinations"}
      />
    </>
  );
}
