import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, ArrowRight, Tag } from "lucide-react";
import { Link } from "wouter";

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
  color: string;
  icon: string;
  priceFrom: string;
  duration: string;
  highlight: string;
}

export default function PopularDestinations() {
  const destinations: Destination[] = [
    {
      id: "paris",
      name: "Paris",
      description: "La Ville Lumière — Découvrez la magie de l'architecture et la gastronomie française",
      image: "/images/paris-destination.webp",
      path: "/destination/paris",
      color: "from-blue-500 to-purple-600",
      icon: "🗼",
      priceFrom: "À partir de 2 500 000 GNF",
      duration: "Vol aller-retour",
      highlight: "Visa France disponible"
    },
    {
      id: "dubai",
      name: "Dubaï",
      description: "L'Oasis du Désert — Luxe, modernité et aventures dans les Émirats Arabes Unis",
      image: "/images/dubai-destination.webp",
      path: "/destination/dubai",
      color: "from-yellow-500 to-orange-600",
      icon: "🏙️",
      priceFrom: "À partir de 1 800 000 GNF",
      duration: "Vol aller-retour",
      highlight: "Visa Dubaï disponible"
    },
    {
      id: "casablanca",
      name: "Casablanca",
      description: "La Perle du Maroc — Tradition, culture et charme méditerranéen au cœur de l'Afrique",
      image: "/images/casablanca-destination.webp",
      path: "/destination/casablanca",
      color: "from-amber-500 to-orange-600",
      icon: "🕌",
      priceFrom: "À partir de 1 200 000 GNF",
      duration: "Vol aller-retour",
      highlight: "Sans visa pour ressortissants guinéens"
    }
  ];

  return (
    <section id="destinations" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
            <MapPin className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">DESTINATIONS POPULAIRES</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Explorez le Monde avec KHAMCI VOYAGES
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez nos guides complets, attractions, restaurants et offres spéciales pour les destinations les plus demandées
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Link key={destination.id} href={destination.path} className="block h-full">
              <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group flex flex-col bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${destination.color} opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg">
                    {destination.icon}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-[#FF6B35] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Tag size={10} />
                    {destination.priceFrom}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{destination.name}</h3>

                  {/* Highlight badge */}
                  <span className="inline-block mb-3 text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-full w-fit">
                    ✓ {destination.highlight}
                  </span>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm flex-grow">{destination.description}</p>

                  {/* Duration */}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-1">
                    ✈️ {destination.duration}
                  </p>

                  {/* Button */}
                  <Button
                    className={`w-full bg-gradient-to-r ${destination.color} hover:shadow-lg transition-all duration-300 text-white font-semibold py-3 flex items-center justify-center gap-2 group/btn`}
                  >
                    Découvrir & Réserver
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-[#0D1B3E] to-[#1a3a6e] rounded-2xl p-8 md:p-10">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-2">Votre destination n'est pas dans la liste ?</h3>
          <p className="text-white/70 mb-6">
            KHAMCI VOYAGES vous organise un voyage sur mesure vers n'importe quelle destination dans le monde.
          </p>
          <Link href="/#contact">
            <Button
              size="lg"
              className="bg-[#FF6B35] hover:bg-[#e85a2a] text-white font-bold px-8 py-4 text-base"
            >
              Demander un Voyage Personnalisé
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
