import { useState } from "react";
import { Plane, Hotel, Car, Shield, FileText, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    icon: Plane,
    title: "Billetterie",
    description: "Réservation et vente de billets d'avion à destination du monde entier, aux meilleurs tarifs.",
    benefit: "Économisez jusqu'à 30% sur vos vols",
    ctaText: "Demander un devis vol",
    href: "/services/billetterie",
    color: "from-yellow-400 to-orange-400",
    badge: "⭐ Service phare",
  },
  {
    icon: Hotel,
    title: "Réservation d'hôtel",
    description: "Accès à un large choix d'hébergements en Guinée et à l'étranger, du budget au luxe.",
    benefit: "Tarifs négociés avec nos partenaires hôteliers",
    ctaText: "Réserver un hôtel",
    href: "/services/hotel",
    color: "from-orange-400 to-red-400",
    badge: null,
  },
  {
    icon: Car,
    title: "Location de véhicule",
    description: "Berlines, SUV, minibus ou bus — mise à disposition de véhicules avec ou sans chauffeur.",
    benefit: "Disponible pour particuliers et entreprises",
    ctaText: "Demander un devis location",
    href: "/services/location-vehicule",
    color: "from-blue-400 to-indigo-400",
    badge: null,
  },
  {
    icon: Shield,
    title: "Assurance voyage",
    description: "Voyagez l'esprit tranquille avec nos solutions d'assurance adaptées à chaque destination.",
    benefit: "Frais médicaux, annulation, bagages couverts",
    ctaText: "Obtenir une assurance",
    href: "/services/assurance-voyage",
    color: "from-green-400 to-teal-400",
    badge: null,
  },
  {
    icon: FileText,
    title: "Accompagnement visa",
    description: "Dossier complet pris en charge pour Dubaï, Chine, Inde, Maroc, Égypte, France et Canada.",
    benefit: "7 destinations couvertes — taux de succès élevé",
    ctaText: "Demander un accompagnement",
    href: "/services/visa",
    color: "from-purple-400 to-pink-400",
    badge: "7 destinations",
  },
  {
    icon: Star,
    title: "Hadj & Oumra",
    description: "Organisation complète de votre pèlerinage vers La Mecque et Médine — vols, hébergement, guide accompagnateur.",
    benefit: "Formules économique, confort et premium disponibles",
    ctaText: "Organiser mon pèlerinage",
    href: "/services/hadj-oumra",
    color: "from-amber-400 to-yellow-500",
    badge: "🕌 Hadj & Oumra",
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="py-16 md:py-24 section-gradient-warm">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="heading-lg gradient-text mb-4">
            Nos Services
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            KHAMCI VOYAGES vous propose une gamme complète de services pour faciliter
            l'accès aux voyages internationaux, pour les particuliers comme pour les entreprises.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon as React.ComponentType<{ size: number; className: string }>;
            return (
              <Link
                key={index}
                href={service.href}
                className="group relative overflow-hidden rounded-xl bg-white p-5 md:p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 block"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative z-10 space-y-4">
                  {/* Badge */}
                  {service.badge && (
                    <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full mb-1">
                      {service.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div className={`inline-block p-3 bg-gradient-to-br ${service.color} rounded-xl`}>
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#FF6B35] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Benefit */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    ✓ {service.benefit}
                  </div>

                  {/* CTA */}
                  <div className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                    hovered === index ? "text-[#FF6B35]" : "text-[#0D1B3E]"
                  }`}>
                    {service.ctaText}
                    <ArrowRight size={16} className={`transition-transform ${hovered === index ? "translate-x-1" : ""}`} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Vous avez un besoin spécifique ?</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Demander un devis personnalisé <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
