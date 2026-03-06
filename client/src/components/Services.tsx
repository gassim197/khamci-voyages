import { useState } from "react";
import {
  Plane,
  Hotel,
  FileText,
  MapPin,
  Briefcase,
  Calendar,
} from "lucide-react";
import QuickQuoteModal from "./QuickQuoteModal";

/**
 * Services Section - KHAMCI VOYAGES
 * 
 * Optimisé pour la conversion :
 * - Copywriting centré sur les bénéfices
 * - Micro-CTA pour chaque service
 * - Éléments de réassurance
 * - Urgence et scarcité subtiles
 */

const services = [
  {
    icon: Plane,
    title: "Billets d'Avion",
    description: "Accès aux meilleures tarifs auprès des compagnies aériennes",
    benefit: "Économisez jusqu'à 30% sur vos vols",
    reassurance: "Tarifs bloqués 7 jours",
    ctaText: "Obtenir un devis vol",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: Hotel,
    title: "Réservations d'Hôtels",
    description: "Hôtels vérifiés, du luxe au budget. Tarifs négociés, annulation gratuite",
    benefit: "Réductions jusqu'à 25% sur les hôtels partenaires",
    reassurance: "Annulation gratuite jusqu'à 48h avant",
    ctaText: "Réserver mon hôtel",
    color: "from-orange-400 to-red-400",
  },
  {
    icon: FileText,
    title: "Assistance Visa",
    description: "Dossier complet préparé par nos experts. Suivi en temps réel",
    benefit: "Pas d'erreur, pas de rejet, visa garanti",
    reassurance: "Garantie visa ou remboursement",
    ctaText: "Demander l'assistance visa",
    color: "from-red-400 to-pink-400",
  },
  {
    icon: MapPin,
    title: "Voyages Organisés",
    description: "Itinéraires testés, guides locaux, transport inclus. Prêt à partir",
    benefit: "Zéro stress, maximum de découvertes",
    reassurance: "Tous les circuits ont 4.8+ étoiles",
    ctaText: "Voir les circuits",
    color: "from-pink-400 to-purple-400",
  },
  {
    icon: Briefcase,
    title: "Voyages sur Mesure",
    description: "Pas de circuit standard. Vous décidez, nous organisons",
    benefit: "Expérience 100% personnalisée à votre budget",
    reassurance: "Révisions illimitées jusqu'à satisfaction",
    ctaText: "Créer mon voyage",
    color: "from-purple-400 to-indigo-400",
  },
  {
    icon: Calendar,
    title: "Team Building Entreprise",
    description: "Activités, immersion culturelle, cohésion. Souvenirs inoubliables",
    benefit: "Équipe motivée, budget maîtrisé",
    reassurance: "Assurance groupe incluse",
    ctaText: "Devis team building",
    color: "from-indigo-400 to-blue-400",
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleServiceCTA = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <section id="services" className="py-16 md:py-24 section-gradient-warm">
        <div className="container">
          {/* Section Header - Optimized */}
          <div className="text-center mb-16">
            <h2 className="heading-lg gradient-text mb-4">
              Tous les Services pour Votre Voyage Parfait
            </h2>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              Chacun peut être personnalisé dans votre devis.
              Cliquez sur un service pour obtenir un devis rapide.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon as React.ComponentType<{
                size: number;
                className: string;
              }>;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <div
                      className={`inline-block p-3 bg-gradient-to-br ${service.color} rounded-lg`}
                    >
                      <Icon size={28} className="text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="heading-md text-gray-900">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Benefit - Highlighted */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200">
                      <p className="text-sm font-semibold text-orange-600">
                        ✨ {service.benefit}
                      </p>
                    </div>

                    {/* Reassurance */}
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {service.reassurance}
                    </div>

                    {/* CTA Button - Micro-Conversion */}
                    <button
                      onClick={() => handleServiceCTA(service.title)}
                      className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 text-sm"
                    >
                      🎯 {service.ctaText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              Vous ne trouvez pas exactement ce que vous cherchez ?
            </p>
            <button
              onClick={() => {
                setSelectedService(null);
                setIsQuoteModalOpen(true);
              }}
              className="btn-cta bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-3 rounded-lg"
            >
              Demander un Devis Personnalisé
            </button>
          </div>
        </div>
      </section>

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        source={selectedService ? `service-${selectedService}` : "services"}
      />
    </>
  );
}
