import { MessageSquare, FileCheck, Plane } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Vous nous contactez",
    description: "Décrivez votre projet de voyage, vos dates et vos préférences",
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Nous préparons votre devis",
    description: "Notre équipe élabore une proposition personnalisée et détaillée",
  },
  {
    icon: Plane,
    number: "03",
    title: "Vous voyagez sereinement",
    description: "Profitez de votre voyage avec notre support avant, pendant et après",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-lg gradient-text mb-4">
            Comment ça Marche
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Un processus simple et transparent pour organiser votre voyage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="inline-block p-3 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg">
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="text-4xl font-bold gradient-text">{step.number}</div>
                  </div>

                  <h3 className="heading-md mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for next step */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-4 text-orange-500 text-3xl">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-body text-gray-600 mb-6">
            Prêt à commencer votre aventure ?
          </p>
          <a href="#contact" className="btn-cta">
            Demander un Service
          </a>
        </div>
      </div>
    </section>
  );
}
