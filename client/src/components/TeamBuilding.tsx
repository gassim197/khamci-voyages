export default function TeamBuilding() {
  return (
    <section id="team-building" className="py-16 md:py-24 bg-white">
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
          <div className="order-1 md:order-2">
            <h2 className="heading-lg gradient-text mb-6">
              Team Building pour Entreprises
            </h2>
            <p className="text-body text-gray-600 mb-6">
              KHAMCI VOYAGES organise des expériences de team building inoubliables
              pour renforcer la cohésion de votre équipe. Nos packages combinent
              activités ludiques, découverte culturelle et moments de détente.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-orange-400 to-red-400 text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Activités Personnalisées</h3>
                  <p className="text-gray-600 text-sm">Adaptées à vos objectifs et budget</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-orange-400 to-red-400 text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cadre Exceptionnel</h3>
                  <p className="text-gray-600 text-sm">Découvrez la beauté naturelle de la Guinée</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-orange-400 to-red-400 text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Équipe Professionnelle</h3>
                  <p className="text-gray-600 text-sm">Animateurs expérimentés et logistique impeccable</p>
                </div>
              </div>
            </div>

            <button className="btn-cta">
              Organiser un Team Building
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
