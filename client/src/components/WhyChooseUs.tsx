import { Zap, Shield, Users, Globe } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Rapidité",
    description: "Traitement rapide de vos demandes et réponses en 24h",
  },
  {
    icon: Shield,
    title: "Fiabilité",
    description: "Partenaires de confiance et services garantis",
  },
  {
    icon: Users,
    title: "Accompagnement Personnalisé",
    description: "Équipe dédiée pour chaque étape de votre voyage",
  },
  {
    icon: Globe,
    title: "Expertise Locale",
    description: "Connaissance approfondie de la Guinée et des destinations",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-lg gradient-text mb-4">
            Pourquoi Choisir KHAMCI VOYAGES
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Nous mettons à votre service notre expertise, notre passion pour les voyages
            et notre engagement envers votre satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="service-card group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="mb-4 inline-block p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon
                    size={28}
                    className="text-orange-500"
                  />
                </div>
                <h3 className="heading-md mb-2 text-gray-900">{reason.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="divider-gradient mt-16"></div>
      </div>
    </section>
  );
}
