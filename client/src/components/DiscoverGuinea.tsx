export default function DiscoverGuinea() {
  const destinations = [
    {
      title: "Fouta Djallon",
      description: "Chaîne montagneuse spectaculaire avec cascades et paysages verdoyants",
    },
    {
      title: "Conakry",
      description: "Capitale dynamique avec plages, marchés colorés et vie nocturne vibrante",
    },
    {
      title: "Kindia",
      description: "Cascades cristallines et forêts tropicales pour les amateurs de nature",
    },
    {
      title: "Îles de Loos",
      description: "Archipel paradisiaque avec plages de sable blanc et eaux turquoise",
    },
  ];

  return (
    <section id="guinea" className="py-16 md:py-24 section-gradient-cool">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/guinea-destination-collage-Lp3sdFMybCqtsZRyuDPh2S.webp"
              alt="Destinations en Guinée"
              className="rounded-lg shadow-xl hover-lift"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="heading-lg gradient-text mb-6">
              Découvrez la Guinée
            </h2>
            <p className="text-body text-gray-600 mb-8">
              La Guinée est une destination riche en diversité naturelle et culturelle.
              De ses montagnes majestueuses à ses plages paradisiaques, explorez un pays
              authentique et accueillant.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {destinations.map((dest, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{dest.title}</h3>
                  <p className="text-gray-600 text-sm">{dest.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
