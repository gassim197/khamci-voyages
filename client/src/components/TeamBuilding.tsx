import { useState } from "react";
import QuickQuoteModal from "./QuickQuoteModal";

/**
 * Team Building Section - KHAMCI VOYAGES
 * 
 * Optimisé pour la conversion :
 * - Copywriting centré sur les bénéfices B2B
 * - Micro-CTA visible et actionnable
 * - Éléments de réassurance
 */

export default function TeamBuilding() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <section id="team-building" className="py-16 md:py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/team-building-corporate-ZouKXetLzNz2fYDPBg9YLD.webp"
                alt="Team Building"
                className="rounded-lg shadow-xl hover-lift"
              />
            </div>

            {/* Content */}
            <div className="order-1 md:order-2 space-y-6">
              {/* Headline - Optimized */}
              <div>
                <h2 className="heading-lg gradient-text mb-2">
                  Renforcez Votre Équipe
                </h2>
                <p className="text-lg text-orange-600 font-semibold">
                  Aventure Africaine • Immersion • Cohésion
                </p>
              </div>

              {/* Description */}
              <p className="text-body text-gray-600 dark:text-gray-300">
                KHAMCI VOYAGES organise des expériences de team building inoubliables
                qui renforcent la cohésion de votre équipe. Activités ludiques, découverte
                culturelle et moments de détente dans les plus beaux cadres de Guinée.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-orange-400 to-red-400 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Équipe Motivée</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Souvenirs inoubliables qui renforcent les liens</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-orange-400 to-red-400 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Budget Maîtrisé</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Packages adaptés à tous les budgets d'entreprise</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-orange-400 to-red-400 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Cadre Exceptionnel</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Découvrez la beauté naturelle de la Guinée</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-orange-400 to-red-400 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Logistique Complète</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Animateurs expérimentés, assurance groupe incluse</p>
                  </div>
                </div>
              </div>

              {/* Reassurance */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-sm text-green-700 dark:text-green-300">
                  <span className="font-bold">✓ Assurance groupe incluse</span> • Révisions illimitées • Satisfaction garantie
                </p>
              </div>

              {/* CTA - Primary */}
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 text-lg"
              >
                🎯 OBTENIR MON DEVIS TEAM BUILDING
              </button>

              {/* Secondary Text */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Réponse sous 24h • Sans engagement • Révisions illimitées
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        source="team-building"
      />
    </>
  );
}
