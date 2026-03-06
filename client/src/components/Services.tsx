import { Plane, Hotel, FileText, MapPin, Briefcase, Calendar } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Billets d'Avion",
    description: "Accès aux meilleures tarifs pour vos vols nationaux et internationaux",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: Hotel,
    title: "Réservations d'Hôtels",
    description: "Large sélection d'hôtels de qualité dans toutes les destinations",
    color: "from-orange-400 to-red-400",
  },
  {
    icon: FileText,
    title: "Assistance Visa",
    description: "Aide complète pour vos demandes de visa et formalités administratives",
    color: "from-red-400 to-pink-400",
  },
  {
    icon: MapPin,
    title: "Voyages Organisés",
    description: "Packages complets avec guide, transport et hébergement inclus",
    color: "from-pink-400 to-purple-400",
  },
  {
    icon: Briefcase,
    title: "Voyages sur Mesure",
    description: "Création de voyages personnalisés selon vos envies et budget",
    color: "from-purple-400 to-indigo-400",
  },
  {
    icon: Calendar,
    title: "Team Building",
    description: "Organisation d'événements et activités de team building en Guinée",
    color: "from-indigo-400 to-blue-400",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 section-gradient-warm">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-lg gradient-text mb-4">
            Nos Services
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Une gamme complète de services pour tous vos besoins de voyage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon as React.ComponentType<{ size: number; className: string }>;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`mb-4 inline-block p-3 bg-gradient-to-br ${service.color} rounded-lg`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>

                  <h3 className="heading-md mb-3 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <button className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
                    En savoir plus →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
